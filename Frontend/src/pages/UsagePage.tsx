import React, { useState, useEffect } from 'react';
import UsageForm from '../components/UsageForm';
import UsageTable from '../components/UsageTable';
import type { User, UsageRecord, Application } from '../types';
import { getUsageRecords, createUsageRecord, deleteUsageRecord, getApplications } from '../services/usageService';
import { getUsers } from '../services/userService';

const UsagePage: React.FC = () => {
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterApp, setFilterApp] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usageRes, userRes, appRes] = await Promise.all([
        getUsageRecords(),
        getUsers(),
        getApplications()
      ]);
      setRecords(usageRes.data);
      setUsers(userRes.data);
      setApplications(appRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateRecord = async (record: UsageRecord) => {
    try {
      await createUsageRecord(record);
      fetchData();
    } catch {
      alert('Error saving record');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (window.confirm('Delete this record?')) {
      try {
        await deleteUsageRecord(id);
        fetchData();
      } catch {
        alert('Error deleting record');
      }
    }
  };

  const filteredRecords = records.filter(r => {
    const matchesApp = filterApp ? r.application === filterApp : true;
    const matchesUser = filterUser ? r.userId === filterUser : true;
    return matchesApp && matchesUser;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Application Usage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Register Usage</h2>
          <UsageForm users={users} applications={applications} onSubmit={handleCreateRecord} />
        </div>
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Usage History</h2>
            <div className="flex space-x-2">
              <select 
                value={filterApp} 
                onChange={(e) => setFilterApp(e.target.value)}
                className="border rounded p-1 text-sm"
              >
                <option value="">All Apps</option>
                {applications.map(app => <option key={app.id} value={app.name}>{app.name}</option>)}
              </select>
              <select 
                value={filterUser} 
                onChange={(e) => setFilterUser(e.target.value)}
                className="border rounded p-1 text-sm"
              >
                <option value="">All Users</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
              </select>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <UsageTable records={filteredRecords} onDelete={handleDeleteRecord} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsagePage;
