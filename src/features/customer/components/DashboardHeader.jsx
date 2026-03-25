import React from 'react';
import { ChevronDown } from 'lucide-react';

const DashboardHeader = ({ count }) => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Featured Destinations</h2>
        <p className="text-sm text-gray-500 mt-1">Showing {count} available properties</p>
      </div>
      <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-blue-600 transition-colors shadow-sm">
        <span>Sort by: <span className="text-blue-600">Most Popular</span></span>
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export default DashboardHeader;
