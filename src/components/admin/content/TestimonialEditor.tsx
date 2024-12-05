import React from 'react';
import { Plus, X } from 'lucide-react';
import { TestimonialContent } from '../../../types';

interface TestimonialEditorProps {
  content: TestimonialContent;
  onChange: (content: TestimonialContent) => void;
}

export const TestimonialEditor: React.FC<TestimonialEditorProps> = ({ content, onChange }) => {
  const handleAddTestimonial = () => {
    onChange({
      testimonials: [
        ...content.testimonials,
        { quote: '', author: '', role: '' }
      ]
    });
  };

  const handleRemoveTestimonial = (index: number) => {
    onChange({
      testimonials: content.testimonials.filter((_, i) => i !== index)
    });
  };

  const handleUpdateTestimonial = (
    index: number,
    field: 'quote' | 'author' | 'role',
    value: string
  ) => {
    const newTestimonials = [...content.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    onChange({ testimonials: newTestimonials });
  };

  return (
    <div className="space-y-4">
      {content.testimonials.map((testimonial, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-900">Testimonial {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveTestimonial(index)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quote</label>
            <textarea
              value={testimonial.quote}
              onChange={(e) => handleUpdateTestimonial(index, 'quote', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={testimonial.author}
                onChange={(e) => handleUpdateTestimonial(index, 'author', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={testimonial.role}
                onChange={(e) => handleUpdateTestimonial(index, 'role', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddTestimonial}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Testimonial
      </button>
    </div>
  );
};