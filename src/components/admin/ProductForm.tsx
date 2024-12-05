import React from 'react';
import { Plus, X, Upload, AlertCircle } from 'lucide-react';
import { NewProduct } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';

interface ProductFormProps {
  onSubmit: (product: NewProduct) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<NewProduct>;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {}
}) => {
  const [formData, setFormData] = React.useState<NewProduct>({
    name: initialData.name || '',
    price: initialData.price || 0,
    description: initialData.description || '',
    image: null,
    sizes: initialData.sizes || ['S', 'M', 'L', 'XL']
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(
    initialData && 'image' in initialData ? initialData.image : null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Debounce validation
  const validateForm = React.useCallback(() => {
    if (!formData.name.trim()) {
      return 'Product name is required';
    }
    if (formData.price <= 0) {
      return 'Price must be greater than 0';
    }
    if (!formData.description.trim()) {
      return 'Description is required';
    }
    if (!formData.image && !imagePreview) {
      return 'Product image is required';
    }
    return null;
  }, [formData, imagePreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
          <div className="text-sm text-red-700 flex-1">{error}</div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={formData.price}
          onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${
          imagePreview ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
        }`}>
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  required={!imagePreview}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {imagePreview && (
          <div className="mt-4 relative w-32">
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-white hover:text-red-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-md"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" className="text-white" />
          ) : (
            <>
              <Plus className="h-5 w-5 mr-2" />
              Save Product
            </>
          )}
        </button>
      </div>
    </form>
  );
};