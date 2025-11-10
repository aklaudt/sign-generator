import { useState, useRef } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { MapCanvas } from './components/MapCanvas';
import { CourseInfoForm } from './components/CourseInfoForm';
import { TeeSignPreview } from './components/TeeSignPreview';
import { ExportButton } from './components/ExportButton';
import { useTeeSignStore } from './store/teeSignStore';
import { exportTeeSign, generateFileName } from './utils/exportTeeSign';
import { type BasketColor } from './types';

type PlacementMode = 'tee' | 'basket' | null;

function App(): JSX.Element {
  const { uploadedImage, setUploadedImage, holeNumber, setHoleNumber, teeMarker, setTeeMarker, basketMarkers, addBasketMarker, clearMarkers } = useTeeSignStore();
  const [placementMode, setPlacementMode] = useState<PlacementMode>(null);
  const [selectedBasketColor, setSelectedBasketColor] = useState<BasketColor | null>(null);
  const teeSignRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (imageUrl: string): void => {
    setUploadedImage(imageUrl);
  };

  const handleHoleNumberChange = (newHoleNumber: number): void => {
    setHoleNumber(newHoleNumber);
  };

  const handleAddTeeMarker = (): void => {
    setPlacementMode('tee');
  };

  const handleAddBasketMarker = (color: BasketColor): void => {
    setSelectedBasketColor(color);
    setPlacementMode('basket');
  };

  const handleExport = async (): Promise<void> => {
    if (!teeSignRef.current) {
      throw new Error('Tee sign preview not found');
    }

    await exportTeeSign(teeSignRef.current, {
      fileName: generateFileName(holeNumber),
      scale: 2,
      backgroundColor: '#1f2937',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            Disc Golf Tee Sign Generator
          </h1>
          <p className="text-gray-400">
            Create professional tee signs for your disc golf course
          </p>
        </header>

        <main className={!uploadedImage ? "max-w-4xl mx-auto" : ""}>
          {!uploadedImage ? (
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                  Upload Course Image
                </h2>
                <p className="text-gray-400">
                  Start by uploading a GPS or satellite image of your disc golf hole
                </p>
              </div>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Canvas Area */}
              <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-100">
                    Hole {holeNumber}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={clearMarkers}
                      disabled={!teeMarker && basketMarkers.length === 0}
                      className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear Markers
                    </button>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-gray-100 rounded transition-colors"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
                <MapCanvas
                  imageUrl={uploadedImage}
                  placementMode={placementMode}
                  teeMarker={teeMarker}
                  basketMarkers={basketMarkers}
                  selectedBasketColor={selectedBasketColor}
                  onPlaceTeeMarker={(position) => {
                    setTeeMarker({
                      id: 'tee-1',
                      position,
                      rotation: 0,
                      width: 60,
                      height: 40,
                    });
                    setPlacementMode(null);
                  }}
                  onUpdateTeeMarker={(updates) => {
                    if (teeMarker) {
                      setTeeMarker({ ...teeMarker, ...updates });
                    }
                  }}
                  onPlaceBasketMarker={(position) => {
                    if (selectedBasketColor) {
                      addBasketMarker({
                        id: `basket-${Date.now()}`,
                        color: selectedBasketColor,
                        position,
                        par: 3,
                        distance: 200,
                      });
                      setPlacementMode(null);
                      setSelectedBasketColor(null);
                    }
                  }}
                />
              </div>

              {/* Controls Below Image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Course Info Section */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <CourseInfoForm
                    holeNumber={holeNumber}
                    onHoleNumberChange={handleHoleNumberChange}
                  />
                </div>

                {/* Markers Section */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-4">
                    Markers
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Tee Pad
                      </h4>
                      <button
                        onClick={handleAddTeeMarker}
                        disabled={teeMarker !== null}
                        className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {teeMarker ? 'Tee Marker Added' : placementMode === 'tee' ? 'Click on Map...' : 'Add Tee Marker'}
                      </button>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Baskets ({basketMarkers.length}/3)
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAddBasketMarker('red')}
                          disabled={basketMarkers.length >= 3 || placementMode === 'basket'}
                          className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {placementMode === 'basket' && selectedBasketColor === 'red' ? 'Click on Map...' : 'Add Red Basket'}
                        </button>
                        <button
                          onClick={() => handleAddBasketMarker('blue')}
                          disabled={basketMarkers.length >= 3 || placementMode === 'basket'}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {placementMode === 'basket' && selectedBasketColor === 'blue' ? 'Click on Map...' : 'Add Blue Basket'}
                        </button>
                        <button
                          onClick={() => handleAddBasketMarker('white')}
                          disabled={basketMarkers.length >= 3 || placementMode === 'basket'}
                          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {placementMode === 'basket' && selectedBasketColor === 'white' ? 'Click on Map...' : 'Add White Basket'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    Instructions
                  </h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Click buttons to add markers</li>
                    <li>• Drag markers to position them</li>
                    <li>• Fill in basket details</li>
                  </ul>
                </div>
              </div>

              {/* Preview and Export Section */}
              {(teeMarker || basketMarkers.length > 0) && (
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-100">
                      Tee Sign Preview
                    </h2>
                    <ExportButton
                      onExport={handleExport}
                      disabled={!uploadedImage || (!teeMarker && basketMarkers.length === 0)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <TeeSignPreview
                      ref={teeSignRef}
                      holeNumber={holeNumber}
                      imageUrl={uploadedImage}
                      teeMarker={teeMarker}
                      basketMarkers={basketMarkers}
                    />
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-400">
                    This preview shows how your tee sign will look when exported
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
