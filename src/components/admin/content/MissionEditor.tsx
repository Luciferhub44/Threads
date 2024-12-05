import React from 'react';
import { Plus, X } from 'lucide-react';
import { MissionContent } from '../../../types';

interface MissionEditorProps {
  content: MissionContent;
  onChange: (content: MissionContent) => void;
}

export const MissionEditor: React.FC<MissionEditorProps> = ({ content, onChange }) => {
  const handleAddCard = () => {
    onChange({
      cards: [
        ...content.cards,
        { title: '', description: '' }
      ]
    });
  };

  const handleRemoveCard = (index: number) => {
    onChange({
      cards: content.cards.filter((_, i) => i !== index)
    });
  };

  const handleUpdateCard = (index: number, field: 'title' | 'description', value: string) => {
    const newCards = [...content.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    onChange({ cards: newCards });
  };

  return (
    <div className="space-y-4">
      {content.cards.map((card, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-900">Card {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveCard(index)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={card.title}
              onChange={(e) => handleUpdateCard(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={card.description}
              onChange={(e) => handleUpdateCard(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCard}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Card
      </button>
    </div>
  );
};