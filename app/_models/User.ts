import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin', enum: ['admin'] },
  },
  { timestamps: true },
);

export default models.User || model<IUser>('User', UserSchema);
