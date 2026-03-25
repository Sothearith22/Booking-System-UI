import React from 'react';
import { MapPin, Star, Wifi, CircleDot, Wind, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full">
      {/* Card Image */}
      <div className="h-72 relative overflow-hidden bg-gray-50">
        <img
          src={room.image}
          alt={room.room_type}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'; }}
        />
        
        {/* Top Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
           <span className="bg-white/95 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[2px] shadow-xl">
             {room.tag || 'Luxe Choice'}
           </span>
           {room.status === 'booked' && (
             <span className="bg-red-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[2px] shadow-xl self-start">
               Sold Out
             </span>
           )}
        </div>

        <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white hover:text-red-500 transition-all flex items-center justify-center">
           <Heart size={18} />
        </button>

        {/* Rating Floating Badge */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 border border-white/50">
           <Star size={14} className="text-orange-400 fill-orange-400" />
           <span className="text-sm font-black text-gray-900 font-urbanist">{room.rating || '4.9'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="font-black text-2xl text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight truncate lowercase first-letter:uppercase">
              {room.room_type || 'Luxury Suite'}
            </h4>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1.5 font-bold tracking-wide">
              <MapPin size={14} className="text-blue-500" />
              <span>{room.location || 'Paris, France'}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-2 mb-8 mt-2">
           <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 scale-100 group-hover:bg-blue-50 transition-colors">
              <Wifi size={16} className="text-gray-400 group-hover:text-blue-600" />
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Wifi</span>
           </div>
           <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 scale-100 group-hover:bg-blue-50 transition-colors">
              <CircleDot size={16} className="text-gray-400 group-hover:text-blue-600" />
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">Pool</span>
           </div>
           <div className="bg-gray-50 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 scale-100 group-hover:bg-blue-50 transition-colors">
              <Wind size={16} className="text-gray-400 group-hover:text-blue-600" />
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600">AC</span>
           </div>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-end mt-auto pt-6 border-t border-gray-50">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Starting from</p>
            <div className="flex items-end gap-1">
               <span className="text-3xl font-black text-gray-900 tracking-tighter leading-none">${room.price_per_night || room.price || '320'}</span>
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none pb-1">/Night</span>
            </div>
          </div>
          <Link 
            to={`/customer/hotels/${room.id}`}
            className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all group-hover:bg-blue-700"
          >
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
