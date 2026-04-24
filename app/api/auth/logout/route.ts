import { NextResponse } from 'next/server';
import { cookieName, cookieOptions } from '../../../_server/auth';

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(cookieName(), '', { ...cookieOptions(0), maxAge: 0 });
  return res;
}
