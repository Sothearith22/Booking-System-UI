import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, User, Check, Loader2, Calendar } from 'lucide-react';
import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';

// ─────────────────────────────────────────────────────────────────────────────
// Static Mock Data (should match Dashboard)
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_ROOMS = [
  {
    id: 1,
    room_number: '101',
    room_type: 'Grand Royal Suite',
    location: 'Paris, France',
    price_per_night: 320,
    rating: 4.9,
    floor: 4,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'breakfast'],
    tag: 'Best Seller'
  },
  {
    id: 2,
    room_number: '205',
    room_type: 'Ocean View Villa',
    location: 'Maldives',
    price_per_night: 550,
    rating: 4.8,
    floor: 1,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'pool', 'beach'],
    tag: 'Featured'
  },
  {
    id: 3,
    room_number: '302',
    room_type: 'Alpine Mountain Lodge',
    location: 'Swiss Alps',
    price_per_night: 280,
    rating: 4.7,
    floor: 3,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'fireplace', 'spa'],
    tag: 'Eco Friendly'
  },
  {
    id: 4,
    room_number: '404',
    room_type: 'Modern City Penthouse',
    location: 'Tokyo, Japan',
    price_per_night: 420,
    rating: 4.9,
    floor: 12,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1512918766674-ed62b9a79ad6?auto=format&fit=crop&q=80&w=800',
    amenities: ['wifi', 'gym', 'smart-home'],
    tag: 'New'
  }
];

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = () => {
      // Simulate network delay
      setTimeout(() => {
        const foundRoom = MOCK_ROOMS.find(r => r.id === parseInt(id));
        if (foundRoom) {
          setRoom(foundRoom);
        } else {
          setError("Could not load room details.");
        }
        setLoading(false);
      }, 500);
    };

    fetchRoomDetails();
  }, [id]);

  const handleBookRoom = async () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert(`Successfully booked ${room.room_type} (Room ${room.room_number})!`);
      navigate('/customer');
    }, 1200);
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="animate-spin mb-2" size={48} />
        <p>Loading room details...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="space-y-4">
        <Alert type="error">{error || "Room not found"}</Alert>
        <Button onClick={() => navigate(-1)} variant="secondary">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="h-64 md:h-[500px] bg-gray-200 relative">
          <img 
            src={room.image || 'https://via.placeholder.com/1200x600?text=Room+Image'} 
            alt={room.room_number} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-xl text-sm font-bold text-gray-800 shadow-lg hover:bg-white transition-all active:scale-95"
          >
            ← Back to Destinations
          </button>
        </div>
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                   {room.tag || 'Best Seller'}
                 </span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{room.room_type || 'Standard Room'}</h1>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <MapPin size={18} className="text-blue-600" />
                <span>Floor {room.floor || '1'} • Room {room.room_number} • {room.location}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <Star size={16} fill="currentColor" />
                  {room.rating} (Verified)
                </div>
              </div>
            </div>
            <div className="text-right bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[200px]">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Price per night</p>
              <p className="text-4xl font-black text-gray-900">${room.price_per_night || room.price}<span className="text-sm text-gray-400 font-bold ml-1 tracking-normal">/night</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2 space-y-10">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">About this room</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    Experience ultimate luxury in our {room.room_type?.toLowerCase()} room on the {room.floor}th floor. 
                    Thoughtfully designed with premium materials and modern aesthetics, this room provides the 
                    perfect balance of comfort and sophistication. Whether you're here for business or leisure, 
                    our {room.location} location offers the best the city has to offer right at your doorstep.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-6">What's included</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="bg-green-100 p-2 rounded-lg"><Check size={20} className="text-green-600" /></div>
                      <span className="text-sm font-bold text-gray-700">Status: Available</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="bg-blue-100 p-2 rounded-lg"><Wifi size={20} className="text-blue-600" /></div>
                      <span className="text-sm font-bold text-gray-700">High-speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="bg-purple-100 p-2 rounded-lg"><User size={20} className="text-purple-600" /></div>
                      <span className="text-sm font-bold text-gray-700">Capacity: 2 Guests</span>
                    </div>
                  </div>
                </div>
             </div>

             <div className="lg:col-span-1">
                <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200 sticky top-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                      <Calendar size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">Book Now</h4>
                      <p className="text-blue-100 text-sm">Best price guaranteed</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-blue-200 tracking-widest block mb-1">Check In - Check Out</span>
                        <span className="text-sm font-bold">Select Dates</span>
                     </div>
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-blue-200 tracking-widest block mb-1">Guests</span>
                        <span className="text-sm font-bold">2 Adults, 0 Children</span>
                     </div>
                  </div>

                  <div className="border-t border-white/20 pt-6 mb-8 flex justify-between items-end">
                     <div>
                        <span className="text-sm text-blue-100">Total Price</span>
                        <p className="text-2xl font-black">${room.price_per_night}</p>
                     </div>
                     <span className="text-xs text-blue-200">Includes all taxes</span>
                  </div>

                  <Button 
                    onClick={handleBookRoom}
                    disabled={isBooking || room.status !== 'available'}
                    variant="secondary"
                    className="w-full py-4 text-blue-600 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 bg-white border-none"
                  >
                    {isBooking ? <Loader2 className="animate-spin text-blue-600" size={24} /> : 'Reserve Room'}
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
