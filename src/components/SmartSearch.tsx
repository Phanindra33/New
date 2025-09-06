import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { RecommendationEngine } from '../ml/recommendationEngine';

interface SmartSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

export interface SearchFilters {
  category: string;
  priceRange: [number, number];
  condition: string[];
  location: string;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'newest' | 'popular';
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onSearch, placeholder = "Search for second-hand items..." }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    priceRange: [0, 1000],
    condition: [],
    location: '',
    sortBy: 'relevance'
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  const recommendationEngine = useRef(new RecommendationEngine());

  const categories = [
    'electronics', 'clothing', 'furniture', 'sports', 'music', 
    'accessories', 'home', 'art', 'books', 'toys'
  ];

  const conditions = ['excellent', 'good', 'fair', 'poor'];

  const searchSuggestions = [
    'laptop', 'guitar', 'vintage jacket', 'camera', 'furniture',
    'bike', 'books', 'gaming chair', 'kitchen appliances', 'art supplies'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = () => {
    onSearch(query, filters);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, filters);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    if (query) {
      onSearch(query, updatedFilters);
    }
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      category: '',
      priceRange: [0, 1000],
      condition: [],
      location: '',
      sortBy: 'relevance'
    };
    setFilters(defaultFilters);
    if (query) {
      onSearch(query, defaultFilters);
    }
  };

  const hasActiveFilters = filters.category || filters.condition.length > 0 || 
    filters.location || filters.priceRange[0] > 0 || filters.priceRange[1] < 1000;

  return (
    <div className="w-full max-w-4xl mx-auto" ref={searchRef}>
      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => query.length > 2 && setShowSuggestions(true)}
              placeholder={placeholder}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none rounded-l-lg"
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="flex items-center">
                      <Search className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center border-l border-gray-200">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 hover:bg-gray-50 transition-colors ${hasActiveFilters ? 'text-green-600' : 'text-gray-500'}`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <button
              onClick={handleSearch}
              className="p-3 bg-green-500 text-white hover:bg-green-600 transition-colors rounded-r-lg"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange({ 
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                  })}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <div className="space-y-2">
                {conditions.map(condition => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.condition.includes(condition)}
                      onChange={(e) => {
                        const newConditions = e.target.checked
                          ? [...filters.condition, condition]
                          : filters.condition.filter(c => c !== condition);
                        handleFilterChange({ condition: newConditions });
                      }}
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as SearchFilters['sortBy'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;