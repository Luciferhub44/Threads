import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Comfort Hoodie',
    price: 29.99,
    description: 'Premium cotton blend hoodie with a soft brushed interior for maximum comfort and warmth.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Winter Warrior Hoodie',
    price: 34.99,
    description: 'Heavy-duty hoodie with thermal lining, perfect for extreme cold weather protection.',
    image: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Urban Essential Hoodie',
    price: 32.99,
    description: 'Versatile everyday hoodie with modern design and durable construction.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '4',
    name: 'Youth Impact Hoodie',
    price: 24.99,
    description: 'Specially designed for young people in need, featuring inspirational messaging.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80',
    sizes: ['S', 'M', 'L', 'XL']
  }
];