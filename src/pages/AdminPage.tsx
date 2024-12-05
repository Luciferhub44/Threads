import React, { useEffect } from 'react';
import { Product, NewProduct } from '../types';
import { ProductForm } from '../components/admin/ProductForm';
import { DashboardLayout } from '../components/admin/DashboardLayout';
import { DashboardTab } from '../components/admin/tabs/DashboardTab';
import { ProductsTab } from '../components/admin/tabs/ProductsTab';
import { SettingsTab } from '../components/admin/tabs/SettingsTab';
import { ContentTab } from '../components/admin/tabs/ContentTab';
import { products } from '../data/products';
import { defaultHomepageSections } from '../data/homepage';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [newProduct, setNewProduct] = React.useState<NewProduct | null>(null);
  const [productList, setProductList] = React.useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [showAnalytics, setShowAnalytics] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [homepageSections, setHomepageSections] = React.useState(defaultHomepageSections);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const defaultNewProduct = {
    name: '',
    price: 0,
    description: '',
    image: null,
    sizes: ['S', 'M', 'L', 'XL']
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);

    // For development, allow any password
    setIsAuthenticated(true);
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setNewProduct(null);
    setEditingProduct(null);
    setError(null);
    window.location.href = '/';
  };

  useEffect(() => {
    // In a real app, fetch products from API
    setProductList(products);
    setIsLoadingProducts(false);
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct) return;
    if (!newProduct.image) {
      setError('Product image is required');
      return;
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === 'sizes') {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'price') {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add product');
      }

      // Reset form and refresh products
      // In a real app, fetch updated products from API
      setNewProduct(null);
      setProductList(prevProducts => [...prevProducts, { ...newProduct, id: Date.now().toString() }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const handleEditProduct = async (product: Product) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      setProductList(prevProducts =>
        prevProducts.map(p => (p.id === product.id ? product : p))
      );
      setEditingProduct(null);
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Show confirmation dialog
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove product from local state
      setProductList(prevProducts => prevProducts.filter(p => p.id !== productId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleViewReports = () => {
    setShowAnalytics(true);
    setActiveTab('dashboard');
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    setActiveTab('settings');
  };

  const handleExportData = async () => {
    try {
      // In a real app, this would call an API endpoint
      const data = {
        products: productList,
        analytics: {
          totalDonations: 12426,
          totalProducts: productList.length,
          totalOrders: 845,
          totalDonors: 426
        }
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `threads-analytics-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export data');
    }
  };

  const handleHelp = () => {
    window.open('mailto:support@threads-charity.org', '_blank');
  };

  const handleUpdateSections = async (sections: HomepageSection[]) => {
    try {
      // In a real app, this would be an API call
      setHomepageSections(sections);
      return true;
    } catch (error) {
      console.error('Failed to update sections:', error);
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/threads-logo.png"
              alt="Threads Admin"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isAuthenticating ? 'Logging in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === 'dashboard' && (
        <DashboardTab
          onNewProduct={() => setNewProduct(defaultNewProduct)}
          onViewReports={handleViewReports}
          onOpenSettings={handleOpenSettings}
          onExportData={handleExportData}
          onHelp={handleHelp}
          showAnalytics={showAnalytics}
        />
      )}

      {activeTab === 'products' && (
        <ProductsTab
          products={productList}
          isLoading={isLoadingProducts}
          onNewProduct={() => setNewProduct(defaultNewProduct)}
          onEdit={(product) => {
            setEditingProduct(product);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
        />
      )}

      {activeTab === 'content' && (
        <ContentTab
          sections={homepageSections}
          onUpdate={handleUpdateSections}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsTab
          onSave={async (settings) => {
            // In a real app, this would save to an API
            console.log('Saving settings:', settings);
            return true;
          }}
        />
      )}

      {newProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setNewProduct(null)}
            />
          </div>
        </div>
      )}

      {editingProduct && isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleEditProduct}
              onCancel={() => {
                setEditingProduct(null);
                setIsEditModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </DashboardLayout>
  );
};