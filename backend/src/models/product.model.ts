import mongoose, { Schema } from 'mongoose';
import { IProduct, IProductOption, IProductAttribute } from './product.interface';

const productOptionSchema = new Schema<IProductOption>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  values: [{
    type: String,
    required: true,
  }],
});

const productAttributeSchema = new Schema<IProductAttribute>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
});

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    options: [productOptionSchema],
    attributes: [productAttributeSchema],
    images: [{
      type: String,
      trim: true,
    }],
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;