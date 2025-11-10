import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app with upload interface', () => {
    render(<App />);
    expect(
      screen.getByText('Disc Golf Tee Sign Generator')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Start by uploading a GPS or satellite image of your disc golf hole')
    ).toBeInTheDocument();
    expect(screen.getByText('Drag and drop or click to select')).toBeInTheDocument();
  });
});
