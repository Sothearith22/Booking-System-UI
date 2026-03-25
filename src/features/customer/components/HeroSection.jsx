import React from 'react';
import { MapPin, Calendar, Users, Search, Play } from 'lucide-react';

const HeroSection = ({ searchLocation, onSearchChange }) => {
  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-slate-900">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Resort" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        
        {/* Sub-header badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-[3px] mb-8 animate-fade-in">
           <Play size={12} fill="white" />
           The World's Finest Collections
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none lowercase first-letter:uppercase drop-shadow-2xl">
          Luxury <span className="text-blue-500">Stays</span> <br/> 
          for <span className="underline decoration-blue-500/50 underline-offset-8">Modern</span> Nomads.
        </h1>
        
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-12 font-bold leading-relaxed">
          Discover a curated selection of properties designed for comfort and crafted for excellence.
        </p>

        {/* Floating Glassmorphism Search Bar */}
        <div className="w-full max-w-5xl bg-white/15 backdrop-blur-[24px] p-4 rounded-[40px] border border-white/20 shadow-2xl flex flex-col md:flex-row items-stretch gap-4">
          
          <div className="flex-1 bg-white/10 rounded-[24px] border border-white/10 p-4 transition-all hover:bg-white/20 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
               <MapPin size={20} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest block mb-1">Location</span>
              <input 
                type="text" 
                value={searchLocation}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Where to next?" 
                className="bg-transparent text-white font-black text-sm placeholder:text-white/30 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex-1 bg-white/10 rounded-[24px] border border-white/10 p-4 transition-all hover:bg-white/20 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
               <Calendar size={20} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest block mb-1">Check In</span>
              <p className="text-white font-black text-sm cursor-pointer whitespace-nowrap">Add dates</p>
            </div>
          </div>

          <div className="flex-1 bg-white/10 rounded-[24px] border border-white/10 p-4 transition-all hover:bg-white/20 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
               <Users size={20} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest block mb-1">Guests</span>
              <p className="text-white font-black text-sm cursor-pointer whitespace-nowrap">2 Adults, 1 Child</p>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-3">
            <Search size={20} />
            Search Stays
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
