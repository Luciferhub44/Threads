import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { connectDB } from '../../server/config/database';
import productRoutes from '../../server/routes/productRoutes';
import orderRoutes from '../../server/routes/orderRoutes';
import userRoutes from '../../server/routes/userRoutes';
import settingsRoutes from '../../server/routes/settingsRoutes';

const api = express();

// Connect to MongoDB
connectDB();

// Middleware
api.use(cors());
api.use(express.json());

// Routes
api.use('/.netlify/functions/api/products', productRoutes);
api.use('/.netlify/functions/api/orders', orderRoutes);
api.use('/.netlify/functions/api/users', userRoutes);
api.use('/.netlify/functions/api/settings', settingsRoutes);

// Health check
api.get('/.netlify/functions/api/health', (_, res) => {
  res.json({ status: 'healthy' });
});

export const handler = serverless(api);