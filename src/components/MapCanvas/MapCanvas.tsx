interface MapCanvasProps {
  imageUrl: string | null;
}

export function MapCanvas({ imageUrl }: MapCanvasProps): JSX.Element {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
      <p className="text-gray-600">Map Canvas Component</p>
      {imageUrl && <p className="text-sm text-gray-500">Image loaded</p>}
    </div>
  );
}
