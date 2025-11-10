import { forwardRef } from 'react';
import { type TeeMarker, type BasketMarker, type BasketColor } from '../../types';

interface TeeSignPreviewProps {
  holeNumber: number;
  imageUrl: string | null;
  teeMarker: TeeMarker | null;
  basketMarkers: BasketMarker[];
}

const getBasketLabel = (color: BasketColor): string => {
  switch (color) {
    case 'red':
      return 'Red (Short/A)';
    case 'white':
      return 'White (Medium/B)';
    case 'blue':
      return 'Blue (Long/C)';
  }
};

const getBasketColorClass = (color: BasketColor): string => {
  switch (color) {
    case 'red':
      return 'bg-red-600 border-red-700';
    case 'blue':
      return 'bg-blue-600 border-blue-700';
    case 'white':
      return 'bg-white border-gray-300';
  }
};

const getBasketTextColorClass = (color: BasketColor): string => {
  return color === 'white' ? 'text-gray-900' : 'text-white';
};

export const TeeSignPreview = forwardRef<HTMLDivElement, TeeSignPreviewProps>(
  ({ holeNumber, imageUrl, teeMarker, basketMarkers }, ref) => {
    if (!imageUrl) {
      return (
        <div className="p-8 bg-gray-800 rounded-lg text-center">
          <p className="text-gray-400">Upload an image and add markers to see the preview</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="bg-gray-800 rounded-lg overflow-hidden"
        style={{ width: '800px', maxWidth: '100%' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Hole {holeNumber}</h1>
          {basketMarkers.length > 0 && (
            <div className="flex justify-center gap-4 mt-4">
              {basketMarkers.map((basket) => (
                <div key={basket.id} className="text-white">
                  <div className="text-xs uppercase tracking-wide opacity-90">
                    {getBasketLabel(basket.color)}
                  </div>
                  <div className="text-2xl font-bold">Par {basket.par}</div>
                  <div className="text-sm opacity-90">{basket.distance} ft</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="relative bg-gray-900 p-4">
          <div className="relative">
            <img
              src={imageUrl}
              alt={`Hole ${holeNumber} map`}
              className="w-full h-auto object-contain"
            />

            {/* Markers Overlay */}
            <div className="absolute inset-0">
              {/* Tee Marker */}
              {teeMarker && (
                <div
                  className="absolute"
                  style={{
                    left: `${teeMarker.position.x}%`,
                    top: `${teeMarker.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="bg-gray-500 border-4 border-white shadow-lg rounded-lg"
                    style={{
                      width: `${teeMarker.width}px`,
                      height: `${teeMarker.height}px`,
                      transform: `rotate(${teeMarker.rotation}deg)`,
                    }}
                  />
                </div>
              )}

              {/* Basket Markers */}
              {basketMarkers.map((basket) => (
                <div
                  key={basket.id}
                  className="absolute"
                  style={{
                    left: `${basket.position.x}%`,
                    top: `${basket.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-4 shadow-lg flex items-center justify-center font-bold text-sm ${
                      getBasketColorClass(basket.color)
                    } ${getBasketTextColorClass(basket.color)}`}
                  >
                    {basket.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-700 p-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            {/* Tee Legend */}
            {teeMarker && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-gray-500 border-2 border-white rounded" />
                <span className="text-gray-100">Tee Pad</span>
              </div>
            )}

            {/* Basket Legends */}
            {basketMarkers.map((basket) => (
              <div key={basket.id} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    getBasketColorClass(basket.color)
                  } ${getBasketTextColorClass(basket.color)}`}
                >
                  {basket.label}
                </div>
                <span className="text-gray-100">{getBasketLabel(basket.color)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
