import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseInfoForm } from './CourseInfoForm';
import { type BasketMarker } from '../../types';

describe('CourseInfoForm', () => {
  const mockOnHoleNumberChange = vi.fn();
  const mockOnUpdateBasketMarker = vi.fn();

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

  it('renders the component with hole number input', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={[]}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );
    expect(screen.getByText('Hole Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Hole Number')).toBeInTheDocument();
  });

  it('shows placeholder message when no baskets are added', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={[]}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );
    expect(
      screen.getByText('Add basket markers on the map to set par and distance')
    ).toBeInTheDocument();
  });

  it('displays basket details section when baskets are added', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );
    expect(screen.getByText('Basket Details')).toBeInTheDocument();
    expect(screen.getByText('Red (Short/A)')).toBeInTheDocument();
    expect(screen.getByText('Blue (Long/C)')).toBeInTheDocument();
  });

  it('displays par and distance inputs for each basket', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    // Check that par selects are present with correct values
    const parSelects = screen.getAllByLabelText('Par');
    expect(parSelects).toHaveLength(2);
    expect(parSelects[0]).toHaveValue('3');
    expect(parSelects[1]).toHaveValue('4');

    // Check that distance inputs are present with correct values
    const distanceInputs = screen.getAllByLabelText('Distance (ft)');
    expect(distanceInputs).toHaveLength(2);
    expect(distanceInputs[0]).toHaveValue(250);
    expect(distanceInputs[1]).toHaveValue(350);
  });

  it('calls onUpdateBasketMarker when par is changed', async () => {
    const user = userEvent.setup();
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const parSelect = screen.getAllByLabelText('Par')[0];
    await user.selectOptions(parSelect, '4');

    expect(mockOnUpdateBasketMarker).toHaveBeenCalledWith('basket-1', { par: 4 });
  });

  it('calls onUpdateBasketMarker when distance is changed', async () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const distanceInput = screen.getAllByLabelText('Distance (ft)')[0];
    fireEvent.change(distanceInput, { target: { value: '300' } });

    expect(mockOnUpdateBasketMarker).toHaveBeenCalledWith('basket-1', {
      distance: 300,
    });
  });

  it('does not call onUpdateBasketMarker for invalid distance values', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const distanceInput = screen.getAllByLabelText('Distance (ft)')[0];

    mockOnUpdateBasketMarker.mockClear();
    fireEvent.change(distanceInput, { target: { value: '0' } });
    expect(mockOnUpdateBasketMarker).not.toHaveBeenCalled();

    mockOnUpdateBasketMarker.mockClear();
    fireEvent.change(distanceInput, { target: { value: '-10' } });
    expect(mockOnUpdateBasketMarker).not.toHaveBeenCalled();

    mockOnUpdateBasketMarker.mockClear();
    fireEvent.change(distanceInput, { target: { value: '10000' } });
    expect(mockOnUpdateBasketMarker).not.toHaveBeenCalled();
  });

  it('calls onHoleNumberChange when hole number is changed', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={[]}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const holeInput = screen.getByLabelText('Hole Number');
    fireEvent.change(holeInput, { target: { value: '5' } });

    expect(mockOnHoleNumberChange).toHaveBeenCalledWith(5);
  });

  it('displays label input for each basket', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const labelInputs = screen.getAllByLabelText('Label');
    expect(labelInputs).toHaveLength(2);
    expect(labelInputs[0]).toHaveValue('R');
    expect(labelInputs[1]).toHaveValue('B');
  });

  it('calls onUpdateBasketMarker when label is changed', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const labelInput = screen.getAllByLabelText('Label')[0];
    fireEvent.change(labelInput, { target: { value: 'A' } });

    expect(mockOnUpdateBasketMarker).toHaveBeenCalledWith('basket-1', {
      label: 'A',
    });
  });

  it('limits label to single character and converts to uppercase', () => {
    render(
      <CourseInfoForm
        holeNumber={1}
        onHoleNumberChange={mockOnHoleNumberChange}
        basketMarkers={mockBasketMarkers}
        onUpdateBasketMarker={mockOnUpdateBasketMarker}
      />
    );

    const labelInput = screen.getAllByLabelText('Label')[0];

    // Test multiple characters - should only take first one
    mockOnUpdateBasketMarker.mockClear();
    fireEvent.change(labelInput, { target: { value: 'abc' } });
    expect(mockOnUpdateBasketMarker).toHaveBeenCalledWith('basket-1', {
      label: 'A',
    });

    // Test lowercase - should convert to uppercase
    mockOnUpdateBasketMarker.mockClear();
    fireEvent.change(labelInput, { target: { value: 'x' } });
    expect(mockOnUpdateBasketMarker).toHaveBeenCalledWith('basket-1', {
      label: 'X',
    });
  });
});
