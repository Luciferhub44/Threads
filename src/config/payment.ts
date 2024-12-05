const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
};

const isDevelopment = import.meta.env.DEV;

export const config = {
  environment: isDevelopment ? 'development' : 'production',
  stripe: {
    publishableKey: getEnvVar('VITE_STRIPE_PUBLISHABLE_KEY'),
  },
  paypal: {
    clientId: getEnvVar('VITE_PAYPAL_CLIENT_ID'),
  },
  apiUrl: isDevelopment ? 'http://localhost:3000/api' : 'https://api.threads-charity.com/api',
} as const;