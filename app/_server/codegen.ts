import Order from '../_models/Order';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomAlpha(len: number): string {
  let out = '';
  for (let i = 0; i < len; i++) out += CHARS[Math.floor(Math.random() * CHARS.length)];
  return out;
}

export async function generateTrackingCode(): Promise<string> {
  let code: string;
  let exists = true;
  do {
    code = 'SOS' + randomAlpha(7);
    exists = !!(await Order.findOne({ trackingCode: code }).lean());
  } while (exists);
  return code;
}

export async function generateNumberCode(): Promise<string> {
  const last = await Order.findOne({}, { code: 1 }).sort({ createdAt: -1 }).lean() as { code?: string } | null;
  const next = last?.code ? parseInt(last.code, 10) + 1 : 1000;
  return String(next);
}
