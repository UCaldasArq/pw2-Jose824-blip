import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UsageRecord } from '../types';

interface UsagePeriodChartProps {
  records: UsageRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const UsagePeriodChart: React.FC<UsagePeriodChartProps> = ({ records }) => {
  const dataMap = records.reduce((acc, curr) => {
    acc[curr.usagePeriod] = (acc[curr.usagePeriod] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataMap).map(name => ({
    name,
    value: dataMap[name]
  }));

  return (
    <div className="h-64 w-full">
      <h3 className="text-lg font-bold mb-2 text-center">Usage Frequency by Period</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsagePeriodChart;
