import React from 'react';
import type { UsageRecord } from '../types';

interface UsageTableProps {
  records: UsageRecord[];
  onDelete: (id: string) => void;
}

const UsageTable: React.FC<UsageTableProps> = ({ records, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">Application</th>
            <th className="py-2 px-4 border-b text-left">Time</th>
            <th className="py-2 px-4 border-b text-left">Period</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{record.user ? `${record.user.firstName} ${record.user.lastName}` : record.userId}</td>
              <td className="py-2 px-4 border-b">{record.application}</td>
              <td className="py-2 px-4 border-b">{record.days}d {record.hours}h {record.minutes}m</td>
              <td className="py-2 px-4 border-b">{record.usagePeriod}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => record.id && onDelete(record.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageTable;
