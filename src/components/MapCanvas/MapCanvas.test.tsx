import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapCanvas } from './MapCanvas';

describe('MapCanvas', () => {
  const mockOnPlaceTeeMarker = vi.fn();

  it('renders with no image', () => {
    render(
      <MapCanvas
        imageUrl={null}
        placementMode={null}
        teeMarker={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
      />
    );
    expect(screen.getByText('No image uploaded')).toBeInTheDocument();
  });

  it('renders with image', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode={null}
        teeMarker={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
      />
    );
    expect(screen.getByAltText('Course map')).toBeInTheDocument();
    expect(screen.getByText('Click "Add Marker" buttons to start annotating')).toBeInTheDocument();
  });

  it('shows placement instruction when in tee placement mode', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode="tee"
        teeMarker={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
      />
    );
    expect(screen.getByText('Click on the map to place the tee marker')).toBeInTheDocument();
  });

  it('renders tee marker when placed', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode={null}
        teeMarker={{ id: 'tee-1', position: { x: 50, y: 50 } }}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
      />
    );
    expect(screen.getByText('Tee')).toBeInTheDocument();
  });
});
