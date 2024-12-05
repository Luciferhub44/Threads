interface EnvConfig {
  apiUrl: string;
  stripePublishableKey: string;
  isDevelopment: boolean;
  isProduction: boolean;
  nodeEnv: string;
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || '/.netlify/functions/api',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  isDevelopment: import.meta.env.DEV || false,
  isProduction: import.meta.env.PROD || false,
  nodeEnv: import.meta.env.NODE_ENV || 'development'
};