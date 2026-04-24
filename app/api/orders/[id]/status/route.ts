import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../_server/db';
import { getSession } from '../../../../_server/auth';
import Order from '../../../../_models/Order';

const VALID_STATUSES = ['CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const { id } = await params;
  const { status, locationName, locationStatus } = await req.json();

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  await connectDB();

  const order = await Order.findById(id);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  order.status = status;
  order.history.push({
    locationName: locationName ?? status,
    locationStatus: locationStatus ?? status.replace(/_/g, ' '),
    updatedAt: new Date(),
  });

  await order.save();
  return NextResponse.json({ order });
}
