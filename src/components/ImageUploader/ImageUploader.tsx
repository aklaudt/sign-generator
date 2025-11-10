import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { isLoading, error, handleImageUpload } = useImageUpload();

  const processFile = async (file: File): Promise<void> => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    await handleImageUpload(file);
    const url = URL.createObjectURL(file);
    onImageUpload(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative p-12 border-2 border-dashed rounded-lg
          cursor-pointer transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}
          ${isLoading ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <Upload
            className={`w-16 h-16 mb-4 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            {isDragging ? 'Drop image here' : 'Upload Course Image'}
          </h3>
          <p className="text-gray-400 mb-2">
            Drag and drop or click to select
          </p>
          <p className="text-sm text-gray-500">
            Supports PNG, JPG, or other image formats
          </p>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
            <div className="text-gray-100">Loading...</div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
