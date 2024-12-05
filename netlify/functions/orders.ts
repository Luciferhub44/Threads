import { Handler } from '@netlify/functions';
import { MongoClient, ObjectId } from 'mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

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
    const collection = db.collection('orders');

    switch (event.httpMethod) {
      case 'POST':
        if (event.path.endsWith('/create-payment-intent')) {
          const { amount } = JSON.parse(event.body || '{}');
          
          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'usd',
            automatic_payment_methods: {
              enabled: true,
            },
          });

          return {
            statusCode: 200,
            body: JSON.stringify({
              clientSecret: paymentIntent.client_secret,
            }),
          };
        }

        // Create new order
        const orderData = JSON.parse(event.body || '{}');
        const result = await collection.insertOne(orderData);
        return {
          statusCode: 201,
          body: JSON.stringify({
            id: result.insertedId,
            ...orderData
          })
        };

      case 'GET':
        if (event.queryStringParameters?.id) {
          const order = await collection.findOne({
            _id: new ObjectId(event.queryStringParameters.id)
          });
          return {
            statusCode: 200,
            body: JSON.stringify(order)
          };
        }
        
        const orders = await collection.find({}).toArray();
        return {
          statusCode: 200,
          body: JSON.stringify(orders)
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};