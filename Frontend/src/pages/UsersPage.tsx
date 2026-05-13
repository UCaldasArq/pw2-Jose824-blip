import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import type { User } from '../types';
import { getUsers, createUser, deleteUser } from '../services/userService';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (user: User) => {
    try {
      await createUser(user);
      fetchUsers();
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        alert('Validation error: ' + (err.response.data.message || 'Check fields'));
      } else {
        alert('Error creating user');
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Register User</h2>
          <UserForm onSubmit={handleCreateUser} />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <UserTable users={users} onDelete={handleDeleteUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
