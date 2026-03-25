import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-lg">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            Find Your Perfect Stay
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mb-10 leading-relaxed">
            Discover the world's most elegant hotels and cozy retreats for your next unforgettable journey.
          </p>

          {/* Floating Search Bar */}
          <div className="w-full max-w-4xl bg-white p-2 rounded-2xl shadow-xl flex items-center gap-1">
            <div className="flex-1 flex items-center px-4 gap-3 border-r border-gray-100 py-2">
              <MapPin className="text-blue-600 shrink-0" size={18} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Destination</span>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none w-full"
                />
              </div>
            </div>
            
            <div className="flex-1 flex items-center px-4 gap-3 border-r border-gray-100 py-2">
              <Calendar className="text-blue-600 shrink-0" size={18} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Check In / Out</span>
                <span className="text-sm font-bold text-gray-900 cursor-pointer">Add dates</span>
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 gap-3 py-2">
              <Users className="text-blue-600 shrink-0" size={18} />
              <div className="flex flex-col text-left w-full">
                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Guests</span>
                <span className="text-sm font-bold text-gray-900 cursor-pointer">2 Adults, 0 Children</span>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 whitespace-nowrap">
              Search Stays
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
