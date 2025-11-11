import { useRef, useState } from 'react';
import { type TeeMarker, type BasketMarker, type Position, type BasketColor } from '../../types';
import { BasketMarkerCircle } from '../BasketMarkerCircle';

interface MapCanvasProps {
  imageUrl: string | null;
  placementMode: 'tee' | 'basket' | null;
  teeMarker: TeeMarker | null;
  basketMarkers: BasketMarker[];
  selectedBasketColor: BasketColor | null;
  onPlaceTeeMarker: (position: Position) => void;
  onUpdateTeeMarker: (updates: Partial<TeeMarker>) => void;
  onPlaceBasketMarker: (position: Position) => void;
}

export function MapCanvas({
  imageUrl,
  placementMode,
  teeMarker,
  basketMarkers,
  selectedBasketColor,
  onPlaceTeeMarker,
  onUpdateTeeMarker,
  onPlaceBasketMarker,
}: MapCanvasProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<'tee' | string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!placementMode || !imageRef.current || !containerRef.current) return;

    // Get click position relative to the image
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Convert to percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (placementMode === 'tee') {
      onPlaceTeeMarker({ x, y });
    } else if (placementMode === 'basket') {
      onPlaceBasketMarker({ x, y });
    }
  };

  const handleMarkerClick = (e: React.MouseEvent, markerType: 'tee' | string): void => {
    e.stopPropagation();
    if (!placementMode) {
      setSelectedMarker(markerType);
    }
  };

  const handleBackgroundClick = (): void => {
    if (!placementMode) {
      setSelectedMarker(null);
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
        onClick={(e) => {
          handleCanvasClick(e);
          handleBackgroundClick();
        }}
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
        <div className="absolute inset-0">
          {/* Tee Marker - Rectangle */}
          {teeMarker && (
            <div
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${teeMarker.position.x}%`,
                top: `${teeMarker.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => handleMarkerClick(e, 'tee')}
            >
              <div className="relative">
                {/* Rectangle representing tee pad */}
                <div
                  className={`bg-gray-500 border-4 shadow-lg transition-all rounded-lg ${
                    selectedMarker === 'tee' ? 'border-blue-500 ring-2 ring-blue-400' : 'border-white'
                  }`}
                  style={{
                    width: `${teeMarker.width}px`,
                    height: `${teeMarker.height}px`,
                    transform: `rotate(${teeMarker.rotation}deg)`,
                  }}
                />
                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                  Tee
                </div>
              </div>
            </div>
          )}

          {/* Basket Markers - Circles */}
          {basketMarkers.map((basket) => (
            <div
              key={basket.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${basket.position.x}%`,
                top: `${basket.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => handleMarkerClick(e, basket.id)}
            >
              <div className="relative">
                {/* Circle representing basket */}
                <BasketMarkerCircle
                  color={basket.color}
                  label={basket.label}
                  variant={selectedMarker === basket.id ? 'selected' : 'default'}
                />
                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                  {basket.color.charAt(0).toUpperCase() + basket.color.slice(1)} Basket
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marker Controls */}
      {selectedMarker === 'tee' && teeMarker && (
        <div className="absolute bottom-4 left-4 right-4 bg-gray-800/95 backdrop-blur-sm p-4 rounded-lg shadow-xl">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-100">Tee Marker Controls</div>
            <div className="flex gap-3 flex-1">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-300">Rotation:</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={teeMarker.rotation}
                  onChange={(e) => onUpdateTeeMarker({ rotation: parseInt(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-400">°</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-300">Width:</label>
                <input
                  type="number"
                  min="20"
                  max="200"
                  value={teeMarker.width}
                  onChange={(e) => onUpdateTeeMarker({ width: parseInt(e.target.value) || 20 })}
                  className="w-16 px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-400">px</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-300">Height:</label>
                <input
                  type="number"
                  min="20"
                  max="200"
                  value={teeMarker.height}
                  onChange={(e) => onUpdateTeeMarker({ height: parseInt(e.target.value) || 20 })}
                  className="w-16 px-2 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-400">px</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-100 rounded transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Canvas info overlay */}
      {!teeMarker && basketMarkers.length === 0 && !placementMode && (
        <div className="absolute top-4 left-4 bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-gray-300">
          Click "Add Marker" buttons to start annotating
        </div>
      )}

      {placementMode === 'tee' && (
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-white">
          Click on the map to place the tee marker
        </div>
      )}

      {placementMode === 'basket' && selectedBasketColor && (
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-white">
          Click on the map to place the {selectedBasketColor} basket
        </div>
      )}
    </div>
  );
}
