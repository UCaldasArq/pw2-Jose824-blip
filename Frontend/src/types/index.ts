export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  document: string;
  phoneNumber: string;
}

export type UsagePeriod = 'Morning' | 'Afternoon' | 'Night';

export interface UsageRecord {
  id?: string;
  userId: string;
  application: string;
  days: number;
  hours: number;
  minutes: number;
  usagePeriod: UsagePeriod;
  user?: User;
}

export interface Application {
  id: string;
  name: string;
}
