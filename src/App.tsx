import { ImageUploader } from './components/ImageUploader';
import { useTeeSignStore } from './store/teeSignStore';

function App(): JSX.Element {
  const { uploadedImage, setUploadedImage } = useTeeSignStore();

  const handleImageUpload = (imageUrl: string): void => {
    setUploadedImage(imageUrl);
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

        <main className="max-w-4xl mx-auto">
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
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="mb-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded course"
                  className="w-full rounded-lg"
                />
              </div>
              <button
                onClick={() => setUploadedImage(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg transition-colors"
              >
                Change Image
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
