import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { 
  Star, 
  Bell, 
  User, 
  LogOut,
  Mail,
  Search,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const CustomerLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/customer' },
    { name: 'Rooms', path: '/customer/rooms' },
    { name: 'My Bookings', path: '/customer/bookings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/customer" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Star className="text-white fill-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">StayEase</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold transition-all hover:text-blue-600 relative py-1",
                    location.pathname === link.path 
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600" 
                      : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-5">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-sm font-bold text-gray-900 leading-none">{user?.name || 'Customer'}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">Premium Member</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden text-white">
                   {user?.avatar ? (
                     <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                   ) : (
                     <span className="text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
                   )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - No max-w-7xl here to allow full-width heroes */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link to="/customer" className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Star className="text-white fill-white" size={20} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">StayEase</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                We offer the best curated selection of luxury hotels and budget-friendly stays across the globe. Your comfort is our priority.
              </p>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer text-white">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer text-white">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600 transition-colors cursor-pointer text-white">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>


            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/faq" className="hover:text-blue-400 transition-colors">Help Center / FAQ</Link></li>
                <li><Link to="/booking-guide" className="hover:text-blue-400 transition-colors">Booking Guide</Link></li>
                <li><Link to="/refund" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-6">Subscribe for travel deals and exclusive member offers.</p>
              <form className="relative flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-slate-800 border-none rounded-lg py-3.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-500"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-lg active:scale-95">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 StayEase Hotel Booking Management System. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-300 cursor-pointer">Twitter</span>
              <span className="hover:text-slate-300 cursor-pointer">Instagram</span>
              <span className="hover:text-slate-300 cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
