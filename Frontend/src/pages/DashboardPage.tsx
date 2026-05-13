import React, { useState, useEffect } from 'react';
import ApplicationChart from '../components/ApplicationChart';
import UsagePeriodChart from '../components/UsagePeriodChart';
import type { UsageRecord } from '../types';
import { getUsageRecords } from '../services/usageService';

const DashboardPage: React.FC = () => {
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getUsageRecords();
        setRecords(response.data);
      } catch (err) {
        console.error('Failed to fetch usage records', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const getTopApplication = () => {
    if (records.length === 0) return null;
    const dataMap = records.reduce((acc, curr) => {
      const totalMinutes = (curr.days * 24 * 60) + (curr.hours * 60) + curr.minutes;
      acc[curr.application] = (acc[curr.application] || 0) + totalMinutes;
      return acc;
    }, {} as Record<string, number>);

    let topApp = '';
    let maxTime = -1;

    for (const [app, time] of Object.entries(dataMap)) {
      if (time > maxTime) {
        maxTime = time;
        topApp = app;
      }
    }

    return { name: topApp, time: maxTime };
  };

  const topApp = getTopApplication();

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Usage Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Records</h3>
          <p className="text-3xl font-bold">{records.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Most Used App</h3>
          <p className="text-3xl font-bold">{topApp ? topApp.name : 'N/A'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Time (Hours)</h3>
          <p className="text-3xl font-bold">
            {topApp ? (topApp.time / 60).toFixed(1) : 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ApplicationChart records={records} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <UsagePeriodChart records={records} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
