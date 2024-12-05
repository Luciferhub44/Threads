import { Handler } from '@netlify/functions';
import { MongoClient, ObjectId } from 'mongodb';

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
    const collection = db.collection('products');

    switch (event.httpMethod) {
      case 'GET':
        if (event.queryStringParameters?.id) {
          const product = await collection.findOne({
            _id: new ObjectId(event.queryStringParameters.id)
          });
          return {
            statusCode: 200,
            body: JSON.stringify(product)
          };
        }
        
        const products = await collection.find({}).toArray();
        return {
          statusCode: 200,
          body: JSON.stringify(products)
        };

      case 'POST':
        const newProduct = JSON.parse(event.body || '{}');
        const result = await collection.insertOne(newProduct);
        return {
          statusCode: 201,
          body: JSON.stringify({
            id: result.insertedId,
            ...newProduct
          })
        };

      case 'PUT':
        const { id, ...updateData } = JSON.parse(event.body || '{}');
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Product updated successfully' })
        };

      case 'DELETE':
        const productId = event.queryStringParameters?.id;
        await collection.deleteOne({ _id: new ObjectId(productId) });
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Product deleted successfully' })
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