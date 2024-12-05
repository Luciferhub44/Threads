import React from 'react';
import { X } from 'lucide-react';
import { CartItem, DonorInfo } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { CheckoutForm } from './CheckoutForm';
import { PaymentModal } from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string, size: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const [donorInfo, setDonorInfo] = React.useState<DonorInfo | null>(null);
  const [showBackButton, setShowBackButton] = React.useState(false);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (donorInfo: DonorInfo) => {
    setShowBackButton(true);
    setDonorInfo(donorInfo);
    setShowPayment(true);
  };

  const handleBack = () => {
    if (showPayment) {
      setShowPayment(false);
      setShowBackButton(true);
    } else if (isCheckingOut) {
      setIsCheckingOut(false);
      setShowBackButton(false);
    }
  };

  const handlePaymentSuccess = () => {
    // Here you would typically handle post-payment processing
    console.log('Payment successful:', { donorInfo, items, total });
  };

  return (
    <>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
          <div className="flex justify-between items-center mb-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 flex items-center"
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
            )}
            <h2 className="text-2xl font-bold text-gray-900">Your Donations</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your donation cart is empty</p>
          ) : (
            isCheckingOut ? (
              <CheckoutForm
                onSubmit={handleCheckout}
                onCancel={() => setIsCheckingOut(false)}
              />
            ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-900">Total Donation</span>
                  <span className="font-bold text-xl text-gray-900">{formatCurrency(total)}</span>
                </div>
                <button
                  className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Complete Donation
                </button>
              </div>
            </>
            )
          )}
        </div>
      </div>
    </div>
    <PaymentModal
      isOpen={showPayment}
      onClose={() => setShowPayment(false)}
      amount={Math.round(total * 100)}
      onPaymentSuccess={handlePaymentSuccess}
    />
    </>
  );
};

export { CartModal };