import React from 'react';
import { ChevronDown } from 'lucide-react';

const DashboardHeader = ({ count, sortBy, onSortChange }) => {
  const SORT_OPTIONS = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Top Rated', value: 'rating' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">Featured Destinations</h2>
        <p className="text-sm text-gray-500 mt-1 pl-5">Showing {count} available properties</p>
      </div>
      
      <div className="relative group self-end">
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-gray-100 pl-4 pr-10 py-2.5 rounded-2xl text-xs font-bold text-gray-700 cursor-pointer hover:border-blue-600 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );
};

export default DashboardHeader;
