import React from 'react';
import { Plus, X, Upload, Image } from 'lucide-react';
import { SponsorContent } from '../../../types';
import { uploadImage } from '../../../utils/imageUpload';
import { LoadingSpinner } from '../../LoadingSpinner';
import { toast } from '../../../utils/toast';

interface SponsorEditorProps {
  content: SponsorContent;
  onChange: (content: SponsorContent) => void;
}

export const SponsorEditor: React.FC<SponsorEditorProps> = ({ content, onChange }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddSponsor = () => {
    onChange({
      sponsors: [
        ...content.sponsors,
        { name: '', logo: '' }
      ]
    });
  };

  const handleRemoveSponsor = (index: number) => {
    onChange({
      sponsors: content.sponsors.filter((_, i) => i !== index)
    });
  };

  const handleUpdateSponsor = (index: number, field: 'name' | 'logo', value: string) => {
    const newSponsors = [...content.sponsors];
    newSponsors[index] = { ...newSponsors[index], [field]: value };
    onChange({ sponsors: newSponsors });
  };

  const handleImageUpload = async (index: number, file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadImage(file);
      
      if (result.success) {
        handleUpdateSponsor(index, 'logo', result.url);
        toast.success('Logo uploaded successfully');
      } else {
        toast.error(result.error || 'Failed to upload logo');
      }
    } catch (error) {
      toast.error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {content.sponsors.map((sponsor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Sponsor {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveSponsor(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={sponsor.name}
                  onChange={(e) => handleUpdateSponsor(index, 'name', e.target.value)}
                  placeholder="Sponsor name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-500 transition-colors">
                  <div className="space-y-1 text-center">
                    {sponsor.logo ? (
                      <div className="relative w-24 h-24 mx-auto">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-full h-full object-contain rounded-md hover:opacity-75 transition-opacity"
                        />
                        <button
                          onClick={() => handleUpdateSponsor(index, 'logo', '')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg transform hover:scale-110 transition-transform"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/jpeg,image/png,image/gif"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(index, file);
                                e.target.value = ''; // Reset input
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={handleAddSponsor}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Sponsor
      </button>
      
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <LoadingSpinner size="lg" className="text-red-500" />
            <p className="mt-2 text-sm text-gray-600">Uploading image...</p>
          </div>
        </div>
      )}
    </div>
  );
};