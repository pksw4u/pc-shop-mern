import { Document, Types } from 'mongoose';

export interface IProductOption {
  name: string;
  values: string[];
}

export interface IProductAttribute {
  name: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  options: IProductOption[];
  attributes: IProductAttribute[];
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}