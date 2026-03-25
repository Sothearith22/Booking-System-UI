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
    { name: 'Explore', path: '/customer/explore' },
    { name: 'My Bookings', path: '/customer/bookings' },
    { name: 'Product Service', path: '/customer/product-service' },
    { name: 'Support', path: '/customer/support' },
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
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                   <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                </div>
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">LuxeStay</span>
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
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center font-black text-blue-600 text-[10px]">L</div>
                </div>
                <span className="text-xl font-black text-white tracking-tight">LuxeStay</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                We offer the best curated selection of luxury hotels and budget-friendly stays across the globe. Your comfort is our priority.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer text-white shadow-lg overflow-hidden group/social">
                   <div className="text-slate-400 group-hover/social:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                   </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-all cursor-pointer text-white shadow-lg group/social">
                   <div className="text-slate-400 group-hover/social:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                   </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-600 transition-all cursor-pointer text-white shadow-lg group/social">
                   <div className="text-slate-400 group-hover/social:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                   </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[4px]">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/customer/rooms" className="hover:text-blue-400 transition-colors">Browse Rooms</Link></li>
                <li><Link to="/customer/my-bookings" className="hover:text-blue-400 transition-colors">Manage Bookings</Link></li>
                <li><Link to="/customer/product-service" className="hover:text-blue-400 transition-colors">Product Services</Link></li>
                <li><Link to="/customer/support" className="hover:text-blue-400 transition-colors">24/7 Support</Link></li>
              </ul>
            </div>


            {/* Support */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[4px]">Support</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link to="/customer/support" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link to="/customer/support" className="hover:text-blue-400 transition-colors">Booking Guide</Link></li>
                <li><Link to="/customer/support" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[4px]">Newsletter</h4>
              <p className="text-xs text-slate-400 font-bold mb-8 leading-loose uppercase tracking-widest">Join our member list for<br />exclusive early access deals.</p>
              <form className="relative flex">
                <input 
                  type="email" 
                  placeholder="Your lifestyle email" 
                  className="w-full bg-slate-800/50 backdrop-blur-md border border-slate-800 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-white placeholder:text-slate-600 shadow-inner"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <p>© 2026 LuxeStay Premium Hotel Experience. All rights reserved.</p>
            <div className="flex gap-10">
              <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
