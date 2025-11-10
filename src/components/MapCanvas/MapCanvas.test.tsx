import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapCanvas } from './MapCanvas';

describe('MapCanvas', () => {
  const mockOnPlaceTeeMarker = vi.fn();
  const mockOnUpdateTeeMarker = vi.fn();
  const mockOnPlaceBasketMarker = vi.fn();

  it('renders with no image', () => {
    render(
      <MapCanvas
        imageUrl={null}
        placementMode={null}
        teeMarker={null}
        basketMarkers={[]}
        selectedBasketColor={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
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
        basketMarkers={[]}
        selectedBasketColor={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
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
        basketMarkers={[]}
        selectedBasketColor={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
      />
    );
    expect(screen.getByText('Click on the map to place the tee marker')).toBeInTheDocument();
  });

  it('renders tee marker when placed', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode={null}
        teeMarker={{ id: 'tee-1', position: { x: 50, y: 50 }, rotation: 0, width: 60, height: 40 }}
        basketMarkers={[]}
        selectedBasketColor={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
      />
    );
    expect(screen.getByText('Tee')).toBeInTheDocument();
  });

  it('renders basket markers', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode={null}
        teeMarker={null}
        basketMarkers={[
          { id: 'basket-1', color: 'red', position: { x: 30, y: 30 }, par: 3, distance: 200, label: 'R' },
          { id: 'basket-2', color: 'blue', position: { x: 70, y: 70 }, par: 4, distance: 350, label: 'B' }
        ]}
        selectedBasketColor={null}
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
      />
    );
    expect(screen.getByText('Red Basket')).toBeInTheDocument();
    expect(screen.getByText('Blue Basket')).toBeInTheDocument();
  });

  it('shows placement instruction when in basket placement mode', () => {
    render(
      <MapCanvas
        imageUrl="test-image.jpg"
        placementMode="basket"
        teeMarker={null}
        basketMarkers={[]}
        selectedBasketColor="red"
        onPlaceTeeMarker={mockOnPlaceTeeMarker}
        onUpdateTeeMarker={mockOnUpdateTeeMarker}
        onPlaceBasketMarker={mockOnPlaceBasketMarker}
      />
    );
    expect(screen.getByText('Click on the map to place the red basket')).toBeInTheDocument();
  });
});
