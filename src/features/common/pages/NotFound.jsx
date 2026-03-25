import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Button from '../../../components/ui/button/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Header */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-blue-50/50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-600 p-4 rounded-2xl rotate-12 shadow-xl">
              <Search className="text-white" size={48} />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-4 mb-12 relative z-10 -mt-12 md:-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page not found
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            onClick={() => navigate(-1)} 
            variant="secondary"
            className="w-full sm:w-auto flex items-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full flex items-center gap-2">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Helpful Links/Footer */}
        <div className="pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="p-2 bg-gray-50 rounded-lg mb-2">
              <HelpCircle size={20} className="text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Help Center</span>
            <p className="text-xs text-gray-500">Find answers to FAQs</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 bg-gray-50 rounded-lg mb-2">
              <Search size={20} className="text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Search Site</span>
            <p className="text-xs text-gray-500">Find what you need</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 bg-gray-50 rounded-lg mb-2">
              <ArrowLeft size={20} className="text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-900">Status</span>
            <p className="text-xs text-gray-500">Check system status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
