import React from 'react';
import { Upload, X, Image } from 'lucide-react';
import { HeroContent } from '../../../types';
import { uploadImage } from '../../../utils/imageUpload';
import { LoadingSpinner } from '../../LoadingSpinner';
import { toast } from '../../../utils/toast';

interface HeroEditorProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({ content, onChange }) => {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadImage(file, 10); // Allow larger files for background
      
      if (result.success) {
        onChange({ ...content, backgroundImage: result.url });
        toast.success('Background image uploaded successfully');
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          value={content.heading}
          onChange={(e) => onChange({ ...content, heading: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Subheading</label>
        <textarea
          value={content.subheading}
          onChange={(e) => onChange({ ...content, subheading: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CTA Text</label>
        <input
          type="text"
          value={content.ctaText}
          onChange={(e) => onChange({ ...content, ctaText: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-500 transition-colors">
          <div className="space-y-1 text-center">
            {content.backgroundImage ? (
              <div className="relative">
                <img
                  src={content.backgroundImage}
                  alt="Hero background"
                  className="max-w-md mx-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={() => onChange({ ...content, backgroundImage: undefined })}
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
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WebP up to 10MB</p>
              </>
            )}
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4">
            <LoadingSpinner size="lg" className="text-red-500" />
            <p className="mt-2 text-sm text-gray-600">Uploading image...</p>
          </div>
        </div>
      )}
    </div>
  );
};