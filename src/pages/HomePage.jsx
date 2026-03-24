import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  const [userName] = useState('Traveler')
  const [isScrolled, setIsScrolled] = useState(false)

  // Demo destinations for our booking system
  const destinations = [
    { id: 1, title: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$899', rating: 4.8 },
    { id: 2, title: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1200', rating: 4.9 },
    { id: 3, title: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1050', rating: 4.7 },
    { id: 4, title: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1531366936337-77b5d15ca941?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', price: '$1400', rating: 4.9 },
  ]

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token')
    if (!token) {
      // In a real app we might redirect if protected:
      // navigate('/login')
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>Wanderlux</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Destinations</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Bookings</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 mr-2">
               <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                 {userName.charAt(0)}
               </div>
               <span className="text-sm font-medium text-gray-700">Hey, {userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-indigo-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-indigo-50/40 -z-10"></div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-200/40 to-teal-200/40 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Discover Your Next <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Extraordinary Adventure</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Book flights, hotels, and exclusive experiences globally with just a few taps. Unforgettable memories await.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full shadow-xl shadow-indigo-100/50 p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between border border-gray-100">
             <div className="flex-1 w-full md:w-auto px-4 py-2 md:border-r border-gray-100 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="text" placeholder="Where are you going?" className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-0" />
             </div>
             
             <div className="flex-1 w-full md:w-auto px-4 py-2 md:border-r border-gray-100 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" placeholder="Check in - Check out" className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-0" />
             </div>

             <div className="flex-1 w-full md:w-auto px-4 py-2 flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <input type="text" placeholder="2 Guests, 1 Room" className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-0" />
             </div>

             <button className="w-full md:w-auto py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-full font-medium transition-all shadow-md shadow-indigo-200 mt-2 md:mt-0 ml-0 md:ml-4">
               Search
             </button>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Trending Destinations</h2>
            <p className="mt-1 text-gray-500">Most popular choices for your next trip</p>
          </div>
          <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors hidden sm:block">View all →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {dest.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{dest.title}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">3 days, 2 nights</span>
                  <span className="font-bold text-indigo-600">{dest.price} <span className="text-xs text-gray-400 font-normal">/person</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default HomePage
