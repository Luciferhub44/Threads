import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

export const handler: Handler = async () => {
  try {
    // Test database connection
    const client = await MongoClient.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000
    });
    await client.close();

    // Test Cloudinary configuration
    const { v2: cloudinary } = require('cloudinary');
    await cloudinary.api.ping();

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          cloudinary: 'connected'
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Service unavailable'
      })
    };
  }
};