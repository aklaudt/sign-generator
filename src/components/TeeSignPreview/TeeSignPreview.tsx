interface TeeSignPreviewProps {
  holeNumber: number;
}

export function TeeSignPreview({ holeNumber }: TeeSignPreviewProps): JSX.Element {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Tee Sign Preview</h3>
      <p className="text-gray-600">Preview for Hole {holeNumber}</p>
    </div>
  );
}
