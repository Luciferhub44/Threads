import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  logo?: string | null;
}

export const Footer: React.FC<FooterProps> = ({ logo }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <img 
              src={logo || '/threads-logo.png'}
              alt="Threads - Donate Warmth, Share Comfort" 
              className="w-32 h-auto brightness-0 invert object-contain" 
              loading="lazy"
            />
            <p className="text-sm">
              Empowering communities through warmth and comfort. Every donation makes a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Our Mission</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Impact Stories</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Partner With Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>123 Charity Lane, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-500" />
                <span>donate@threads.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates on our impact.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};