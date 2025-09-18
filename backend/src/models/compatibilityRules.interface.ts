import { Document, Types } from 'mongoose';

export interface ICompatibilityRule extends Document {
  productId: Types.ObjectId;
  compatibleWith: Types.ObjectId[];
  incompatibleWith: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}