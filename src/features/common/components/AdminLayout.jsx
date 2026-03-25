import React, { useMemo } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  DoorOpen,
  Star,
  Package,
  Activity,
  Layers,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navSections = useMemo(() => [
    {
      title: 'Core',
      items: [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Calendar size={20} />, label: 'Bookings', path: '/admin/bookings' },
      ]
    },
    {
      title: 'Management',
      items: [
        { icon: <Layers size={20} />, label: 'Categories', path: '/admin/categories' },
        { icon: <DoorOpen size={20} />, label: 'Rooms', path: '/admin/rooms' },
        { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
        { icon: <Star size={20} />, label: 'Reviews', path: '/admin/reviews' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { icon: <Package size={20} />, label: 'Inventory', path: '/admin/inventory' },
        { icon: <Activity size={20} />, label: 'Availability', path: '/admin/availability' },
      ]
    },
    {
      title: 'System',
      items: [
        { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
        { icon: <ShieldCheck size={20} />, label: 'Security', path: '/admin/security' },
      ]
    }
  ], []);

  const activeLabel = useMemo(() => {
    for (const section of navSections) {
      const current = section.items.find(item => location.pathname.includes(item.path));
      if (current) return current.label;
    }
    return 'Admin Panel';
  }, [location.pathname, navSections]);

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#2D3748]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A202C] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">L</div>
            <h2 className="text-xl font-bold tracking-tight">LuxeStay</h2>
          </div>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-2 opacity-80">Admin Portal</p>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-6 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase px-4 mb-2">
                {section.title}
              </p>
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-medium' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}
                  `}
                >
                  <span className={`transition-colors duration-200 ${location.pathname.includes(item.path) ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {item.icon}
                  </span>
                  <span className="mx-3 text-sm">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700 bg-[#171923]">
           <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-800/50 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email || 'admin@stayease.com'}</p>
              </div>
           </div>
           <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
            >
              <LogOut size={16} />
              Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-100 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">{activeLabel}</h1>
            <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
              <CheckCircle2 size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Live System</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8F9FA] p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
