import { useState, useRef, useEffect } from 'react';
import { Crop, X } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

// All coordinates in screen pixels (display coordinates)
interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_RATIO = 2 / 3; // width / height = 2/3

export function ImageCropper({ imageUrl, onCropComplete, onCancel }: ImageCropperProps): JSX.Element {
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 200, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalImageSize, setOriginalImageSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize crop box when image loads
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setOriginalImageSize({ width: img.width, height: img.height });

      // Wait for image to render to get display size
      setTimeout(() => {
        if (imageRef.current) {
          const displayWidth = imageRef.current.clientWidth;
          const displayHeight = imageRef.current.clientHeight;

          // Start with 60% of display width
          const initialWidth = displayWidth * 0.6;
          const initialHeight = initialWidth / ASPECT_RATIO;

          setCropBox({
            x: (displayWidth - initialWidth) / 2,
            y: (displayHeight - initialHeight) / 2,
            width: initialWidth,
            height: initialHeight,
          });
        }
      }, 0);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const startDrag = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropBox.x, y: e.clientY - cropBox.y });
  };

  const startResize = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!imageRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const imageWidth = imageRect.width;
      const imageHeight = imageRect.height;

      if (isDragging) {
        // Calculate new position
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        // Constrain to image bounds
        newX = Math.max(0, Math.min(newX, imageWidth - cropBox.width));
        newY = Math.max(0, Math.min(newY, imageHeight - cropBox.height));

        setCropBox(prev => ({ ...prev, x: newX, y: newY }));
      } else if (isResizing) {
        // Get mouse position relative to image
        const mouseX = e.clientX - imageRect.left;
        const mouseY = e.clientY - imageRect.top;

        // Calculate new dimensions from crop box origin
        let newWidth = mouseX - cropBox.x;
        let newHeight = newWidth / ASPECT_RATIO;

        // Enforce minimum size
        newWidth = Math.max(50, newWidth);
        newHeight = newWidth / ASPECT_RATIO;

        // Constrain to image bounds
        if (cropBox.x + newWidth > imageWidth) {
          newWidth = imageWidth - cropBox.x;
          newHeight = newWidth / ASPECT_RATIO;
        }
        if (cropBox.y + newHeight > imageHeight) {
          newHeight = imageHeight - cropBox.y;
          newWidth = newHeight * ASPECT_RATIO;
        }

        setCropBox(prev => ({ ...prev, width: newWidth, height: newHeight }));
      }
    };

    const handleMouseUp = (): void => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, cropBox, dragStart]);

  const handleCrop = async (): Promise<void> => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the scale between display and original image
    const displayRect = imageRef.current.getBoundingClientRect();
    const scaleX = originalImageSize.width / displayRect.width;
    const scaleY = originalImageSize.height / displayRect.height;

    // Convert crop box from display coordinates to image coordinates
    const cropX = cropBox.x * scaleX;
    const cropY = cropBox.y * scaleY;
    const cropWidth = cropBox.width * scaleX;
    const cropHeight = cropBox.height * scaleY;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          onCropComplete(croppedUrl);
        }
      }, 'image/png');
    };

    img.src = imageUrl;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-100">Crop Image</h2>
          <p className="text-sm text-gray-400 mt-1">
            Drag and resize the box to select a 2:3 aspect ratio area
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 flex justify-center">
        <div
          ref={containerRef}
          className="relative inline-block max-w-full"
          style={{ cursor: isResizing ? 'nwse-resize' : isDragging ? 'grabbing' : 'default' }}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Crop preview"
            className="max-w-full h-auto block select-none"
            style={{ maxHeight: '70vh' }}
            draggable={false}
          />

          {cropBox.width > 0 && (
            <>
              {/* Overlay dimming */}
              <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />

              {/* Crop box */}
              <div
                className="absolute border-4 border-white shadow-lg"
                style={{
                  left: `${cropBox.x}px`,
                  top: `${cropBox.y}px`,
                  width: `${cropBox.width}px`,
                  height: `${cropBox.height}px`,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={startDrag}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border border-white border-opacity-30" />
                  ))}
                </div>

                {/* Resize handle */}
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 bg-white cursor-nwse-resize z-10"
                  style={{ transform: 'translate(50%, 50%)' }}
                  onMouseDown={startResize}
                >
                  <div className="absolute inset-1 bg-blue-500 rounded-full" />
                </div>

                {/* Dimension label */}
                <div className="absolute -top-8 left-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                  {Math.round(cropBox.width)} × {Math.round(cropBox.height)} px (display)
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleCrop}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
        >
          <Crop className="w-5 h-5" />
          Crop & Continue
        </button>
      </div>
    </div>
  );
}
