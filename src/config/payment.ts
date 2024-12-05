const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (required && !value) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value || '';
};

export const config = {
  environment: import.meta.env.DEV ? 'development' : 'production',
  stripe: {
    publishableKey: getEnvVar('VITE_STRIPE_PUBLISHABLE_KEY'),
  },
  apiUrl: `${getEnvVar('VITE_API_URL')}/api`,
} as const;