import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DraggableMarker } from './DraggableMarker';

describe('DraggableMarker', () => {
  it('renders the component', () => {
    const mockOnDrag = vi.fn();
    const { container } = render(
      <DraggableMarker
        id="test"
        position={{ x: 0, y: 0 }}
        color="red"
        onDrag={mockOnDrag}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
