import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UsageRecord } from '../types';

interface ApplicationChartProps {
  records: UsageRecord[];
}

const ApplicationChart: React.FC<ApplicationChartProps> = ({ records }) => {
  const dataMap = records.reduce((acc, curr) => {
    const totalMinutes = (curr.days * 24 * 60) + (curr.hours * 60) + curr.minutes;
    acc[curr.application] = (acc[curr.application] || 0) + totalMinutes;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataMap).map(name => ({
    name,
    minutes: dataMap[name],
    hours: parseFloat((dataMap[name] / 60).toFixed(2))
  }));

  return (
    <div className="h-64 w-full">
      <h3 className="text-lg font-bold mb-2 text-center">Usage by Application (Hours)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationChart;
