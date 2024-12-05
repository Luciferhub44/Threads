import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CartModal } from './components/CartModal';
import { ImpactSection } from './components/ImpactSection';
import { MissionSection } from './components/MissionSection';
import { TestimonialSection } from './components/TestimonialSection';
import { SponsorsSection } from './components/SponsorsSection';
import { Footer } from './components/Footer';
import { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <ImpactSection />
      <MissionSection />
      <ProductGrid onAddToCart={handleAddToCart} />
      <TestimonialSection />
      <SponsorsSection />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
      <Footer />
    </div>
  );
}

export default App;
