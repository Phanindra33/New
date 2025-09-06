import React from 'react';
import { Search, Bell, MessageSquare, User, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-green-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-green-200 transition-colors">Home</a>
              <a href="#" className="hover:text-green-200 transition-colors">Buy</a>
              <a href="#" className="hover:text-green-200 transition-colors">Sell</a>
              <a href="#" className="hover:text-green-200 transition-colors">My Items</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-green-400 placeholder-green-100 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:bg-green-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-green-100" />
            </div>
            <button className="p-2 hover:bg-green-600 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-green-600 rounded-lg transition-colors">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-green-600 rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;