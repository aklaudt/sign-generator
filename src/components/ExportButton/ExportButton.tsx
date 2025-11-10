import { useState } from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => Promise<void>;
  disabled?: boolean;
}

export function ExportButton({
  onExport,
  disabled = false,
}: ExportButtonProps): JSX.Element {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (): Promise<void> => {
    setIsExporting(true);
    setError(null);

    try {
      await onExport();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export tee sign');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        onClick={handleExport}
        disabled={disabled || isExporting}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        <Download className="w-5 h-5" />
        <span className="font-semibold">
          {isExporting ? 'Exporting...' : 'Export Tee Sign PNG'}
        </span>
      </button>
      {error && (
        <div className="text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded border border-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
