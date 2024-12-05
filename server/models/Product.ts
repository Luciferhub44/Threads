import { Schema, model } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  sizes: [{
    type: String,
    required: [true, 'At least one size is required'],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ isActive: 1, price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 1 });
productSchema.index({ price: 1 });

// Indexes
productSchema.index({ name: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ price: 1 });

export const Product = model<IProduct>('Product', productSchema);