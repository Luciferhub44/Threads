import { compressImage } from './imageCompression';

export interface UploadResult {
  url: string;
  success: boolean;
  error?: string;
}

export const uploadImage = async (file: File, maxSize = 5): Promise<UploadResult> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        url: '',
        success: false,
        error: 'Invalid file type. Please upload an image.'
      };
    }

    // Validate file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      return {
        url: '',
        success: false,
        error: `File size must be less than ${maxSize}MB`
      };
    }

    // Compress image if needed
    const compressedFile = await compressImage(file);
    
    // Convert to base64 for storage
    // In production, you would upload to a CDN/storage service
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          success: true
        });
      };
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    return {
      url: '',
      success: false,
      error: 'Failed to process image'
    };
  }
};