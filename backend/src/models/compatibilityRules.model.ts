import mongoose, { Schema } from 'mongoose';
import { ICompatibilityRule } from './compatibilityRules.interface';

const compatibilityRuleSchema: Schema<ICompatibilityRule> = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    compatibleWith: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    incompatibleWith: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
compatibilityRuleSchema.index({ productId: 1 });

const CompatibilityRule = mongoose.model<ICompatibilityRule>('CompatibilityRule', compatibilityRuleSchema);

export default CompatibilityRule;