interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps): JSX.Element {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <p className="text-gray-600">Image Uploader Component</p>
    </div>
  );
}
