interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
}

export function ExportButton({
  onExport,
  disabled = false,
}: ExportButtonProps): JSX.Element {
  return (
    <button
      onClick={onExport}
      disabled={disabled}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      Export Tee Sign
    </button>
  );
}
