import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000',
  corsOrigins: process.env.NODE_ENV === 'production' 
    ? ['https://threads-charity.netlify.app']
    : ['http://localhost:5173', 'http://localhost:4173']
};