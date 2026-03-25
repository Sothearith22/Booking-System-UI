import React from 'react';
import { 
  Palmtree, 
  Mountain, 
  Building2, 
  Castle, 
  Waves, 
  Compass,
  ArrowRight,
  Star,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ROOMS } from '../../../data/mock';

const ExploreCategories = () => {
  const navigate = useNavigate();

  const collections = [
    { 
      id: 'luxury', 
      title: 'Luxury Collection', 
      description: 'The world\'s most exclusive suites and royal villas.', 
      icon: <Star size={24} />, 
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
      count: 12
    },
    { 
      id: 'beachfront', 
      title: 'Beachfront Paradise', 
      description: 'Crystal clear waters just steps away from your bed.', 
      icon: <Waves size={24} />, 
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800',
      count: 8
    },
    { 
      id: 'urban', 
      title: 'Urban Penthouses', 
      description: 'Breathtaking city skylines in the heart of the world\'s capitals.', 
      icon: <Building2 size={24} />, 
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800',
      count: 15
    },
    { 
      id: 'mountain', 
      title: 'Mountain Escapes', 
      description: 'Cozy lodges with fireplaces and majestic mountain views.', 
      icon: <Mountain size={24} />, 
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
      count: 6
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Hero Section */}
      <div className="bg-slate-900 h-[400px] relative flex items-center justify-center overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600" 
           className="absolute inset-0 w-full h-full object-cover opacity-60" 
           alt="Banner" 
         />
         <div className="relative text-center max-w-3xl px-6">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-5 py-2 rounded-full text-blue-400 text-xs font-black uppercase tracking-[3px] mb-8">
               <Compass size={14} />
               Explore Collections
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">Find your next <span className="text-blue-500">lifestyle.</span></h1>
            <p className="text-white/70 text-lg font-bold">Curated selections of the finest properties categorized for your unique taste.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        
        {/* Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {collections.map((col) => (
             <div 
               key={col.id}
               className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
             >
                <div className="h-48 relative overflow-hidden">
                   <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {col.icon}
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                   <h3 className="text-xl font-black text-gray-900 mb-3">{col.title}</h3>
                   <p className="text-xs text-gray-500 font-bold leading-relaxed mb-6 flex-1">{col.description}</p>
                   <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{col.count} Stays Found</span>
                      <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <ArrowRight size={14} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Featured by Category Section */}
        <section className="space-y-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <h2 className="text-3xl font-black text-gray-900 tracking-tight lowercase first-letter:uppercase mb-2">Editor's Choice</h2>
                 <p className="text-gray-500 font-bold">Hand-picked luxurious stays from our top categories.</p>
              </div>
              <button className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                 View All Categories <ArrowRight size={16} />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {MOCK_ROOMS.slice(0, 3).map((room) => (
                <div key={room.id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">
                   <div className="h-64 relative overflow-hidden">
                      <img src={room.image} alt={room.room_type} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                         <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-xl">
                            {room.room_type.split(' ')[0]} Specialist
                         </div>
                         {room.tag && (
                           <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                              {room.tag}
                           </div>
                         )}
                      </div>
                      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                         <div className="flex items-center gap-1 text-orange-500">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-black font-urbanist">{room.rating}</span>
                         </div>
                      </div>
                   </div>
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-black text-gray-900">{room.room_type}</h4>
                        <div className="text-right">
                           <span className="text-2xl font-black text-gray-900 tracking-tighter">${room.price_per_night}</span>
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">/ Night</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 font-bold text-xs tracking-wide mb-8">
                         <Compass size={14} className="text-blue-500" />
                         {room.location}
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                               <Users size={14} className="text-blue-500" />
                               2 Guests
                            </div>
                         </div>
                         <button 
                           onClick={() => navigate(`/customer/hotels/${room.id}`)}
                           className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                         >
                            Book Stay
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Categories Grid List */}
        <section className="mt-24 pt-24 border-t border-gray-100">
           <h3 className="text-sm font-black text-gray-400 uppercase tracking-[4px] text-center mb-12">Search by Property Type</h3>
           <div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {['Villas', 'Suites', 'Apartments', 'Resorts', 'Lodges', 'Penthouses', 'Cabins'].map((type) => (
                <button key={type} className="text-lg font-black text-gray-800 hover:text-blue-600 transition-colors uppercase tracking-widest">
                   {type}
                </button>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ExploreCategories;
