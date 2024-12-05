import React from 'react';
import { Upload, X, Image } from 'lucide-react';
import { uploadImage } from '../../../utils/imageUpload';
import { LoadingSpinner } from '../../LoadingSpinner';
import { toast } from '../../../utils/toast';

interface GeneralSettingsProps {
  storeName: string;
  logo?: string | null;
  currency: string;
  orderPrefix: string;
  onUpdate: (key: string, value: string) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  storeName,
  logo,
  currency,
  orderPrefix,
  onUpdate
}) => {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleLogoUpload = async (file: File) => {
    setIsUploading(true);
    try {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Logo must be less than 2MB');
      }
      
      const result = await uploadImage(file, 2); // 2MB limit for logos
      
      if (result.success) {
        onUpdate('logo', result.url);
        localStorage.setItem('store_logo', result.url);
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Store Logo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-500 transition-colors">
            <div className="space-y-1 text-center">
              {logo ? (
                <div className="relative">
                  <img
                    src={logo}
                    alt="Store logo"
                    className="max-w-xs mx-auto rounded-lg"
                  />
                  <button 
                    onClick={() => {
                      onUpdate('logo', '');
                      localStorage.removeItem('store_logo');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg"
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
                        accept="image/jpeg,image/png,image/svg+xml"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Store Name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={e => onUpdate('storeName', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            value={currency}
            onChange={e => onUpdate('currency', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Order Prefix
        </label>
        <input
          type="text"
          value={orderPrefix}
          maxLength={5}
          onChange={e => onUpdate('orderPrefix', e.target.value.toUpperCase())}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          Used for generating order numbers (e.g., THR-001)
        </p>
      </div>
      
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4">
            <LoadingSpinner size="lg" className="text-red-500" />
            <p className="mt-2 text-sm text-gray-600">Uploading logo...</p>
          </div>
        </div>
      )}
    </div>
  );
};