import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../_server/db';
import { getSession } from '../../_server/auth';
import { generateNumberCode, generateTrackingCode } from '../../_server/codegen';
import Order from '../../_models/Order';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
  const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '20'));
  const q = searchParams.get('q')?.trim();
  const status = searchParams.get('status');

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (q) {
    filter.$or = [
      { code: { $regex: q, $options: 'i' } },
      { trackingCode: { $regex: q, $options: 'i' } },
      { 'sender.name': { $regex: q, $options: 'i' } },
      { 'receiver.name': { $regex: q, $options: 'i' } },
    ];
  }

  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Order.countDocuments(filter),
  ]);

  return NextResponse.json({ orders, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();

  const body = await req.json();
  const { codeMode, manualCode, manualTrackingCode, sender, receiver, parcel, additionalInfo, chargedPrice } = body;

  let code: string;
  let trackingCode: string;

  if (codeMode === 'manual') {
    if (!manualCode?.trim() || !manualTrackingCode?.trim()) {
      return NextResponse.json({ error: 'Manual codes required' }, { status: 400 });
    }
    if (!manualTrackingCode.toUpperCase().startsWith('SOS')) {
      return NextResponse.json({ error: 'Tracking code must start with SOS' }, { status: 400 });
    }
    const exists = await Order.findOne({ $or: [{ code: manualCode }, { trackingCode: manualTrackingCode.toUpperCase() }] });
    if (exists) return NextResponse.json({ error: 'Code already in use' }, { status: 409 });
    code = manualCode.trim();
    trackingCode = manualTrackingCode.trim().toUpperCase();
  } else {
    code = await generateNumberCode();
    trackingCode = await generateTrackingCode();
  }

  const order = await Order.create({
    code,
    trackingCode,
    sender,
    receiver,
    parcel,
    additionalInfo,
    ...(chargedPrice !== undefined && chargedPrice !== null && chargedPrice !== "" ? { chargedPrice: Number(chargedPrice) } : {}),
    createdBy: session.id,
    history: [{
      locationName: parcel?.origin ?? 'Origin',
      locationStatus: 'Order Created',
      updatedAt: new Date(),
    }],
  });

  return NextResponse.json({ order }, { status: 201 });
}
