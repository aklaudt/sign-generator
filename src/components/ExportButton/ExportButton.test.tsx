import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExportButton } from './ExportButton';

describe('ExportButton', () => {
  it('renders the button with default text', () => {
    const mockOnExport = vi.fn().mockResolvedValue(undefined);
    render(<ExportButton onExport={mockOnExport} />);
    expect(screen.getByText('Export Tee Sign PNG')).toBeInTheDocument();
  });

  it('calls onExport when clicked', async () => {
    const user = userEvent.setup();
    const mockOnExport = vi.fn().mockResolvedValue(undefined);
    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    await user.click(button);

    expect(mockOnExport).toHaveBeenCalledTimes(1);
  });

  it('shows loading state during export', async () => {
    const user = userEvent.setup();
    let resolveExport: () => void;
    const mockOnExport = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveExport = resolve;
        })
    );

    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    await user.click(button);

    expect(screen.getByText('Exporting...')).toBeInTheDocument();
    expect(button).toBeDisabled();

    resolveExport!();
    await waitFor(() => {
      expect(screen.getByText('Export Tee Sign PNG')).toBeInTheDocument();
    });
  });

  it('displays error message when export fails', async () => {
    const user = userEvent.setup();
    const mockOnExport = vi.fn().mockRejectedValue(new Error('Export failed'));
    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Export failed')).toBeInTheDocument();
    });
  });

  it('displays generic error message for unknown errors', async () => {
    const user = userEvent.setup();
    const mockOnExport = vi.fn().mockRejectedValue('Unknown error');
    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to export tee sign')).toBeInTheDocument();
    });
  });

  it('clears error message on subsequent export attempt', async () => {
    const user = userEvent.setup();
    const mockOnExport = vi
      .fn()
      .mockRejectedValueOnce(new Error('Export failed'))
      .mockResolvedValueOnce(undefined);

    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });

    // First attempt - should fail
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText('Export failed')).toBeInTheDocument();
    });

    // Second attempt - should succeed and clear error
    await user.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Export failed')).not.toBeInTheDocument();
    });
  });

  it('respects disabled prop', async () => {
    const user = userEvent.setup();
    const mockOnExport = vi.fn().mockResolvedValue(undefined);
    render(<ExportButton onExport={mockOnExport} disabled />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(mockOnExport).not.toHaveBeenCalled();
  });

  it('disables button during export', async () => {
    const user = userEvent.setup();
    let resolveExport: () => void;
    const mockOnExport = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveExport = resolve;
        })
    );

    render(<ExportButton onExport={mockOnExport} />);

    const button = screen.getByRole('button', { name: /export tee sign png/i });
    await user.click(button);

    expect(button).toBeDisabled();

    resolveExport!();
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
