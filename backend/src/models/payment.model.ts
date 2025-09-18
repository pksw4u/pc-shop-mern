import mongoose, { Schema } from 'mongoose';
import { IPayment } from './payment.interface';

const paymentSchema: Schema<IPayment> = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    gateway: {
      type: String,
      enum: ['stripe', 'paypal', 'razorpay', 'cash'],
      required: [true, 'Payment gateway is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentSchema.index({ order: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;