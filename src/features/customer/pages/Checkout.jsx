import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Shield, 
  ChevronRight,
  Info
} from 'lucide-react';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const summary = {
    room: "Deluxe Ocean Suite",
    hotel: "Seaside Resort & Spa",
    dates: "Oct 12 - Oct 15, 2023",
    nights: 3,
    guests: "2 Adults, 1 Child",
    nightlyRate: 250,
    taxes: 85.00,
    serviceCharge: 15.00,
    total: 850.00
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">
          <span>Search</span>
          <ChevronRight size={12} />
          <span>Selection</span>
          <ChevronRight size={12} />
          <span className="text-blue-600">Payment</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Payment Form */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
               <h2 className="text-2xl font-black text-gray-900 mb-8">Payment Method</h2>
               
               {/* Method Selector */}
               <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { id: 'card', icon: <CreditCard size={20} />, label: 'Card' },
                    { id: 'paypal', icon: <div className="font-black text-blue-900 italic">P</div>, label: 'PayPal' },
                    { id: 'apple', icon: <div className="font-bold">iOS</div>, label: 'Apple Pay' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border-2 transition-all ${
                        paymentMethod === method.id 
                          ? 'border-blue-600 bg-blue-50/30 text-blue-600 shadow-md shadow-blue-500/10' 
                          : 'border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {method.icon}
                      <span className="text-xs font-bold uppercase tracking-wider">{method.label}</span>
                    </button>
                  ))}
               </div>

               {/* Card Inputs */}
               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Cardholder Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <div className="absolute right-6 top-[42px] flex gap-1">
                       <div className="w-8 h-5 bg-red-500 rounded-sm opacity-20"></div>
                       <div className="w-8 h-5 bg-orange-400 rounded-sm"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">CVV</label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group pt-2">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-500 transition-all" />
                    <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">Save card for future bookings</span>
                  </label>
               </div>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center justify-center gap-12 pt-4 grayscale opacity-50">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={20} className="text-gray-400" />
                  Norton Secured
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Shield size={20} className="text-gray-400" />
                  PCI Compliant
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <Lock size={20} className="text-gray-400" />
                  256-Bit SSL
               </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-[450px] space-y-6">
            <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100">
               <div className="h-48 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" 
                    alt="Room" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                    <h3 className="text-xl font-black text-white">{summary.room}</h3>
                    <p className="text-sm text-white/70 font-medium">{summary.hotel}</p>
                  </div>
               </div>

               <div className="p-8">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-[2px] mb-6">Order Summary</h4>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                         <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dates</p>
                        <p className="text-sm font-black text-gray-800">{summary.dates}</p>
                        <p className="text-xs font-bold text-blue-600 mt-0.5">{summary.nights} Nights</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                         <Users size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Guests</p>
                        <p className="text-sm font-black text-gray-800">{summary.guests}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                      <span>Nightly rate (${summary.nightlyRate} × {summary.nights})</span>
                      <span className="text-gray-900">${(summary.nightlyRate * summary.nights).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                      <span>Taxes & Fees</span>
                      <span className="text-gray-900">${summary.taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                      <span>Service Charge</span>
                      <span className="text-gray-900">${summary.serviceCharge.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                     <div className="flex justify-between items-end mb-8">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Total Amount</p>
                           <p className="text-4xl font-black text-gray-900 tracking-tighter">${summary.total.toFixed(2)}</p>
                        </div>
                        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                           VAT Included
                        </div>
                     </div>

                     <button className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <Lock size={18} />
                        Pay Now ${summary.total.toFixed(2)}
                     </button>

                     <p className="text-[10px] text-center text-gray-400 font-bold mt-6 px-4">
                        By clicking 'Pay Now', you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Cancellation Policy</span>.
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100/50 flex gap-4">
               <Info className="text-blue-600 shrink-0" size={20} />
               <p className="text-[11px] font-bold text-blue-800 leading-relaxed italic">
                 "Your reservation is protected by our Best Price Guarantee. If you find a lower price elsewhere, we'll match it and give you an extra 10% discount."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
