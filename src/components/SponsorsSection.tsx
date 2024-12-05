import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { SponsorContent } from '../types';

interface SponsorsSectionProps {
  content: SponsorContent;
}

const SPONSORS_PER_PAGE = 4;

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(content.sponsors.length / SPONSORS_PER_PAGE);
  
  const visibleSponsors = content.sponsors.slice(
    currentPage * SPONSORS_PER_PAGE,
    (currentPage + 1) * SPONSORS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="partners" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Partners
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Proud to work with organizations that share our vision
          </p>
        </div>

        <div className="relative">
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">
            {visibleSponsors.map((sponsor, index) => (
              <div key={sponsor.name} className="group cursor-pointer transition-transform hover:scale-110">
                <div className="bg-white rounded-lg w-32 h-32 flex items-center justify-center shadow-md p-4">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-gray-800">{sponsor.name[0]}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-600 text-center group-hover:font-medium">
                  {sponsor.name}
                </p>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
          >
            Become a Partner
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};