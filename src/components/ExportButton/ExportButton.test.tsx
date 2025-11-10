import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExportButton } from './ExportButton';

describe('ExportButton', () => {
  it('renders the button', () => {
    const mockOnExport = vi.fn();
    render(<ExportButton onExport={mockOnExport} />);
    expect(screen.getByText('Export Tee Sign')).toBeInTheDocument();
  });
});
