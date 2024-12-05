import { compressImage } from './imageCompression';

export interface UploadResult {
  url: string;
  success: boolean;
  error?: string;
}

export const uploadImage = async (file: File, maxSize = 5): Promise<UploadResult> => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        url: '',
        success: false,
        error: 'Invalid file type. Please upload a JPG, PNG, SVG, or WebP image.'
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
    
    // For development, store in localStorage
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(compressedFile);
    });
    
    // Store with timestamp to prevent caching issues
    const timestamp = Date.now();
    const key = `image_${timestamp}`;
    localStorage.setItem(key, base64);
    
    return {
      url: base64,
      success: true
    };
  } catch (error) {
    return {
      url: '',
      success: false,
      error: 'Failed to process image'
    };
  }
};