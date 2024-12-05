import { Handler } from '@netlify/functions';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const collection = db.collection('users');

    switch (event.httpMethod) {
      case 'POST':
        // Handle registration
        if (event.path.endsWith('/register')) {
          const { name, email, password } = JSON.parse(event.body || '{}');

          // Check if user exists
          const existingUser = await collection.findOne({ email });
          if (existingUser) {
            return {
              statusCode: 400,
              body: JSON.stringify({ error: 'User already exists' })
            };
          }

          // Hash password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Create user
          const result = await collection.insertOne({
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
            createdAt: new Date()
          });

          const token = jwt.sign(
            { id: result.insertedId },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
          );

          return {
            statusCode: 201,
            body: JSON.stringify({
              token,
              user: {
                id: result.insertedId,
                name,
                email,
                isAdmin: false
              }
            })
          };
        }

        // Handle login
        if (event.path.endsWith('/login')) {
          const { email, password } = JSON.parse(event.body || '{}');

          const user = await collection.findOne({ email });
          if (!user) {
            return {
              statusCode: 401,
              body: JSON.stringify({ error: 'Invalid credentials' })
            };
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return {
              statusCode: 401,
              body: JSON.stringify({ error: 'Invalid credentials' })
            };
          }

          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
          );

          return {
            statusCode: 200,
            body: JSON.stringify({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
              }
            })
          };
        }

        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Route not found' })
        };

      case 'GET':
        // Get user profile
        if (event.queryStringParameters?.id) {
          const user = await collection.findOne(
            { _id: new ObjectId(event.queryStringParameters.id) },
            { projection: { password: 0 } }
          );

          if (!user) {
            return {
              statusCode: 404,
              body: JSON.stringify({ error: 'User not found' })
            };
          }

          return {
            statusCode: 200,
            body: JSON.stringify(user)
          };
        }

        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'User ID required' })
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