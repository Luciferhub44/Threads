import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { HeroContent } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div id="hero" className="relative overflow-hidden min-h-[600px]">
      {content.backgroundImage && (
        <>
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <LoadingSpinner size="lg" className="text-red-500" />
            </div>
          )}
          <img
            src={content.backgroundImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{content.heading.split(' ')[0]}</span>
                <span className="block text-red-500">
                  {content.heading.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {content.subheading}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const productsSection = document.getElementById('products');
                      if (productsSection) {
                        const offset = 80;
                        const elementPosition = productsSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10"
                  >
                    {content.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};