import { Document, Types } from 'mongoose';

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  options: { [key: string]: string };
}

export interface IShippingAddress {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IShippingAddress;
  paymentMethod: 'online' | 'cod';
  createdAt: Date;
  updatedAt: Date;
}