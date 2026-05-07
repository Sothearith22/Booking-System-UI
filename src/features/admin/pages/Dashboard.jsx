import React, { useState, useEffect, useMemo } from 'react';
import { adminService, v1Service } from '../../../services/api';
import {
  Loader2,
  Users,
  Calendar,
  DollarSign,
  Home,
  TrendingUp,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Clock,
  Briefcase,
  Bell,
  ArrowRight,
  ChevronRight,
  TrendingDown,
  LayoutGrid,
  Zap,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────

const formatCurrency = (val) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

// ── Stat Card Component ──────────────────────────────────────────

const StatCard = ({ label, value, icon, trend, trendValue, color, subtitle }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
        {React.cloneElement(icon, { className: color.replace('bg-', 'text-'), size: 24 })}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
        {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {trendValue}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      </div>
      {subtitle && <p className="text-[10px] text-gray-500 mt-1 font-medium italic">{subtitle}</p>}
    </div>
  </div>
);

// ── Main Dashboard Component ──────────────────────────────────────

const Dashboard = () => {
  const [data, setData] = useState({ rooms: [], bookings: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [roomsRes, bookingsRes, usersRes] = await Promise.all([
        v1Service.getRooms(),
        v1Service.getAllBookings(),
        adminService.getUsers(),
      ]);
      setData({
        rooms: roomsRes.data?.data ?? roomsRes.data ?? [],
        bookings: bookingsRes.data?.data ?? bookingsRes.data ?? [],
        users: usersRes.data?.data ?? usersRes.data ?? [],
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };


  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, [currentTime]);

  const stats = useMemo(() => {
    const totalRev = data.bookings.reduce((acc, b) => acc + (b.total_price || 0), 0);
    const pending = data.bookings.filter(b => b.status === 'pending').length;
    const occupied = data.rooms.filter(r => r.status === 'booked' || r.status === 'occupied' || r.status === 'maintenance').length;
    const occRate = data.rooms.length > 0 ? Math.round((occupied / data.rooms.length) * 100) : 0;

    return [
      { label: 'Total Revenue', value: formatCurrency(totalRev), icon: <DollarSign />, trend: 'up', trendValue: '+14.2%', color: 'bg-emerald-600', subtitle: 'Global revenue this month' },
      { label: 'New Bookings', value: data.bookings.length, icon: <Calendar />, trend: 'up', trendValue: '+8.4%', color: 'bg-blue-600', subtitle: `${pending} pending approval` },
      { label: 'Occupancy Rate', value: `${occRate}%`, icon: <Home />, trend: 'down', trendValue: '-2.1%', color: 'bg-violet-600', subtitle: `${occupied} rooms active` },
      { label: 'Total User', value: data.users.length.toLocaleString(), icon: <Users />, trend: 'up', trendValue: '+5.7%', color: 'bg-orange-600', subtitle: '+12 joined this week' },
      
    ];
  }, [data]);

  const recentBookings = useMemo(() => data.bookings.slice(0, 5), [data.bookings]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={56} />
        <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900">Synchronizing Analytics</h3>
            <p className="text-sm text-gray-500 font-medium italic">Fetching real-time business performance data…</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      {/* ── Header Area ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1.5 bg-blue-50 w-fit px-2 py-0.5 rounded-md">
            <Zap size={10} className="fill-blue-600" /> System Live
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
             {greeting}, Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium italic">
            Your property currently has <span className="text-blue-600 font-extrabold">{stats[2].value}</span> occupancy. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-900">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
            <Bell size={20} className="text-gray-400" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* ── Main Layout Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Analytics & Charts (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Revenue Chart Section */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Financial Overview</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Monthly Revenue Comparison</p>
              </div>
              <div className="flex bg-gray-50 p-1 rounded-xl">
                 <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-white shadow-sm text-blue-600">Revenue</button>
                 <button className="px-3 py-1.5 text-[10px] font-bold rounded-lg text-gray-400">Profit</button>
              </div>
            </div>

            {/* Custom Bar Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-5 px-4 mb-4 z-10 relative">
              {[45, 68, 52, 85, 60, 92, 75].map((h, i) => (
                <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all transform translate-y-2 group-hover/bar:translate-y-0 shadow-xl whitespace-nowrap z-20">
                    ${(h * 120).toLocaleString()}.00
                  </div>
                  {/* Bar Background Track */}
                  <div className="w-full bg-gray-50 rounded-t-2xl absolute inset-0 z-0"></div>
                  {/* Dynamic Bar */}
                  <div 
                    className="w-full bg-blue-500 rounded-t-2xl transition-all duration-1000 ease-out group-hover/bar:bg-blue-600 relative z-10 shadow-[0_-8px_20px_-8px_rgba(59,130,246,0.5)]" 
                    style={{ height: `${h}%` }}
                  >
                     <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                  </div>
                  {/* Label */}
                  <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-400 tracking-tighter uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 -mr-32 -mt-32 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
          </div>

          {/* Recent Bookings Table Section */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
             <div className="flex items-center justify-between p-8 border-b border-gray-50">
               <div>
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Recent Bookings</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Live updates across all channels</p>
               </div>
               <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 leading-none">
                 View All <ChevronRight size={14} />
               </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <tbody className="divide-y divide-gray-50">
                   {recentBookings.length === 0 ? (
                     <tr><td className="p-10 text-center text-gray-400 italic font-medium">No bookings available</td></tr>
                   ) : (
                     recentBookings.map((b) => (
                       <tr key={b.id} className="hover:bg-blue-50/20 transition-colors group">
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-blue-50 transition-transform group-hover:scale-110">
                                {b.guest_initials || b.guest_name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{b.guest_name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: #{b.id}</p>
                              </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                               <Home size={14} className="text-gray-400" />
                               <div>
                                 <p className="text-xs font-bold text-gray-700">{b.room_name}</p>
                                 <p className="text-[10px] text-gray-400 font-bold">{b.check_in}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {b.status}
                            </span>
                         </td>
                         <td className="px-8 py-5 text-right font-black text-gray-900">
                           {formatCurrency(b.total_price)}
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* Right Column: Cards & Activities (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Actions Card */}
          <div className="bg-[#1A202C] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <h3 className="text-xl font-extrabold mb-6 relative z-10 tracking-tight">Quick Controls</h3>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 rounded-3xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 group/btn border border-gray-700">
                <Calendar size={20} className="text-blue-400 group-hover/btn:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Booking</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 rounded-3xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 group/btn border border-gray-700">
                <LayoutGrid size={20} className="text-emerald-400 group-hover/btn:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Room</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 rounded-3xl hover:bg-violet-600 transition-all hover:scale-105 active:scale-95 group/btn border border-gray-700">
                <Users size={20} className="text-violet-400 group-hover/btn:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Staff</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 rounded-3xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 group/btn border border-gray-700">
                <BarChart3 size={20} className="text-orange-400 group-hover/btn:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Report</span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">System Logs</h3>
              <Activity size={18} className="text-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-8 relative">
              <div className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-gray-100"></div>
              {[
                { label: 'Booking Confirmed', user: 'Emma Miller', time: '5m', color: 'bg-emerald-500', icon: <CheckCircle2 size={12} /> },
                { label: 'Pending Payment', user: 'John Walker', time: '12m', color: 'bg-amber-500', icon: <Clock size={12} /> },
                { label: 'New Inquiry', user: 'Sophia Chen', time: '1h', color: 'bg-blue-500', icon: <Briefcase size={12} /> },
                { label: 'Incident Reported', user: 'Housekeeping', time: '3h', color: 'bg-rose-500', icon: <AlertTriangle size={12} /> },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 relative z-10 group">
                  <div className={`w-6 h-6 rounded-full ${act.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0`}>
                    {act.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 leading-none">
                      <p className="text-xs font-bold text-gray-900">{act.label}</p>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{act.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium">{act.user}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2">
              View All Logs <ArrowRight size={14} />
            </button>
          </div>

          {/* Occupancy Indicator Card */}
          <div className="bg-violet-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg shadow-violet-500/20">
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                   <p className="text-[10px] font-extrabold uppercase tracking-widest text-violet-100">Occupancy Level</p>
                   <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <div className="flex items-end gap-2">
                   <h3 className="text-4xl font-extrabold leading-none">{stats[2].value}</h3>
                   <p className="text-xs font-bold text-violet-100 opacity-80 mb-1">Capacity</p>
                </div>
                <div className="w-full h-2 bg-violet-700 rounded-full mt-6 overflow-hidden">
                   <div className="h-full bg-white rounded-full group-hover:bg-emerald-400 transition-all duration-700" style={{ width: stats[2].value }}></div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500 rounded-full blur-[60px] opacity-50 group-hover:scale-125 transition-transform duration-1000"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
