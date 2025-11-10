import { useState } from 'react';

interface UseImageUploadReturn {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  handleImageUpload: (file: File) => Promise<void>;
}

export function useImageUpload(): UseImageUploadReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Placeholder for image upload logic
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageUrl,
    isLoading,
    error,
    handleImageUpload,
  };
}
