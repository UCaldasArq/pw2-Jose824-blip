import api from './api';
import type { UsageRecord, Application } from '../types';

export const getUsageRecords = () => api.get<UsageRecord[]>('/usage');
export const createUsageRecord = (record: UsageRecord) => api.post<UsageRecord>('/usage', record);
export const deleteUsageRecord = (id: string) => api.delete(`/usage/${id}`);
export const getApplications = () => api.get<Application[]>('/applications');
