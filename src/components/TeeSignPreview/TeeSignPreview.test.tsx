import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeeSignPreview } from './TeeSignPreview';
import { type TeeMarker, type BasketMarker } from '../../types';

describe('TeeSignPreview', () => {
  const mockTeeMarker: TeeMarker = {
    id: 'tee-1',
    position: { x: 50, y: 50 },
    rotation: 0,
    width: 60,
    height: 40,
  };

  const mockBasketMarkers: BasketMarker[] = [
    {
      id: 'basket-1',
      color: 'red',
      position: { x: 30, y: 70 },
      par: 3,
      distance: 250,
      label: 'R',
    },
    {
      id: 'basket-2',
      color: 'blue',
      position: { x: 70, y: 80 },
      par: 4,
      distance: 350,
      label: 'B',
    },
  ];

  it('shows placeholder message when no image is uploaded', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl={null}
        teeMarker={null}
        basketMarkers={[]}
      />
    );
    expect(
      screen.getByText('Upload an image and add markers to see the preview')
    ).toBeInTheDocument();
  });

  it('renders hole number in header', () => {
    render(
      <TeeSignPreview
        holeNumber={5}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={mockBasketMarkers}
      />
    );
    expect(screen.getByText('Hole 5')).toBeInTheDocument();
  });

  it('renders basket information in header', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={mockBasketMarkers}
      />
    );
    expect(screen.getByText('Par 3')).toBeInTheDocument();
    expect(screen.getByText('Par 4')).toBeInTheDocument();
    expect(screen.getByText('250 ft')).toBeInTheDocument();
    expect(screen.getByText('350 ft')).toBeInTheDocument();
  });

  it('renders map image', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={mockBasketMarkers}
      />
    );
    const img = screen.getByAltText('Hole 1 map');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders legend with tee pad when tee marker is present', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={[]}
      />
    );
    expect(screen.getByText('Tee Pad')).toBeInTheDocument();
  });

  it('renders legend with basket labels', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={null}
        basketMarkers={mockBasketMarkers}
      />
    );
    const redLabels = screen.getAllByText('Red (Short/A)');
    const blueLabels = screen.getAllByText('Blue (Long/C)');
    expect(redLabels.length).toBeGreaterThan(0);
    expect(blueLabels.length).toBeGreaterThan(0);
  });

  it('renders with only tee marker', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={[]}
      />
    );
    expect(screen.getByAltText('Hole 1 map')).toBeInTheDocument();
    expect(screen.getByText('Tee Pad')).toBeInTheDocument();
  });

  it('renders with only basket markers', () => {
    render(
      <TeeSignPreview
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={null}
        basketMarkers={mockBasketMarkers}
      />
    );
    expect(screen.getByAltText('Hole 1 map')).toBeInTheDocument();
    const redLabels = screen.getAllByText('Red (Short/A)');
    expect(redLabels.length).toBeGreaterThan(0);
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <TeeSignPreview
        ref={ref}
        holeNumber={1}
        imageUrl="test-image.jpg"
        teeMarker={mockTeeMarker}
        basketMarkers={mockBasketMarkers}
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
