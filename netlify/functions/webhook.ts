import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { MongoClient } from 'mongodb';

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
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      event.headers['stripe-signature']!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const db = await connectToDatabase();
    const ordersCollection = db.collection('orders');

    switch (stripeEvent.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = stripeEvent.data.object as Stripe.PaymentIntent;
        
        // Update order status
        await ordersCollection.updateOne(
          { 'paymentInfo.id': paymentIntent.id },
          {
            $set: {
              'paymentInfo.status': 'succeeded',
              status: 'Processing',
              updatedAt: new Date()
            }
          }
        );
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = stripeEvent.data.object as Stripe.PaymentIntent;
        
        // Update order status
        await ordersCollection.updateOne(
          { 'paymentInfo.id': failedPayment.id },
          {
            $set: {
              'paymentInfo.status': 'failed',
              status: 'Failed',
              updatedAt: new Date()
            }
          }
        );
        break;

      // Handle other webhook events as needed
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Webhook Error'
      })
    };
  }
};