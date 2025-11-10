import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapCanvas } from './MapCanvas';

describe('MapCanvas', () => {
  it('renders the component', () => {
    render(<MapCanvas imageUrl={null} />);
    expect(screen.getByText('Map Canvas Component')).toBeInTheDocument();
  });
});
