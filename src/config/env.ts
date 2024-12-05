interface EnvConfig {
  apiUrl: string;
  stripePublishableKey: string;
  isDevelopment: boolean;
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || '',
  stripePublishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  isDevelopment: import.meta.env.DEV || false,
};