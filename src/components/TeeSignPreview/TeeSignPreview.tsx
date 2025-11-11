import { forwardRef } from 'react';
import { type TeeMarker, type BasketMarker, type BasketColor } from '../../types';
import { BasketMarkerCircle } from '../BasketMarkerCircle';

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
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">{holeNumber}</span>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Hole</div>
                <div className="text-lg font-semibold text-white">{holeNumber}</div>
              </div>
            </div>
            {basketMarkers.length > 0 && (
              <div className="flex items-center gap-6">
                {basketMarkers.map((basket, index) => (
                  <div key={basket.id} className="flex items-center gap-2">
                    {index > 0 && <div className="w-px h-10 bg-gray-600" />}
                    <div className="flex items-center gap-2">
                      <BasketMarkerCircle
                        color={basket.color}
                        label={basket.label}
                        variant="header"
                      />
                      <div className="text-left">
                        <div className="text-xs text-gray-400 leading-tight">{getBasketLabel(basket.color)}</div>
                        <div className="text-white font-semibold text-sm leading-tight">
                          Par {basket.par} · {basket.distance}ft
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
                  <BasketMarkerCircle
                    color={basket.color}
                    label={basket.label}
                  />
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
                <BasketMarkerCircle
                  color={basket.color}
                  label={basket.label}
                />
                <span className="text-gray-100">{getBasketLabel(basket.color)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
