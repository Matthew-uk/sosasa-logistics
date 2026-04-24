import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../_server/db';
import { getSession } from '../../../_server/auth';
import User from '../../../_models/User';

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const { id } = await params;

  if (id === session.id) {
    return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
  }

  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
