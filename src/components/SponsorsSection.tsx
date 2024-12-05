import React from 'react';

interface SponsorLogoProps {
  name: string;
  className?: string;
}

const SponsorLogo: React.FC<SponsorLogoProps> = ({ name, className = "" }) => (
  <div className={`bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md ${className}`}>
    <span className="text-2xl font-bold text-gray-800">{name[0]}</span>
  </div>
);

export const SponsorsSection: React.FC = () => {
  const sponsors = [
    { name: 'Acme Corp', color: 'hover:text-blue-600' },
    { name: 'Globex', color: 'hover:text-green-600' },
    { name: 'Soylent', color: 'hover:text-purple-600' },
    { name: 'Initech', color: 'hover:text-yellow-600' },
    { name: 'Umbrella', color: 'hover:text-red-600' },
    { name: 'Hooli', color: 'hover:text-indigo-600' },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {sponsors.map((sponsor, index) => (
            <div key={sponsor.name} className="group cursor-pointer transition-transform hover:scale-110">
              <SponsorLogo 
                name={sponsor.name} 
                className={`transition-colors ${sponsor.color}`}
              />
              <p className="mt-2 text-sm text-gray-600 text-center group-hover:font-medium">
                {sponsor.name}
              </p>
            </div>
          ))}
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