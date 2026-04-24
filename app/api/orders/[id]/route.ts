import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../_server/db';
import { getSession } from '../../../_server/auth';
import Order from '../../../_models/Order';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const order = await Order.findById(id).lean();
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json({ order });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const update: Record<string, unknown> = {};

  if (body.chargedPrice !== undefined) {
    if (body.chargedPrice === null || body.chargedPrice === '') {
      update.chargedPrice = undefined;
      await Order.findByIdAndUpdate(id, { $unset: { chargedPrice: 1 } });
      const order = await Order.findById(id).lean();
      return NextResponse.json({ order });
    }
    const price = Number(body.chargedPrice);
    if (isNaN(price) || price < 0) return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    update.chargedPrice = price;
  }

  const order = await Order.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json({ order });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const { id } = await params;
  await Order.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
