import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';
import { Product, CartItem } from './types';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './utils/ScrollToTop';
import { loadContent } from './utils/contentManager';
import { StoreSettings } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [homepageContent, setHomepageContent] = React.useState(loadContent());
  const [settings] = React.useState<StoreSettings>(() => ({
    storeName: 'Threads Charity',
    logo: localStorage.getItem('store_logo') || null,
    emailNotifications: true,
    emailFrequency: 'instant',
    currency: 'USD'
  }));

  React.useEffect(() => {
    setHomepageContent(loadContent());
  }, []);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.selectedSize === size)
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        <ScrollToTop />
        <Navbar
          cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          logo={settings.logo}
        />
        <Routes>
          <Route path="/" element={
            <Elements stripe={stripePromise}>
              <HomePage onAddToCart={handleAddToCart} content={homepageContent} />
            </Elements>
          } />
          <Route path="/product/:id" element={
            <Elements stripe={stripePromise}>
              <ProductPage onAddToCart={handleAddToCart} />
            </Elements>
          } />
          <Route path="/admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
        />
        <Footer logo={settings.logo} />
      </div>
    </>
  );
};

export default App;