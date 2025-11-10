import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CourseInfoForm } from './CourseInfoForm';

describe('CourseInfoForm', () => {
  it('renders the component with hole number input', () => {
    const mockOnHoleNumberChange = vi.fn();
    render(
      <CourseInfoForm holeNumber={1} onHoleNumberChange={mockOnHoleNumberChange} />
    );
    expect(screen.getByText('Hole Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Hole Number')).toBeInTheDocument();
  });
});
