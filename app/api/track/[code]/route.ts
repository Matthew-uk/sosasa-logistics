import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../_server/db';
import Order from '../../../_models/Order';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  await connectDB();
  const { code } = await params;
  const q = code.trim().toUpperCase();

  const order = await Order.findOne({
    $or: [{ code: q }, { trackingCode: q }, { code: code.trim() }],
  }).lean();

  if (!order) {
    return NextResponse.json({ error: 'No shipment found for this code' }, { status: 404 });
  }

  return NextResponse.json({ order });
}
