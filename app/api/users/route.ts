import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../_server/db';
import { getSession } from '../../_server/auth';
import User from '../../_models/User';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const users = await User.find({}).select('-password').sort({ createdAt: -1 }).lean();
  return NextResponse.json({ users });
}
