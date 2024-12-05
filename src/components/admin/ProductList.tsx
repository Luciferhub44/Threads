import React from 'react';
import { Edit2, Trash2, Search, Filter, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { LoadingSpinner } from '../LoadingSpinner';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'name' | 'price'>('name');
  const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProducts(e.target.checked ? products.map(p => p.id) : []);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
      return;
    }

    try {
      await Promise.all(selectedProducts.map(id => onDelete(id)));
      setSelectedProducts([]);
    } catch (err) {
      setError('Failed to delete selected products');
    }
  };

  const filteredProducts = React.useMemo(() => {
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      });
  }, [products, searchTerm, sortBy, sortOrder]);

  const handleDelete = async (productId: string) => {
    if (deleteConfirm === productId) {
      try {
        setIsDeleting(productId);
        setError(null);
        await onDelete(productId);
        setDeleteConfirm(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete product');
      } finally {
        setIsDeleting(null);
      }
    } else {
      setDeleteConfirm(productId);
    }
  };

  return (
    <div className="bg-white shadow-sm overflow-hidden sm:rounded-lg border border-gray-200">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 space-y-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {selectedProducts.length > 0 && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Delete Selected
              </button>
            </div>
          )}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'name' | 'price');
                  setSortOrder('asc'); // Reset order when changing sort field
                }}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="name">Sort by name</option>
                <option value="price">Sort by price</option>
              </select>
              <button
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                className="ml-2 p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sizes
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredProducts.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </td>
            <td className="px-6 py-4">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      {product.sizes.map((size) => (
                        <span key={size} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {size}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatCurrency(product.price)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                {product.sizes.map((size) => (
                  <span key={size} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {size}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="mr-2 p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className={`p-2 ${
                    isDeleting === product.id
                      ? 'text-red-600 bg-red-50 rounded-md'
                      : 'text-red-400 hover:text-red-500'
                  }`}
                  disabled={isDeleting === product.id}
                >
                  {isDeleting === product.id ? (
                    <LoadingSpinner size="sm" className="text-red-500" />
                  ) : (
                    <Trash2 className="h-5 w-5 text-red-500" />
                  )}
                </button>
              </div>
            </td>
          </tr>
        ))}
        {filteredProducts.length === 0 && (
          <tr>
          <td colSpan={5} className="px-4 py-8 text-center">
            <p className="text-gray-500">
              {searchTerm ? 'No products match your search' : 'No products available'}
            </p>
          </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};