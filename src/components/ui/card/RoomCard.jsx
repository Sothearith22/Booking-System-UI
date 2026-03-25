import React from 'react';
import { MapPin, Star, Wifi, CircleDot, Wind, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Image */}
      <div className="h-64 relative overflow-hidden">
        <img
          src={room.image}
          alt={room.room_type}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'; }}
        />        <div className="absolute top-4 left-4">
           <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
             {room.tag || 'Best Seller'}
           </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
          <Heart size={18} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
              {room.room_type || 'Luxury Suite'}
            </h4>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1 font-medium">
              <MapPin size={12} />
              <span>{room.location || 'Paris, France'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-orange-700">{room.rating || '4.9'}</span>
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Wifi size={16} />
            <span className="text-[10px] font-bold uppercase">Wi-Fi</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <CircleDot size={16} />
            <span className="text-[10px] font-bold uppercase">Pool</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Wind size={16} />
            <span className="text-[10px] font-bold uppercase">Breakfast</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-50">
          <div>
            <span className="text-2xl font-black text-gray-900">${room.price_per_night || room.price || '320'}</span>
            <span className="text-gray-400 text-xs font-bold ml-1">/night</span>
          </div>
          <Link 
            to={`/customer/hotels/${room.id}`}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
