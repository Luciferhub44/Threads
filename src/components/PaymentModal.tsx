import React from 'react';
import { processStripePayment } from '../utils/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { X, CreditCard } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { LoadingSpinner } from './LoadingSpinner';
import { config } from '../config/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentSuccess,
}) => {
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
      trackEvent({
        category: 'Payment',
        action: 'InitiateStripePayment',
        value: amount
      });

      const result = await processStripePayment(amount);
      
      if (result.success) {
        setIsSuccess(true);
        trackEvent({
          category: 'Payment',
          action: 'StripePaymentSuccess',
          value: amount
        });
        setTimeout(() => {
          onPaymentSuccess();
          onClose();
        }, 2000);
      } else {
        trackEvent({
          category: 'Payment',
          action: 'StripePaymentError',
          label: result.error?.code
        });
        setError(result.error?.message || 'Payment failed');
      }
    } catch (err: unknown) {
      trackEvent({
        category: 'Payment',
        action: 'StripePaymentError',
        label: 'UnexpectedError'
      });
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
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <StripePaymentForm
              onSubmit={handleStripePayment}
              isProcessing={isProcessing}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PaymentModal };