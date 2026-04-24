import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../_server/db';
import { cookieName, cookieOptions, signToken } from '../../../_server/auth';
import User from '../../../_models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password: hashed });

    const token = await signToken({ id: user._id.toString(), name: user.name, email: user.email });

    const res = NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
    res.cookies.set(cookieName(), token, cookieOptions());
    return res;
  } catch (err) {
    console.error('[register]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
