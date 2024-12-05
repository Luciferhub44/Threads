import React from 'react';
import { Users, Heart, Globe } from 'lucide-react';

interface ImpactStatProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const ImpactStat: React.FC<ImpactStatProps> = ({ icon, number, label }) => (
  <div className="flex flex-col items-center">
    <div className="text-red-500 mb-2">{icon}</div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{number}</div>
    <div className="text-gray-600 text-center">{label}</div>
  </div>
);

export const ImpactSection: React.FC = () => {
  return (
    <section id="impact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Impact
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Together, we're making a difference in communities worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ImpactStat
            icon={<Users className="w-8 h-8" />}
            number="10,000+"
            label="People Helped"
          />
          <ImpactStat
            icon={<Heart className="w-8 h-8" />}
            number="15,000+"
            label="Hoodies Donated"
          />
          <ImpactStat
            icon={<Globe className="w-8 h-8" />}
            number="50+"
            label="Cities Reached"
          />
        </div>
      </div>
    </section>
  );
};