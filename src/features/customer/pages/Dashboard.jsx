import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import RoomCard from '../components/RoomCard';
import HeroSection from '../components/HeroSection';
import DashboardHeader from '../components/DashboardHeader';
import { MOCK_ROOMS } from '../../../data/mock';

const CustomerDashboard = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [searchLocation, setSearchLocation] = useState('');

  const filteredRooms = useMemo(() => {
    let result = MOCK_ROOMS.filter(room => {
      // 1. Price Filter
      const matchesPrice = room.price_per_night <= maxPrice;
      
      // 2. Rating Filter
      const matchesRating = !selectedRating || Math.floor(room.rating) === selectedRating;
      
      // 3. Amenities Filter
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => room.amenities.includes(amenity));

      // 4. Location Search
      const matchesLocation = !searchLocation || 
        room.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        room.room_type.toLowerCase().includes(searchLocation.toLowerCase());

      return matchesPrice && matchesRating && matchesAmenities && matchesLocation;
    });

    // 4. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price_per_night - b.price_per_night);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price_per_night - a.price_per_night);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    // 'popular' could be default mock order or we could add a popularity key

    return result;
  }, [maxPrice, selectedAmenities, selectedRating, sortBy]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection 
        searchLocation={searchLocation} 
        onSearchChange={setSearchLocation} 
      />

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 3. Sidebar Filters */}
          <FilterSidebar 
            maxPrice={maxPrice} 
            onPriceChange={setMaxPrice}
            selectedAmenities={selectedAmenities}
            onAmenitiesChange={setSelectedAmenities}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />

          {/* 4. Results Area */}
          <div className="flex-1">
            {/* Header Component */}
            <DashboardHeader 
              count={filteredRooms.length} 
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Results Grid */}
            {filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">No matching properties found.</p>
                <button 
                  onClick={() => {
                    setMaxPrice(1000);
                    setSelectedAmenities([]);
                    setSelectedRating(null);
                    setSortBy('popular');
                    setSearchLocation('');
                  }}
                  className="text-blue-600 font-bold mt-2 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            <div className="mt-16 flex justify-center">
               <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95">
                 Load More Options
                 <ChevronDown size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
