import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  Search, 
  Utensils, 
  Package, 
  Wind, 
  Sparkles, 
  Bell, 
  ShoppingCart,
  X,
  Settings,
  HelpCircle,
  ExternalLink,
  Clock
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../data/mock';

const ProductService = () => {
  const [activeMainCategory, setActiveMainCategory] = useState('In-Room Dining');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Main navigation categories
  const mainCategories = [
    { id: 'In-Room Dining', icon: <Utensils size={18} /> },
    { id: 'Amenities', icon: <Package size={18} /> },
    { id: 'Housekeeping', icon: <Wind size={18} /> },
    { id: 'Wellness', icon: <Sparkles size={18} /> },
    { id: 'Concierge', icon: <Bell size={18} /> },
  ];

  // Sub-categories for In-Room Dining
  const subCategories = ['All', 'Snacks & Drinks', 'Toiletries', 'Bedding', 'Amenities'];

  const filteredItems = useMemo(() => {
    return MOCK_PRODUCTS.filter(item => {
      // If we are in "In-Room Dining" (Default), use the sub-category filter
      if (activeMainCategory === 'In-Room Dining') {
        if (activeSubCategory === 'All') return ['Snacks & Drinks', 'Toiletries', 'Bedding', 'Amenities'].includes(item.category);
        return item.category === activeSubCategory;
      }
      
      // Otherwise, just match the main category
      return item.category === activeMainCategory;
    });
  }, [activeMainCategory, activeSubCategory]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = subtotal > 0 ? 4.50 : 0;
  const total = subtotal + serviceFee;

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-100px)] bg-white overflow-hidden lg:rounded-[40px] shadow-2xl lg:border lg:border-gray-100 lg:m-4 relative">
      
      {/* 1. Desktop Category Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex w-64 bg-[#F8F9FB] border-r border-gray-100 flex-col p-6">
        <div className="mb-10 pl-2">
           <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Midnight Concierge</h2>
        </div>

        <nav className="flex-1 space-y-2">
           {mainCategories.map((cat) => (
             <button
                key={cat.id}
                onClick={() => setActiveMainCategory(cat.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-bold transition-all ${
                  activeMainCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'
                }`}
             >
                {cat.icon}
                {cat.id}
             </button>
           ))}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-gray-200">
           <button className="w-full flex items-center gap-4 px-5 py-3 text-gray-400 hover:text-gray-900 transition-colors text-sm font-bold">
              <Settings size={18} />
              Settings
           </button>
           <button 
             onClick={() => setIsCartOpen(true)}
             className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20"
           >
              View Cart {cart.length > 0 && `(${cart.length})`}
           </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
        
        {/* Mobile Navbar / Category Scroll */}
        <div className="lg:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-40">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Midnight Concierge</h2>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-blue-50 text-blue-600 rounded-xl"
              >
                 <ShoppingCart size={20} />
                 {cart.length > 0 && (
                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                      {cart.length}
                   </span>
                 )}
              </button>
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {mainCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveMainCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeMainCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {cat.id}
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 flex flex-col p-6 lg:p-10 overflow-y-auto no-scrollbar">
          <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
             <div>
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-2">{activeMainCategory}</h1>
                <p className="text-gray-500 font-medium text-sm lg:text-base">Luxury essentials delivered to your suite in 20 mins.</p>
             </div>
             
             <div className="relative group w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search suite essentials..." 
                  className="pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
             </div>
          </header>

          {/* Sub-Filters */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-6">
             {activeMainCategory === 'In-Room Dining' && subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                    activeSubCategory === sub 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {sub}
                </button>
             ))}
             {activeMainCategory !== 'In-Room Dining' && (
                <div className="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-2 border-blue-100 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                   {activeMainCategory} Special Services
                </div>
             )}
          </div>

          {/* Product Grid - Adjusted Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-10">
             {filteredItems.map((product) => (
               <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col">
                  <div className="h-48 lg:h-56 relative overflow-hidden bg-gray-50">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     {product.tag && (
                       <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-sm">
                          {product.tag}
                       </div>
                     )}
                  </div>
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                     <h3 className="text-lg lg:text-xl font-black text-gray-900 mb-2">{product.name}</h3>
                     <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6 flex-1 line-clamp-2">{product.description}</p>
                     
                     <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-auto">
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">${product.price.toFixed(2)}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all"
                        >
                           <Plus size={20} />
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* 3. Responsive Suite Cart Overlay */}
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}>
           <aside 
             className={`absolute top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
             onClick={e => e.stopPropagation()}
           >
              <header className="p-8 pb-6 flex justify-between items-center border-b border-gray-50">
                 <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Suite Cart</h2>
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-lg">{cart.length}</span>
                 </div>
                 <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                    <X size={24} className="text-gray-400" />
                 </button>
              </header>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                       <ShoppingCart size={80} className="mb-4" />
                       <p className="font-black text-xl">EMPTY CART</p>
                    </div>
                 ) : (
                    cart.map((item) => (
                       <div key={item.id} className="flex gap-5 items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                          <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shrink-0" alt="Item" />
                          <div className="flex-1">
                             <h4 className="text-sm font-black text-gray-900 mb-2 truncate">{item.name}</h4>
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 bg-white border border-gray-100 px-2 py-1.5 rounded-xl">
                                   <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-blue-600 transition-colors"><Minus size={14}/></button>
                                   <span className="text-xs font-black min-w-4 text-center">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-blue-600 transition-colors"><Plus size={14}/></button>
                                </div>
                                <span className="text-sm font-black text-blue-600">${(item.price * item.quantity).toFixed(2)}</span>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>

              <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
                 <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
                       <span>Service Fee</span>
                       <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                       <span className="text-xl font-black text-gray-900">Total</span>
                       <span className="text-3xl font-black text-blue-600 tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                 </div>

                 <button className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
                    Place Order Now
                 </button>
                 <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Clock size={14} /> 20 MIN DELIVERY
                 </div>
              </div>
           </aside>
        </div>
      </main>
    </div>
  );
};

export default ProductService;
