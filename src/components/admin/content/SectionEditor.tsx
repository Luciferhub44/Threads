import React from 'react';
import { HomepageSection } from '../../../types';
import { X } from 'lucide-react';
import { MissionEditor } from './MissionEditor';
import { HeroEditor } from './HeroEditor';
import { TestimonialEditor } from './TestimonialEditor';
import { SponsorEditor } from './SponsorEditor';

interface SectionEditorProps {
  section: HomepageSection;
  onSave: (section: HomepageSection) => Promise<void>;
  onCancel: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onSave,
  onCancel,
}) => {
  const [editedSection, setEditedSection] = React.useState(section);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(editedSection);
    } finally {
      setIsSaving(false);
    }
  };

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return <HeroEditor 
          content={editedSection.content} 
          onChange={(content) => setEditedSection({ ...editedSection, content })} 
        />;

      case 'impact':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Impact Stats
            </label>
            {editedSection.content.stats.map((stat: any, index: number) => (
              <div key={index} className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => {
                      const newStats = [...editedSection.content.stats];
                      newStats[index] = {
                        ...newStats[index],
                        number: e.target.value,
                      };
                      setEditedSection({
                        ...editedSection,
                        content: { ...editedSection.content, stats: newStats },
                      });
                    }}
                    placeholder="Number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...editedSection.content.stats];
                      newStats[index] = {
                        ...newStats[index],
                        label: e.target.value,
                      };
                      setEditedSection({
                        ...editedSection,
                        content: { ...editedSection.content, stats: newStats },
                      });
                    }}
                    placeholder="Label"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newStats = editedSection.content.stats.filter(
                      (_: any, i: number) => i !== index
                    );
                    setEditedSection({
                      ...editedSection,
                      content: { ...editedSection.content, stats: newStats },
                    });
                  }}
                  className="mt-1 p-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newStats = [
                  ...editedSection.content.stats,
                  { number: '', label: '' },
                ];
                setEditedSection({
                  ...editedSection,
                  content: { ...editedSection.content, stats: newStats },
                });
              }}
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Add Stat
            </button>
          </div>
        );

      case 'mission':
        return (
          <MissionEditor
            content={editedSection.content}
            onChange={(content) =>
              setEditedSection({ ...editedSection, content })
            }
          />
        );

      case 'testimonial':
        return (
          <TestimonialEditor
            content={editedSection.content}
            onChange={(content) =>
              setEditedSection({ ...editedSection, content })
            }
          />
        );

      case 'sponsor':
        return (
          <SponsorEditor
            content={editedSection.content}
            onChange={(content) =>
              setEditedSection({ ...editedSection, content })
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Edit {section.title}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderFields()}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};