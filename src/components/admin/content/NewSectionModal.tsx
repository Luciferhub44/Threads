import React from 'react';
import { X } from 'lucide-react';
import { HomepageSection } from '../../../types';

interface NewSectionModalProps {
  onClose: () => void;
  onAdd: (section: Omit<HomepageSection, 'id' | 'order'>) => void;
}

const sectionTypes = [
  {
    type: 'hero',
    title: 'Hero Section',
    description: 'Main banner section with heading and call-to-action',
    defaultContent: {
      heading: 'New Hero Section',
      subheading: 'Add your compelling message here',
      ctaText: 'Get Started'
    }
  },
  {
    type: 'impact',
    title: 'Impact Section',
    description: 'Showcase your achievements and statistics',
    defaultContent: {
      stats: [
        { number: '0', label: 'New Stat' }
      ]
    }
  },
  {
    type: 'mission',
    title: 'Mission Section',
    description: 'Highlight your mission and values',
    defaultContent: {
      cards: [
        { title: 'New Card', description: 'Add your mission details' }
      ]
    }
  },
  {
    type: 'testimonial',
    title: 'Testimonial Section',
    description: 'Share customer testimonials and reviews',
    defaultContent: {
      testimonials: [
        { quote: 'Add a testimonial', author: 'Author Name', role: 'Role' }
      ]
    }
  },
  {
    type: 'sponsor',
    title: 'Sponsor Section',
    description: 'Display partner and sponsor logos',
    defaultContent: {
      sponsors: [
        { name: 'New Sponsor' }
      ]
    }
  }
];

export const NewSectionModal: React.FC<NewSectionModalProps> = ({ onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Section</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionTypes.map((sectionType) => (
            <button
              key={sectionType.type}
              onClick={() => {
                onAdd({
                  type: sectionType.type as HomepageSection['type'],
                  title: sectionType.title,
                  content: sectionType.defaultContent,
                  isVisible: true
                });
                onClose();
              }}
              className="p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all text-left"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {sectionType.title}
              </h3>
              <p className="text-sm text-gray-500">
                {sectionType.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};