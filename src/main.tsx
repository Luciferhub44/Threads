import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ErrorBoundary } from './utils/errorBoundary';
import { config } from './config/payment';
import App from './App.tsx';
import './index.css';

const paypalOptions = {
  clientId: config.paypal.clientId,
  currency: 'USD',
  intent: 'capture',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PayPalScriptProvider 
        options={paypalOptions}
        deferLoading={!config.paypal.clientId}
      >
        <App />
      </PayPalScriptProvider>
    </ErrorBoundary>
  </StrictMode>
);
