import React from 'react';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const MyBookings = () => {
  // Static demo data for UI layout
  const bookings = [
    { id: 'BK-101', hotel: 'Grand Royal Suite', date: 'March 28, 2026', status: 'confirmed', total: 640 },
    { id: 'BK-102', hotel: 'Alpine Mountain Lodge', date: 'April 05, 2026', status: 'pending', total: 280 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="text-green-500" size={16} />;
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      default: return <XCircle className="text-red-500" size={16} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{booking.hotel}</h3>
                <p className="text-sm text-gray-500">{booking.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                <p className="font-black text-gray-900">${booking.total}</p>
              </div>
              
              <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold capitalize", 
                booking.status === 'confirmed' ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
              )}>
                {getStatusIcon(booking.status)}
                {booking.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
