import { Document, Types } from 'mongoose';

export interface IPayment extends Document {
  order: Types.ObjectId;
  amount: number;
  gateway: 'stripe' | 'paypal' | 'razorpay' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: Date;
}