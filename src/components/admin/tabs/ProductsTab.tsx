import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../../../types';
import { LoadingSpinner } from '../../LoadingSpinner';
import { ProductList } from '../ProductList';

interface ProductsTabProps {
  products: Product[];
  isLoading: boolean;
  onNewProduct: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  isLoading,
  onNewProduct,
  onEdit,
  onDelete
}) => {
  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={onNewProduct}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" className="text-red-500" />
        </div>
      ) : (
        <ProductList
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
};