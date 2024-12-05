import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <Quote className="w-8 h-8 text-red-500 mb-4" />
    <p className="text-gray-600 mb-4 italic">{quote}</p>
    <div className="font-semibold text-gray-900">{author}</div>
    <div className="text-gray-500 text-sm">{role}</div>
  </div>
);

export const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Voices of Impact
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from our community partners and supporters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            quote="The quality of hoodies provided by Threads has made a real difference in our shelter. Our residents feel valued and cared for."
            author="Sarah Johnson"
            role="Shelter Director"
          />
          <Testimonial
            quote="Being able to give warm, high-quality hoodies to those in need has been incredible. The smiles we see are priceless."
            author="Michael Chen"
            role="Community Organizer"
          />
          <Testimonial
            quote="Threads has been an amazing partner in our mission to support homeless youth. Their dedication to quality and service is unmatched."
            author="Lisa Rodriguez"
            role="Outreach Coordinator"
          />
        </div>
      </div>
    </section>
  );
};