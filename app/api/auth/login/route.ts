import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../_server/db';
import { cookieName, cookieOptions, signToken } from '../../../_server/auth';
import User from '../../../_models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ id: user._id.toString(), name: user.name, email: user.email });

    const res = NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
    res.cookies.set(cookieName(), token, cookieOptions());
    return res;
  } catch (err) {
    console.error('[login]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
