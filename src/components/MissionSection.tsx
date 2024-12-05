import React from 'react';
import { Target, Shield, Heart } from 'lucide-react';

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-red-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We believe in creating positive change through simple acts of kindness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MissionCard
            icon={<Target className="w-8 h-8" />}
            title="Direct Impact"
            description="Every hoodie purchased goes directly to someone in need, ensuring immediate impact in local communities."
          />
          <MissionCard
            icon={<Shield className="w-8 h-8" />}
            title="Quality Assurance"
            description="We ensure all donated hoodies meet high-quality standards for comfort and durability."
          />
          <MissionCard
            icon={<Heart className="w-8 h-8" />}
            title="Community Focus"
            description="Working with local organizations to identify and reach those most in need of warmth and comfort."
          />
        </div>
      </div>
    </section>
  );
};