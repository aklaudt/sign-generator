import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportTeeSign, generateFileName } from './exportTeeSign';
import html2canvas from 'html2canvas';

vi.mock('html2canvas');

describe('exportTeeSign', () => {
  let mockElement: HTMLElement;
  let mockCanvas: HTMLCanvasElement;
  let mockBlob: Blob;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let createObjectURLSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let revokeObjectURLSpy: any;

  beforeEach(() => {
    mockElement = document.createElement('div');
    mockCanvas = document.createElement('canvas');
    mockBlob = new Blob(['test'], { type: 'image/png' });

    // Mock canvas.toBlob
    mockCanvas.toBlob = vi.fn((callback) => {
      callback(mockBlob);
    });

    // Mock html2canvas
    vi.mocked(html2canvas).mockResolvedValue(mockCanvas);

    // Mock URL methods (create them if they don't exist)
    if (!global.URL.createObjectURL) {
      global.URL.createObjectURL = vi.fn();
    }
    if (!global.URL.revokeObjectURL) {
      global.URL.revokeObjectURL = vi.fn();
    }
    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    // Mock document methods
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockElement);
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockElement);
  });

  it('exports element as PNG with default options', async () => {
    await exportTeeSign(mockElement);

    expect(html2canvas).toHaveBeenCalledWith(
      mockElement,
      expect.objectContaining({
        scale: 2,
        backgroundColor: '#1f2937',
        useCORS: true,
        logging: false,
      })
    );
    expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });

  it('exports with custom options', async () => {
    await exportTeeSign(mockElement, {
      fileName: 'custom-name.png',
      scale: 3,
      backgroundColor: '#ffffff',
    });

    expect(html2canvas).toHaveBeenCalledWith(
      mockElement,
      expect.objectContaining({
        scale: 3,
        backgroundColor: '#ffffff',
      })
    );
  });

  it('throws error when canvas.toBlob fails', async () => {
    mockCanvas.toBlob = vi.fn((callback) => {
      callback(null);
    });

    await expect(exportTeeSign(mockElement)).rejects.toThrow(
      'Failed to export tee sign: Failed to create image blob'
    );
  });

  it('throws error when html2canvas fails', async () => {
    vi.mocked(html2canvas).mockRejectedValue(new Error('Canvas error'));

    await expect(exportTeeSign(mockElement)).rejects.toThrow(
      'Failed to export tee sign: Canvas error'
    );
  });
});

describe('generateFileName', () => {
  it('generates correct filename for single digit hole', () => {
    expect(generateFileName(1)).toBe('hole-1-tee-sign.png');
  });

  it('generates correct filename for double digit hole', () => {
    expect(generateFileName(18)).toBe('hole-18-tee-sign.png');
  });
});
