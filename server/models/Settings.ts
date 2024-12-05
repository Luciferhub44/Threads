import { Schema, model } from 'mongoose';

export interface ISettings {
  storeName: string;
  logo?: string;
  currency: string;
  emailNotifications: boolean;
  emailFrequency: 'instant' | 'daily' | 'weekly';
  notificationEmail?: string;
  timezone: string;
  orderPrefix: string;
  analyticsEnabled: boolean;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>({
  storeName: {
    type: String,
    required: true,
    default: 'Threads Charity'
  },
  logo: String,
  currency: {
    type: String,
    required: true,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP']
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  emailFrequency: {
    type: String,
    enum: ['instant', 'daily', 'weekly'],
    default: 'instant'
  },
  notificationEmail: {
    type: String,
    validate: {
      validator: function(v: string) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  orderPrefix: {
    type: String,
    default: 'THR',
    minlength: [2, 'Order prefix must be at least 2 characters'],
    maxlength: [5, 'Order prefix cannot exceed 5 characters']
  },
  analyticsEnabled: {
    type: Boolean,
    default: true
  },
  backupEnabled: {
    type: Boolean,
    default: false
  },
  backupFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for tracking updates
settingsSchema.index({ updatedAt: -1 });

export const Settings = model<ISettings>('Settings', settingsSchema);