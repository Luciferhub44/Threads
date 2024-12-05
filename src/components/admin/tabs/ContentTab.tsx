import React from 'react';
import { HomepageSection } from '../../../types';
import { SectionEditor } from '../content/SectionEditor';
import { NewSectionModal } from '../content/NewSectionModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { saveContent, validateContent, reorderSections, MIN_SECTIONS, MAX_SECTIONS } from '../../../utils/contentManager';
import { GripVertical, Eye, EyeOff, Plus } from 'lucide-react';
import { toast } from '../../../utils/toast';

interface ContentTabProps {
  sections: HomepageSection[];
  onUpdate: (sections: HomepageSection[]) => Promise<void>;
}

export const ContentTab: React.FC<ContentTabProps> = ({ sections, onUpdate }) => {
  const [editingSection, setEditingSection] = React.useState<string | null>(null);
  const [localSections, setLocalSections] = React.useState(sections);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showNewSectionModal, setShowNewSectionModal] = React.useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(localSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setLocalSections(updatedSections);
    handleSave(updatedSections);
  };

  const handleToggleVisibility = (sectionId: string) => {
    const updatedSections = localSections.map(section =>
      section.id === sectionId
        ? { ...section, isVisible: !section.isVisible }
        : section
    );
    setLocalSections(updatedSections);
    handleSave(updatedSections);
  };

  const handleSave = async (sections: HomepageSection[]) => {
    setIsSaving(true);
    setSaveStatus('saving');

    if (sections.length < MIN_SECTIONS) {
      setSaveStatus('error');
      toast.error(`Minimum of ${MIN_SECTIONS} section required`);
      setIsSaving(false);
      return;
    }
    
    try {
      if (!validateContent(sections)) {
        throw new Error('Some sections contain invalid content');
      }
      
      const orderedSections = reorderSections(sections);
      await onUpdate(sections);
      saveContent(orderedSections);
      setLocalSections(orderedSections);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save sections:', error);
      setSaveStatus('error');
      toast.error(error instanceof Error ? error.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDuplicate = (sectionId: string) => {
    if (localSections.length >= MAX_SECTIONS) {
      toast.error(`Maximum of ${MAX_SECTIONS} sections allowed`);
      return;
    }

    const sectionToDuplicate = localSections.find(s => s.id === sectionId);
    if (!sectionToDuplicate) return;

    const newSection = {
      ...sectionToDuplicate,
      id: `${sectionToDuplicate.id}-copy-${Date.now()}`,
      title: `${sectionToDuplicate.title} (Copy)`,
      order: localSections.length
    };

    const updatedSections = [...localSections, newSection];
    setLocalSections(updatedSections);
    handleSave(updatedSections);
  };

  const handleAddSection = (newSection: Omit<HomepageSection, 'id' | 'order'>) => {
    if (localSections.length >= MAX_SECTIONS) {
      toast.error(`Maximum of ${MAX_SECTIONS} sections allowed`);
      return;
    }

    const section: HomepageSection = {
      ...newSection,
      id: `section-${Date.now()}`,
      order: localSections.length
    };

    const updatedSections = [...localSections, section];
    setLocalSections(updatedSections);
    handleSave(updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Homepage Sections</h2>
            {saveStatus === 'saving' && (
              <span className="text-yellow-600 text-sm">Saving changes...</span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-green-600 text-sm">Changes saved!</span>
            )}
            {saveStatus === 'error' && (
              <span className="text-red-600 text-sm">Failed to save changes</span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your homepage sections. Drag to reorder.
          </p>
          <button
            onClick={() => setShowNewSectionModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Section
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="divide-y divide-gray-200"
              >
                {localSections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            {...provided.dragHandleProps}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {section.type}
                            </p>
                          </div>
                          <button
                            onClick={() => handleToggleVisibility(section.id)}
                            className={`p-2 rounded-full ${
                              section.isVisible
                                ? 'text-green-600 hover:text-green-700'
                                : 'text-gray-400 hover:text-gray-500'
                            }`}
                          >
                            {section.isVisible ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <EyeOff className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDuplicate(section.id)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => setEditingSection(section.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {editingSection && (
        <SectionEditor
          section={localSections.find(s => s.id === editingSection)!}
          onSave={async (updatedSection) => {
            const updatedSections = localSections.map(s =>
              s.id === editingSection ? updatedSection : s
            );
            setLocalSections(updatedSections);
            await handleSave(updatedSections);
            setEditingSection(null);
          }}
          onCancel={() => setEditingSection(null)}
        />
      )}

      {showNewSectionModal && (
        <NewSectionModal
          onClose={() => setShowNewSectionModal(false)}
          onAdd={handleAddSection}
        />
      )}
    </div>
  );
};