import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderItems: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  }],
  paymentInfo: {
    id: { type: String },
    status: { type: String },
    type: { type: String }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Processing'
  },
  donationRecipient: {
    name: String,
    organization: String,
    address: String
  }
}, {
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);