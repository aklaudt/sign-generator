import { useRef } from 'react';
import { type TeeMarker, type Position } from '../../types';

interface MapCanvasProps {
  imageUrl: string | null;
  placementMode: 'tee' | null;
  teeMarker: TeeMarker | null;
  onPlaceTeeMarker: (position: Position) => void;
}

export function MapCanvas({
  imageUrl,
  placementMode,
  teeMarker,
  onPlaceTeeMarker,
}: MapCanvasProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!placementMode || !imageRef.current || !containerRef.current) return;

    // Get click position relative to the image
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Convert to percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (placementMode === 'tee') {
      onPlaceTeeMarker({ x, y });
    }
  };

  if (!imageUrl) {
    return (
      <div className="relative w-full bg-gray-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <p className="text-gray-400">No image uploaded</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700"
    >
      <div
        className="relative"
        onClick={handleCanvasClick}
        style={{ cursor: placementMode ? 'crosshair' : 'default' }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Course map"
          className="w-full h-auto object-contain"
          draggable={false}
        />

        {/* Marker overlay container */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Tee Marker - Rectangle */}
          {teeMarker && (
            <div
              className="absolute"
              style={{
                left: `${teeMarker.position.x}%`,
                top: `${teeMarker.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                {/* Rectangle representing tee pad */}
                <div
                  className="bg-green-500 border-4 border-white shadow-lg"
                  style={{
                    width: '60px',
                    height: '40px',
                  }}
                />
                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Tee
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Canvas info overlay */}
      {!teeMarker && !placementMode && (
        <div className="absolute top-4 left-4 bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-gray-300">
          Click "Add Marker" buttons to start annotating
        </div>
      )}

      {placementMode === 'tee' && (
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-white">
          Click on the map to place the tee marker
        </div>
      )}
    </div>
  );
}
