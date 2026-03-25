import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Download, 
  MessageCircle, 
  XCircle,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    id: '#HMC-98231',
    hotel: {
      name: "Grand Plaza Resort & Spa",
      location: "San Francisco, California",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    },
    dates: {
      checkIn: "Oct 12, 2023 (15:00)",
      checkOut: "Oct 15, 2023 (11:00)",
      nights: 3
    },
    room: "Deluxe King Suite • 1 Room • 2 Adults",
    price: {
      nightly: 299.00,
      subtotal: 897.00,
      taxes: 107.64,
      total: 1004.64
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center mb-10 overflow-hidden relative">
           <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-green-400 to-blue-500"></div>
           <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100 shadow-xl shadow-green-500/10">
              <CheckCircle2 size={48} className="animate-bounce" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4 lowercase first-letter:uppercase">Booking Confirmed!</h1>
           <p className="text-gray-500 font-bold max-w-lg mb-8 text-lg">
             Your luxury reservation is secured. We've sent a confirmation email with all the details to your registered address.
           </p>
           <div className="bg-gray-50 px-8 py-3 rounded-2xl flex items-center gap-4 border border-gray-100 mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking Reference</span>
              <span className="text-sm font-black text-blue-600">{bookingDetails.id}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Booking Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-56 h-40 overflow-hidden rounded-[24px]">
                     <img src={bookingDetails.hotel.image} alt="Hotel" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase mb-4 text-blue-600">
                        <Clock size={12} />
                        Upcoming Stay
                     </div>
                     <h2 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors uppercase first-letter:uppercase">{bookingDetails.hotel.name}</h2>
                     <div className="flex items-center gap-1.5 text-gray-500 font-bold text-sm tracking-wide mb-6">
                        <MapPin size={16} className="text-blue-500" />
                        {bookingDetails.hotel.location}
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                        <div className="flex gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                              <Calendar size={18} />
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Check-in</p>
                              <p className="text-xs font-black text-gray-700">{bookingDetails.dates.checkIn}</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                              <Calendar size={18} />
                           </div>
                           <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Check-out</p>
                              <p className="text-xs font-black text-gray-700">{bookingDetails.dates.checkOut}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-[2px] mb-8 pb-4 border-b border-gray-50">Price Summary</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                     <span>{bookingDetails.room} (${bookingDetails.price.nightly.toFixed(2)} × {bookingDetails.dates.nights} nights)</span>
                     <span className="text-gray-900 font-black">${bookingDetails.price.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                     <span>Service Fee & Taxes (12%)</span>
                     <span className="text-gray-900 font-black">${bookingDetails.price.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-8 border-t border-gray-50">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Total Amount Paid</p>
                        <p className="text-4xl font-black text-blue-600 tracking-tighter">${bookingDetails.price.total.toFixed(2)}</p>
                     </div>
                     <div className="px-6 py-3 bg-green-50 text-green-600 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                        <CheckCircle2 size={16} />
                        Payment Successful
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Side Toolbar: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-blue-600 p-8 rounded-[40px] shadow-xl shadow-blue-500/20 text-white">
               <h4 className="text-xl font-black mb-4">Need help?</h4>
               <p className="text-sm text-blue-100 font-medium mb-8 leading-relaxed italic opacity-80">
                 Manage your booking, request special accommodations, or contact the property directly.
               </p>
               <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/customer/bookings')}
                    className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                     <LayoutDashboard size={18} />
                     View My Bookings
                  </button>
                  <button className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black text-sm border-2 border-white/20 uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3">
                     <Download size={18} />
                     Download Receipt
                  </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
               <h4 className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 pl-4 mb-4">Quick Actions</h4>
               <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-xs font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                     <div className="flex items-center gap-3">
                        <Calendar size={16} />
                        Modify Dates
                     </div>
                     <ChevronRight size={14} />
                  </button>
                  <button onClick={() => navigate('/customer/support')} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-xs font-black text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                     <div className="flex items-center gap-3">
                        <MessageCircle size={16} />
                        Contact Concierge
                     </div>
                     <ChevronRight size={14} />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl text-xs font-black text-red-400 hover:bg-red-50 hover:text-red-500 transition-all">
                     <div className="flex items-center gap-3">
                        <XCircle size={16} />
                        Cancel Booking
                     </div>
                     <ChevronRight size={14} />
                  </button>
               </div>
            </div>

            <div className="relative group overflow-hidden rounded-[40px] h-48 bg-gray-100 border border-gray-50">
               <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-2xl text-[10px] font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                     <ExternalLink size={14} />
                     GET DIRECTIONS
                  </button>
               </div>
               <div className="h-full bg-blue-50/50 flex items-center justify-center text-blue-200">
                  <MapPin size={64} className="opacity-10" />
               </div>
            </div>

            <p className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
               <ShieldCheck size={14} />
               Secure 256-Bit SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
