import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { updateSEO } from '../utils/seo';

interface ProductPageProps {
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  const product = products.find(p => p.id === id);

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      updateSEO({
        title: `${product.name} - Threads Charity`,
        description: product.description,
        image: product.image
      });
    }
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" className="text-red-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-bold text-red-500 mt-2">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="prose prose-red">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-center rounded-md ${
                    selectedSize === size
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Donate Now</span>
          </button>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Impact Information
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Provides warmth to someone in need</li>
              <li>• High-quality, durable material</li>
              <li>• Distributed through local shelters</li>
              <li>• 100% of proceeds go to charity</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};