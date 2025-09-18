import { Document, Types } from 'mongoose';

export interface IInventory extends Document {
  product: Types.ObjectId;
  quantity: number;
  location: string;
  updatedAt: Date;
}