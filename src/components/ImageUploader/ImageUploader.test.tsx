import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ImageUploader } from './ImageUploader';

describe('ImageUploader', () => {
  it('renders the upload interface', () => {
    const mockOnImageUpload = vi.fn();
    render(<ImageUploader onImageUpload={mockOnImageUpload} />);
    expect(screen.getByText('Upload Course Image')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop or click to select')).toBeInTheDocument();
  });
});
