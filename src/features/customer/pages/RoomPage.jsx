import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import FilterSidebar from '../../../components/ui/sidebar/FilterSidebar';
import RoomCard from '../../../components/ui/card/RoomCard';
import { MOCK_ROOMS } from '../../../data/mock';

const RoomPage = () => {
  const [maxPrice, setMaxPrice] = useState(1000);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => room.price_per_night <= maxPrice);
  }, [maxPrice]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Available Rooms</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 3. Sidebar Filters */}
          <FilterSidebar maxPrice={maxPrice} onPriceChange={setMaxPrice} />

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
