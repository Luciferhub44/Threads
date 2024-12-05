import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { processStripePayment } from '../utils/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { X, CreditCard } from 'lucide-react';
import { stripePromise } from '../utils/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleBack = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleStripePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await processStripePayment(amount);
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2000);
      } else {
        setError(result.error?.message || 'Payment failed');
      }
    } catch (err: unknown) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              disabled={isProcessing}
              className="text-gray-600 hover:text-gray-800 flex items-center disabled:opacity-50"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Complete Donation</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              {!isProcessing && <X className="h-6 w-6" />}
            </button>
          </div>

          {isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-center font-medium">
                Thank you for your donation! Processing your payment...
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                  paymentMethod === 'stripe'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setPaymentMethod('stripe')}
                disabled={isProcessing}
              >
                <CreditCard className="h-5 w-5" />
                <span>Credit Card</span>
              </button>
              <button
                className={`px-6 py-3 rounded-lg ${
                  paymentMethod === 'paypal'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setPaymentMethod('paypal')}
                disabled={isProcessing}
              >
                PayPal
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {paymentMethod === 'stripe' ? (
              <Elements stripe={stripePromise} options={{ appearance: { theme: 'stripe' } }}>
                <StripePaymentForm
                  onSubmit={handleStripePayment}
                  isProcessing={isProcessing}
                  error={error}
                />
              </Elements>
            ) : (
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                      {
                        amount: {
                          value: (amount / 100).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  try {
                    const details = await actions.order!.capture();
                    if (details.status !== 'COMPLETED') {
                      throw new Error('Payment not completed');
                    }
                    onPaymentSuccess();
                    onClose();
                  } catch (error) {
                    setError('PayPal payment failed. Please try again.');
                  }
                }}
                onError={() => {
                  setError('PayPal encountered an error. Please try again.');
                }}
                style={{ layout: 'vertical' }}
                disabled={isProcessing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};