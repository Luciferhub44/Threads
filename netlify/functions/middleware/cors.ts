import { Context } from '@netlify/edge-functions';

export const corsMiddleware = async (context: Context) => {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  const response = await context.next();
  headers.forEach((value, key) => response.headers.set(key, value));
  
  return response;
};