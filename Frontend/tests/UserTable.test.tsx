import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserTable from '../src/components/UserTable';

describe('UserTable', () => {
  it('renders registered users and deletes the selected user', () => {
    const handleDelete = vi.fn();
    render(
      <UserTable
        users={[
          { id: 'user-1', firstName: 'Ana', lastName: 'Perez', document: '123', phoneNumber: '3001234567' },
          { id: 'user-2', firstName: 'Luis', lastName: 'Gomez', document: '456', phoneNumber: '3017654321' },
        ]}
        onDelete={handleDelete}
      />,
    );

    expect(screen.getByText('Ana Perez')).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();
    expect(screen.getByText('3017654321')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[1]);

    expect(handleDelete).toHaveBeenCalledWith('user-2');
  });
});
