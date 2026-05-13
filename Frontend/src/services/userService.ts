import api from './api';
import type { User } from '../types';

export const getUsers = () => api.get<User[]>('/users');
export const createUser = (user: User) => api.post<User>('/users', user);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
