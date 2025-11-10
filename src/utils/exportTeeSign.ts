import html2canvas from 'html2canvas';

export interface ExportOptions {
  fileName?: string;
  scale?: number;
  backgroundColor?: string;
}

/**
 * Exports a DOM element as a PNG image using html2canvas
 * @param element - The DOM element to export
 * @param options - Export configuration options
 * @returns Promise that resolves when the export is complete
 */
export async function exportTeeSign(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const {
    fileName = 'tee-sign.png',
    scale = 2,
    backgroundColor = '#1f2937',
  } = options;

  try {
    // Generate canvas from the element
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Convert canvas to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });

    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting tee sign:', error);
    throw new Error(
      `Failed to export tee sign: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Generates a filename for the tee sign based on hole number
 * @param holeNumber - The hole number
 * @returns Formatted filename
 */
export function generateFileName(holeNumber: number): string {
  return `hole-${holeNumber}-tee-sign.png`;
}
