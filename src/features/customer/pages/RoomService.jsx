import React, { useState, useEffect } from 'react';
import { v1Service } from '../../../services/api';
import { ShoppingCart, Plus, Minus, Search, Coffee, Utensils, X, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/button/Button';
import Alert from '../../../components/ui/alert/Alert';
import { formatCurrency } from '../../../utils';

const RoomService = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await v1Service.getProducts();
        setItems(response.data?.data || response.data || []);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Could not load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category?.name === activeCategory);

  const categories = ['All', ...new Set(items.map(item => item.category?.name).filter(Boolean))];

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    try {
      // Logic for API call would go here
      alert('Order placed successfully! It will be delivered to your room shortly.');
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="animate-spin mb-2" size={48} />
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] gap-6">
      {/* Menu Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {error && <Alert type="error" className="mb-4">{error}</Alert>}

        {/* Header & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Room Service Menu</h1>
            <div className="bg-white p-2 rounded-lg border flex items-center gap-2 w-48 md:w-64">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6 pr-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="h-40 bg-gray-100 relative group">
                <img 
                  src={item.image || 'https://via.placeholder.com/400x300?text=Product'} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                  {item.category?.name === 'Drinks' ? <Coffee size={16} className="text-orange-500" /> : <Utensils size={16} className="text-green-500" />}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <span className="font-bold text-blue-600">{formatCurrency(item.price)}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{item.description || 'No description available.'}</p>
                <Button 
                  onClick={() => addToCart(item)}
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add to Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 w-80 md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60]
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0 md:shadow-none md:bg-transparent md:flex md:flex-col
      `}>
        <div className="bg-white rounded-2xl shadow-sm border h-full flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-blue-600" />
              <h2 className="font-bold text-gray-800">Your Order</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="md:hidden p-1 text-gray-500 hover:bg-gray-200 rounded-full"
            >
              <X size={20} />
            </button>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center space-y-2">
                <ShoppingCart size={48} className="opacity-20" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white border rounded-lg p-3">
                  <img src={item.image || 'https://via.placeholder.com/100x100?text=Item'} alt={item.name} className="w-12 h-12 rounded-md object-cover bg-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                    <p className="text-blue-600 font-bold text-sm">{formatCurrency(parseFloat(item.price) * item.quantity)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Service Fee (10%)</span>
                <span>{formatCurrency(cartTotal * 0.1)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(cartTotal * 1.1)}</span>
              </div>
            </div>
            <Button 
              disabled={cart.length === 0 || isOrdering}
              onClick={handlePlaceOrder}
              className="w-full"
            >
              {isOrdering ? <Loader2 className="animate-spin" size={20} /> : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomService;
