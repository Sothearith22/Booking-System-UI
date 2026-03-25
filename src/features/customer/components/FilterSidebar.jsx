import React from 'react';
import { Filter, Map } from 'lucide-react';

const FilterSidebar = ({ 
  maxPrice, 
  onPriceChange, 
  selectedAmenities, 
  onAmenitiesChange,
  selectedRating,
  onRatingChange
}) => {
  const AMENITIES = [
    { label: 'Free Wi-Fi', value: 'wifi' },
    { label: 'Swimming Pool', value: 'pool' },
    { label: 'Hotel Gym', value: 'gym' },
    { label: 'Spa & Wellness', value: 'spa' },
    { label: 'Beach Access', value: 'beach' },
  ];

  const handleAmenityToggle = (value) => {
    if (selectedAmenities.includes(value)) {
      onAmenitiesChange(selectedAmenities.filter(a => a !== value));
    } else {
      onAmenitiesChange([...selectedAmenities, value]);
    }
  };

  const handleRatingToggle = (rating) => {
    if (selectedRating === rating) {
      onRatingChange(null);
    } else {
      onRatingChange(rating);
    }
  };

  return (
    <aside className="w-full lg:w-64 space-y-8 shrink-0">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
          <Filter size={18} className="text-blue-600" />
          Filter Selection
        </h3>
        
        {/* Price Range */}
        <div className="space-y-4 mb-8">
          <label className="text-sm font-bold text-gray-700 block">
            Max Price: <span className="text-blue-600">${maxPrice}</span>
          </label>
          <div className="relative pt-2">
             <input 
                type="range" 
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                min="0" 
                max="1000" 
                step="50"
                value={maxPrice}
                onChange={(e) => onPriceChange(Number(e.target.value))}
             />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>Min: $0</span>
            <span>Max: $1k+</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4 mb-8">
          <label className="text-sm font-bold text-gray-700 block uppercase tracking-wide text-[11px]">Amenities</label>
          <div className="space-y-3">
            {AMENITIES.map((amenity) => (
              <label key={amenity.value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="peer w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" 
                    checked={selectedAmenities.includes(amenity.value)}
                    onChange={() => handleAmenityToggle(amenity.value)}
                  />
                </div>
                <span className={`text-sm transition-colors ${
                  selectedAmenities.includes(amenity.value) ? 'text-blue-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {amenity.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700 block uppercase tracking-wide text-[11px]">Star Rating</label>
          <div className="flex flex-wrap gap-2">
            {[5, 4, 3, 2].map((stars) => (
              <button 
                key={stars} 
                onClick={() => handleRatingToggle(stars)}
                className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                  selectedRating === stars 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white border-gray-100 text-gray-600 hover:border-blue-600 hover:text-blue-600 shadow-sm'
                }`}
              >
                {stars} <span className={selectedRating === stars ? 'text-white' : 'text-yellow-400'}>★</span>
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
