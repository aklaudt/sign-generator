import html2canvas from 'html2canvas';

export async function exportTeeSign(
  elementId: string,
  filename: string = 'tee-sign.png'
): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    throw new Error(
      `Failed to export tee sign: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
