import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeeSignPreview } from './TeeSignPreview';

describe('TeeSignPreview', () => {
  it('renders the component', () => {
    render(<TeeSignPreview holeNumber={1} />);
    expect(screen.getByText('Tee Sign Preview')).toBeInTheDocument();
  });
});
