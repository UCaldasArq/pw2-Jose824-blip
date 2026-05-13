import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserForm from '../src/components/UserForm';

describe('UserForm', () => {
  it('submits form with correct data', () => {
    const handleSubmit = vi.fn();
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Document/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '5551234' } });

    fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      document: '12345678',
      phoneNumber: '5551234',
    });
  });

  it('shows alert if fields are empty', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

    expect(alertSpy).toHaveBeenCalledWith('All fields are mandatory');
    expect(handleSubmit).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('does not submit when phone number contains letters', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Document/i), { target: { value: '87654321' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '555abc' } });

    fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

    expect(alertSpy).toHaveBeenCalledWith('Phone number must contain only numbers');
    expect(handleSubmit).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
