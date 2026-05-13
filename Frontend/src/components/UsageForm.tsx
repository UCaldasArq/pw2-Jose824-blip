import React, { useState } from 'react';
import type { User, UsageRecord, Application } from '../types';

interface UsageFormProps {
  users: User[];
  applications: Application[];
  onSubmit: (record: UsageRecord) => void;
}

const UsageForm: React.FC<UsageFormProps> = ({ users, applications, onSubmit }) => {
  const [formData, setFormData] = useState<UsageRecord>({
    userId: '',
    application: '',
    days: 0,
    hours: 0,
    minutes: 0,
    usagePeriod: 'Morning',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const val = (name === 'days' || name === 'hours' || name === 'minutes') ? parseInt(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userId && formData.application) {
      if (formData.hours < 0 || formData.hours > 23 || formData.minutes < 0 || formData.minutes > 59 || (formData.days ?? 0) < 0) {
        alert('Invalid time values');
        return;
      }
      onSubmit(formData);
      setFormData({
        userId: '',
        application: '',
        days: 0,
        hours: 0,
        minutes: 0,
        usagePeriod: 'Morning',
      });
    } else {
      alert('User and Application are mandatory');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" noValidate>
      <div className="mb-4">
        <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User</label>
        <select id="userId" name="userId" value={formData.userId} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          <option value="">Select User</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="application" className="block text-gray-700 text-sm font-bold mb-2">Application</label>
        <select id="application" name="application" value={formData.application} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          <option value="">Select Application</option>
          {applications.map(app => <option key={app.id} value={app.name}>{app.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="days" className="block text-gray-700 text-sm font-bold mb-2">Days</label>
          <input id="days" name="days" type="number" min="0" value={formData.days} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="hours" className="block text-gray-700 text-sm font-bold mb-2">Hours</label>
          <input id="hours" name="hours" type="number" min="0" max="23" value={formData.hours} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div>
          <label htmlFor="minutes" className="block text-gray-700 text-sm font-bold mb-2">Minutes</label>
          <input id="minutes" name="minutes" type="number" min="0" max="59" value={formData.minutes} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="usagePeriod" className="block text-gray-700 text-sm font-bold mb-2">Usage Period</label>
        <select id="usagePeriod" name="usagePeriod" value={formData.usagePeriod} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Register Usage
      </button>
    </form>
  );
};

export default UsageForm;
