import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { products } from '../data/products';

interface ProductGridProps {
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  return (
    <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Make a Difference
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose a hoodie to donate. Each purchase provides warmth and comfort to someone in need.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};