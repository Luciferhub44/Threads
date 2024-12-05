import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Heart, Share2, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { updateSEO } from '../utils/seo';
import { toast } from '../utils/toast';

interface ProductPageProps {
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const product = products.find(p => p.id === id);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setIsAddingToCart(true);
    setTimeout(() => {
      onAddToCart(product!, selectedSize);
      setIsAddingToCart(false);
      toast.success('Added to cart successfully');
    }, 500);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: product?.name,
            text: product?.description,
            url: window.location.href
          });
          toast.success('Shared successfully');
        } catch (shareError) {
          // If share fails, fallback to clipboard
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard');
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      toast.error('Unable to share. Please try again.');
    }
  };

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
    <m.div
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
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <LoadingSpinner size="lg" className="text-red-500" />
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600'
              } rounded-full shadow-md hover:opacity-90 transition-all transform hover:scale-105`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Available for Donation
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
              <span className="text-red-500 ml-1">*</span>
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
                  } transition-all transform hover:scale-105`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="mt-1 text-sm text-red-500">Please select a size</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <>
                <LoadingSpinner size="sm" className="text-white" />
                <span>Adding to Cart...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Donate Now</span>
              </>
            )}
          </button>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Impact Information
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Provides warmth to someone in need
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                High-quality, durable material
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Distributed through local shelters
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                100% of proceeds go to charity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </m.div>
  );
};