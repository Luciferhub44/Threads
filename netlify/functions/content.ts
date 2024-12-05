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
    const collection = db.collection('content');

    switch (event.httpMethod) {
      case 'GET':
        const content = await collection.findOne({}) || {};
        return {
          statusCode: 200,
          body: JSON.stringify(content)
        };

      case 'PUT':
        const updateData = JSON.parse(event.body || '{}');
        await collection.updateOne(
          {}, 
          { $set: updateData },
          { upsert: true }
        );
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Content updated successfully' })
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