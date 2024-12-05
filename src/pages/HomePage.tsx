import React from 'react';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { ImpactSection } from '../components/ImpactSection';
import { MissionSection } from '../components/MissionSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { SponsorsSection } from '../components/SponsorsSection';
import { Product, HomepageSection } from '../types';

interface HomePageProps {
  onAddToCart: (product: Product, size: string) => void;
  content: HomepageSection[];
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, content }) => {
  const getSection = (type: string) => content.find(section => section.type === type);

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <>
      {getSection('hero')?.isVisible && <Hero content={getSection('hero')?.content} />}
      {getSection('impact')?.isVisible && <ImpactSection content={getSection('impact')?.content} />}
      {getSection('mission')?.isVisible && <MissionSection content={getSection('mission')?.content} />}
      <ProductGrid onAddToCart={onAddToCart} />
      {getSection('testimonial')?.isVisible && (
        <TestimonialSection content={getSection('testimonial')?.content} />
      )}
      {getSection('sponsor')?.isVisible && (
        <SponsorsSection content={getSection('sponsor')?.content} />
      )}
    </>
  );
};