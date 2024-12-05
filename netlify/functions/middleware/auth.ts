import { Context } from '@netlify/edge-functions';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (context: Context) => {
  try {
    const authHeader = context.request.headers.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    context.state.user = decoded;
    
    return context.next();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};