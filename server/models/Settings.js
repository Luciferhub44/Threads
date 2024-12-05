import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
    default: 'Threads Charity'
  },
  logo: {
    type: String
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
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
  notificationEmail: String,
  timezone: {
    type: String,
    default: 'UTC'
  },
  orderPrefix: {
    type: String,
    default: 'THR'
  }
}, {
  timestamps: true
});

export const Settings = mongoose.model('Settings', settingsSchema);