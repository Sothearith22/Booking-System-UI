import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  Calendar, 
  MapPin, 
  FileText, 
  RefreshCw, 
  Filter,
  ArrowRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { MOCK_BOOKINGS } from '../../../data/mock';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, upcoming, completed, cancelled
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = useMemo(() => {
    return MOCK_BOOKINGS.filter(booking => {
      const matchesSearch = 
        booking.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const isUpcoming = booking.status === 'confirmed';
      const isCompleted = booking.status === 'completed';
      const isCancelled = booking.status === 'cancelled';

      if (activeTab === 'upcoming') return matchesSearch && isUpcoming;
      if (activeTab === 'completed') return matchesSearch && isCompleted;
      if (activeTab === 'cancelled') return matchesSearch && isCancelled;
      return matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const stats = useMemo(() => {
    return {
      all: MOCK_BOOKINGS.length,
      upcoming: MOCK_BOOKINGS.filter(b => b.status === 'confirmed').length,
      completed: MOCK_BOOKINGS.filter(b => b.status === 'completed').length,
      cancelled: MOCK_BOOKINGS.filter(b => b.status === 'cancelled').length,
    };
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      case 'confirmed': return <Clock size={14} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span>Dashboard</span>
            <ArrowRight size={12} />
            <span className="text-blue-600">Booking History</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Booking History</h1>
          <p className="text-gray-500 max-w-2xl font-medium">
            Manage and review all your previous luxury stays at LuxeStay. View receipts, check booking details, or re-book your favorite destinations.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by hotel name or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
             <button className="flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all whitespace-nowrap">
               <Filter size={16} />
               Filter by Date
               <ChevronDown size={14} />
             </button>

             <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>

             <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {[
                  { id: 'all', label: 'All' },
                   { id: 'upcoming', label: 'Upcoming' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'cancelled', label: 'Cancelled' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <Search size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
               <p className="text-gray-500 font-medium max-w-xs mx-auto mb-8">
                 We couldn't find any bookings matching your current filters. Try adjusting your search query.
               </p>
               <button 
                onClick={() => {setActiveTab('all'); setSearchQuery('');}}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all text-sm"
               >
                 Clear All Filters
               </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-72 h-56 lg:h-auto overflow-hidden relative">
                  <img 
                    src={booking.image} 
                    alt={booking.hotel_name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(booking.status)} shadow-lg backdrop-blur-md bg-white/90`}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-[3px] uppercase mb-1 block">#{booking.id}</span>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{booking.hotel_name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase tracking-wider">
                        <MapPin size={12} className="text-blue-600" />
                        {booking.location}
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-3xl font-black text-gray-900 tracking-tighter">${booking.price.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total for {booking.nights} nights</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-t border-gray-50">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Check-in</p>
                      <p className="text-sm font-black text-gray-800 flex items-center gap-2">
                        <Calendar size={14} className="text-blue-600" />
                        {booking.check_in}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Check-out</p>
                      <p className="text-sm font-black text-gray-800 flex items-center gap-2">
                        <Calendar size={14} className="text-blue-600" />
                        {booking.check_out}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Room Type</p>
                      <p className="text-sm font-black text-gray-800">{booking.room_type}</p>
                    </div>
                    <div className="flex items-center justify-start md:justify-end gap-3">
                       <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group/btn">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                    <div className="flex items-center gap-6">
                       <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
                          <FileText size={14} />
                          View Receipt
                       </button>
                       {booking.status === 'completed' && (
                         <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            Write Review
                         </button>
                       )}
                    </div>
                    
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all">
                       <RefreshCw size={16} />
                       Book Again
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-bold text-gray-400 tracking-wide uppercase">
              Showing <span className="text-gray-900">{filteredBookings.length}</span> of <span className="text-gray-900">{MOCK_BOOKINGS.length}</span> bookings
            </p>
            <div className="flex items-center gap-3">
               <button disabled className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-300 transition-all cursor-not-allowed">
                  <ChevronDown className="rotate-90" size={18} />
               </button>
               <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-500/20">
                  1
               </button>
               <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all">
                  2
               </button>
               <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all">
                  3
               </button>
               <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 bg-white text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <ChevronDown className="-rotate-90" size={18} />
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
