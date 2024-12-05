import { Schema, model, Types } from 'mongoose';

interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  size: string;
  price: number;
}

interface IPaymentInfo {
  id: string;
  status: string;
  type: 'stripe' | 'paypal';
}

interface IDonationRecipient {
  name: string;
  organization?: string;
  address: string;
}

export interface IOrder {
  user?: Types.ObjectId;
  orderItems: IOrderItem[];
  paymentInfo: IPaymentInfo;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Failed';
  donationRecipient?: IDonationRecipient;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderItems: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    }
  }],
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['stripe', 'paypal']
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Failed'],
    default: 'Pending'
  },
  donationRecipient: {
    name: {
      type: String,
      required: true
    },
    organization: String,
    address: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'paymentInfo.status': 1, createdAt: -1 });
orderSchema.index({ 'paymentInfo.id': 1 });
orderSchema.index({ createdAt: -1 });

// Indexes
orderSchema.index({ user: 1 });
orderSchema.index({ 'paymentInfo.id': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

export const Order = model<IOrder>('Order', orderSchema);