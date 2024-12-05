import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { CardMedal } from './CardMedal';
import { LoadingSpinner } from './LoadingSpinner';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <CardMedal label="Donate" />
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {product.name}</span>
        </Link>
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <LoadingSpinner size="md" className="text-red-500" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={handleImageLoad}
          className={`w-full h-64 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          } ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">Select Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-white"
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Donate
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export { ProductCard };