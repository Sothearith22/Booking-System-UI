import React from 'react';
import { 
  Headphones, 
  Mail, 
  Phone, 
  MapPin, 
  Search, 
  LayoutDashboard, 
  Ticket, 
  BookOpen, 
  Settings,
  ArrowRight,
  Send,
  Map as MapIcon
} from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Contact Support</h1>
          <p className="text-gray-500 max-w-2xl font-bold leading-relaxed text-lg">
            Experience concierge-level support. Our dedicated team is available 24/7 to ensure your luxury stay is perfect in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar: Support Navigation & Channels */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Nav */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
               <div className="space-y-1">
                  {[
                    { icon: <LayoutDashboard size={18} />, label: 'Support Dashboard', active: false },
                    { icon: <Ticket size={18} />, label: 'New Ticket', active: true },
                    { icon: <BookOpen size={18} />, label: 'Knowledge Base', active: false },
                    { icon: <Settings size={18} />, label: 'Settings', active: false }
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                        item.active 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* Support Channels */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 pl-4 mb-4">Alternative Channels</h3>
               
               <div className="group bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 font-urbanist">Call Us</h4>
                    <p className="text-sm font-black text-blue-600">+1 (888) LUXE-STAY</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">24/7 Priority Line</p>
                  </div>
               </div>

               <div className="group bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 font-urbanist">Email</h4>
                    <p className="text-sm font-black text-blue-600">concierge@luxestay.com</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Avg response: 15 mins</p>
                  </div>
               </div>

               <div className="group bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 font-urbanist">HQ Office</h4>
                    <p className="text-sm font-black text-gray-700">725 5th Avenue, New York</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">NY 10022, United States</p>
                  </div>
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative group overflow-hidden rounded-[32px] h-48 bg-gray-200 border border-gray-100">
               <div className="absolute inset-0 flex items-center justify-center">
                  <MapIcon size={48} className="text-gray-400 opacity-20" />
               </div>
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-2xl text-xs font-black shadow-xl">View on Map</button>
               </div>
            </div>
          </div>

          {/* Right Content: Ticket Form */}
          <div className="lg:col-span-8 bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12 self-start">
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-4">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-4">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="johndoe@example.com" 
                      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-4">Subject</label>
                  <select className="appearance-none w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900">
                     <option>Select a category</option>
                     <option>Booking Modification</option>
                     <option>Cancellation & Refund</option>
                     <option>Payment Issue</option>
                     <option>Property Amenities Query</option>
                     <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-4">Message</label>
                  <textarea 
                    rows="6" 
                    placeholder="How can our concierge assist you today?" 
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between gap-6 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">Mark as urgent (Check-in within 24 hours)</span>
                    </label>
                    <button className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <Send size={18} />
                        Send Message
                    </button>
                </div>

                <div className="pt-10 border-t border-gray-50">
                   <p className="text-[10px] text-center text-gray-400 font-bold px-4">
                      By submitting this form, you agree to our <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service</span>.
                   </p>
                </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
