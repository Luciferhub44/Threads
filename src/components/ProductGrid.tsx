import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Product } from '../types';
import { products } from '../data/products';
import { trackEvent } from '../utils/analytics';

interface ProductGridProps {
  onAddToCart: (product: Product, size: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate products loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      trackEvent({
        category: 'Products',
        action: 'ProductsLoaded',
        label: 'Success'
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product, size: string) => {
    trackEvent({
      category: 'Cart',
      action: 'AddToCart',
      label: product.name,
      value: product.price
    });
    onAddToCart(product, size);
  };

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
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" className="text-red-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductGrid };