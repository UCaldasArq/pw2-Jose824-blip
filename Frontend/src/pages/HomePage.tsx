import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Screen Time Tracker</h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Manage your digital well-being by tracking the time you spend on various applications. 
        Get visual statistics and insights into your daily usage patterns.
      </p>
      <div className="flex space-x-4">
        <Link to="/users" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Manage Users
        </Link>
        <Link to="/usage" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
          Log Usage
        </Link>
        <Link to="/dashboard" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
