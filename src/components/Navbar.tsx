import React from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemsCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Impact', id: 'impact' },
    { name: 'Mission', id: 'mission' },
    { name: 'Products', id: 'products' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Partners', id: 'partners' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          <div className="flex-shrink-0 w-32">
            <img src="/threads-logo.png" alt="Threads" className="w-full h-auto" />
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className="text-gray-600 hover:text-red-500 transition-colors px-3 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-gray-700 hover:text-red-500 cursor-pointer">
              <Heart className="h-6 w-6" />
            </div>
            <div className="relative cursor-pointer" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};