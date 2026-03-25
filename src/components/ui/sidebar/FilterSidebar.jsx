import React from 'react';
import { Filter, Map } from 'lucide-react';

const FilterSidebar = ({ maxPrice, onPriceChange }) => {
  return (
    <aside className="w-full lg:w-64 space-y-8 shrink-0">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Filter size={18} />
          Filters
        </h3>
        
        {/* Price Range */}
        <div className="space-y-4 mb-8">
          <label className="text-sm font-bold text-gray-700 block">
            Max Price: ${maxPrice}
          </label>
          <div className="relative pt-2">
             <input 
                type="range" 
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                min="0" 
                max="1000" 
                value={maxPrice}
                onChange={(e) => onPriceChange(Number(e.target.value))}
             />
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>$0</span>
            <span>$1,000+</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4 mb-8">
          <label className="text-sm font-bold text-gray-700 block">Amenities</label>
          <div className="space-y-3">
            {['Free Wi-Fi', 'Swimming Pool', 'Gym', 'Spa & Wellness'].map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 block">Star Rating</label>
          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2].map((stars) => (
              <button 
                key={stars} 
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  stars === 4 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-600'
                }`}
              >
                {stars} ★
              </button>
            ))}
          </div>
        </div>

        {/* Map Preview Placeholder */}
        <div className="mt-10 relative group cursor-pointer overflow-hidden rounded-xl border border-gray-200 h-32 bg-gray-100 flex items-center justify-center">
           <Map className="text-gray-400 mb-2" size={32} />
           <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg">Show on Map</button>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
