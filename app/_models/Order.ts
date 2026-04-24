import mongoose, { Schema, model, models } from 'mongoose';

export type OrderStatus =
  | 'CREATED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED';

export interface IParty {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface IHistory {
  locationName: string;
  locationStatus: string;
  updatedAt: Date;
}

export interface IParcel {
  deliveryMode?: string;
  packageDescription?: string;
  totalWeight?: string;
  origin?: string;
  destination?: string;
  expectedPickupDate?: Date;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  code: string;          // numeric string, e.g. "1090"
  trackingCode: string;  // alphanumeric, always starts with SOS, e.g. "SOS7FATYCW"
  status: OrderStatus;
  sender: IParty;
  receiver: IParty;
  parcel: IParcel;
  history: IHistory[];
  additionalInfo?: string;
  chargedPrice?: number; // amount charged in NGN
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PartySchema = new Schema<IParty>({
  name: String,
  email: String,
  phone: String,
  address: String,
}, { _id: false });

const HistorySchema = new Schema<IHistory>({
  locationName: { type: String, required: true },
  locationStatus: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
}, { _id: false });

const ParcelSchema = new Schema<IParcel>({
  deliveryMode: String,
  packageDescription: String,
  totalWeight: String,
  origin: String,
  destination: String,
  expectedPickupDate: Date,
}, { _id: false });

const OrderSchema = new Schema<IOrder>(
  {
    code: { type: String, required: true, unique: true, index: true },
    trackingCode: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'],
      default: 'CREATED',
    },
    sender: PartySchema,
    receiver: PartySchema,
    parcel: ParcelSchema,
    history: { type: [HistorySchema], default: [] },
    additionalInfo: String,
    chargedPrice: { type: Number, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default models.Order || model<IOrder>('Order', OrderSchema);
