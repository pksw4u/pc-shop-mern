import mongoose, { Schema } from 'mongoose';
import { IInventory } from './inventory.interface';

const inventorySchema: Schema<IInventory> = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
inventorySchema.index({ product: 1 });
inventorySchema.index({ location: 1 });

const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);

export default Inventory;