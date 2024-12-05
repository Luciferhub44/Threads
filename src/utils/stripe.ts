import { loadStripe } from '@stripe/stripe-js';
import { config } from '../config/payment';
import { PaymentResult } from '../types';

export const stripePromise = loadStripe(config.stripe.publishableKey);

export const processStripePayment = async (amount: number): Promise<PaymentResult> => {
  const stripe = await stripePromise;
  
  try {
    if (!stripe) {
      return {
        success: false,
        error: { message: 'Payment system unavailable', code: 'STRIPE_LOAD_ERROR' }
      };
    }

    const response = await fetch(`${config.apiUrl}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: { message: error.message || 'Payment failed', code: 'API_ERROR' }
      };
    }

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          // Card details will be collected by Stripe Elements
        },
      },
    });

    if (result.error) {
      return {
        success: false,
        error: {
          message: result.error.message || 'Payment failed',
          code: result.error.code
        }
      };
    }

    return {
      success: true,
      transactionId: result.paymentIntent?.id
    };
  } catch (error) {
    return {
      success: false,
      error: { message: 'An unexpected error occurred', code: 'UNKNOWN_ERROR' }
    };
  }
};