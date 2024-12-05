import { Handler } from '@netlify/functions';
import { MongoClient } from 'mongodb';

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db('threads-charity');
  cachedDb = db;
  return db;
}

export const handler: Handler = async (event) => {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');
    const productsCollection = db.collection('products');
    const usersCollection = db.collection('users');

    // Get analytics data
    const [totalDonations, totalProducts, totalOrders, totalDonors] = await Promise.all([
      ordersCollection.aggregate([
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]).toArray(),
      productsCollection.countDocuments(),
      ordersCollection.countDocuments(),
      usersCollection.countDocuments()
    ]);

    // Get monthly donation trends
    const monthlyDonations = await ordersCollection.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify({
        summary: {
          totalDonations: totalDonations[0]?.total || 0,
          totalProducts,
          totalOrders,
          totalDonors
        },
        trends: {
          monthly: monthlyDonations
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};