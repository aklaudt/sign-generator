import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ImageUploader } from './ImageUploader';

describe('ImageUploader', () => {
  it('renders the component', () => {
    const mockOnImageUpload = vi.fn();
    render(<ImageUploader onImageUpload={mockOnImageUpload} />);
    expect(screen.getByText('Image Uploader Component')).toBeInTheDocument();
  });
});
