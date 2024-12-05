import { Schema, model } from 'mongoose';

interface IDonationStats {
  totalAmount: number;
  count: number;
  averageAmount: number;
}

interface IProductStats {
  totalProducts: number;
  activeProducts: number;
  topSellers: Array<{
    productId: Schema.Types.ObjectId;
    count: number;
  }>;
}

interface IUserStats {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
}

export interface IAnalytics {
  date: Date;
  donations: IDonationStats;
  products: IProductStats;
  users: IUserStats;
  period: 'daily' | 'weekly' | 'monthly';
}

const analyticsSchema = new Schema<IAnalytics>({
  date: {
    type: Date,
    required: true,
    index: true
  },
  donations: {
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    count: {
      type: Number,
      required: true,
      default: 0
    },
    averageAmount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  products: {
    totalProducts: {
      type: Number,
      required: true,
      default: 0
    },
    activeProducts: {
      type: Number,
      required: true,
      default: 0
    },
    topSellers: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      count: Number
    }]
  },
  users: {
    totalUsers: {
      type: Number,
      required: true,
      default: 0
    },
    newUsers: {
      type: Number,
      required: true,
      default: 0
    },
    activeUsers: {
      type: Number,
      required: true,
      default: 0
    }
  },
  period: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
analyticsSchema.index({ period: 1, date: -1 });
analyticsSchema.index({ 'donations.totalAmount': -1 });
analyticsSchema.index({ 'products.topSellers.productId': 1, date: -1 });
analyticsSchema.index({ date: -1 });
analyticsSchema.index({ 'products.topSellers.productId': 1 });

// Indexes
analyticsSchema.index({ date: -1 });
analyticsSchema.index({ period: 1, date: -1 });
analyticsSchema.index({ 'products.topSellers.productId': 1 });

export const Analytics = model<IAnalytics>('Analytics', analyticsSchema);