import mongoose, { Schema, model, models } from 'mongoose';

export interface ISettings {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  website: string;
  defaultDeliveryMode: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, default: 'Sosasa Logistics' },
    companyEmail: { type: String, default: 'hello@sosasa.ng' },
    companyPhone: { type: String, default: '+234 (0) 800 SOSASA' },
    companyAddress: { type: String, default: 'Victoria Island, Lagos, Nigeria' },
    website: { type: String, default: 'www.sosasa.ng' },
    defaultDeliveryMode: { type: String, default: '' },
  },
  { timestamps: true }
);

export default models.Settings || model<ISettings>('Settings', SettingsSchema);
