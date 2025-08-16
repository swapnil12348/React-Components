import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders the input with a label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(<InputField label="Test Label" />);
    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testing' } });
    expect(input.value).toBe('testing');
  });

  it('shows an error message when invalid', () => {
    render(<InputField label="Test Label" invalid errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<InputField label="Test Label" disabled />);
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });
});