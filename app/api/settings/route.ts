import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../_server/db';
import { getSession } from '../../_server/auth';
import Settings from '../../_models/Settings';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  let settings = await Settings.findOne({}).lean();
  if (!settings) {
    settings = await Settings.create({});
  }
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const allowed = ['companyName', 'companyEmail', 'companyPhone', 'companyAddress', 'website', 'defaultDeliveryMode'];
  const update: Record<string, string> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) update[key] = body[key];
  }

  const settings = await Settings.findOneAndUpdate({}, { $set: update }, { upsert: true, new: true }).lean();
  return NextResponse.json({ settings });
}
