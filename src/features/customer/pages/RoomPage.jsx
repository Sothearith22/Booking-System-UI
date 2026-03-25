import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import RoomCard from '../components/RoomCard';
import { MOCK_ROOMS } from '../../../data/mock';

const RoomPage = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      const matchesPrice = room.price_per_night <= maxPrice;
      const matchesRating = !selectedRating || Math.floor(room.rating) === selectedRating;
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => room.amenities.includes(amenity));

      return matchesPrice && matchesRating && matchesAmenities;
    });
  }, [maxPrice, selectedAmenities, selectedRating]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Available Rooms</h1>
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
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
