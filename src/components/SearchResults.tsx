import React from 'react';
import { Heart, Eye, MapPin, Clock } from 'lucide-react';
import { RecommendationScore } from '../ml/recommendationEngine';

interface SearchResultsProps {
  results: RecommendationScore[];
  query: string;
  onProductClick: (productId: string) => void;
  onLike: (productId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, onProductClick, onLike }) => {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600">Try adjusting your search terms or browse our categories</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {query ? `Search results for "${query}"` : 'Recommended for you'}
        </h2>
        <span className="text-gray-600">{results.length} items found</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(({ product, score, reasons }) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(product.condition)}`}>
                  {product.condition}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(product.id);
                  }}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              {score > 0.7 && (
                <div className="absolute bottom-3 left-3">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                    Top Match
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>
                <span className="text-xl font-bold text-green-600 ml-2">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatDate(product.datePosted)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3 text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{product.views}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{product.likes}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  by {product.sellerName}
                </span>
              </div>
              
              {reasons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1">
                    {reasons.slice(0, 2).map((reason, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;