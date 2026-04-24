import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

const cached = global._mongoConn ?? (global._mongoConn = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
