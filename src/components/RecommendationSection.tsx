import React from 'react';
import { Sparkles, TrendingUp, Clock, Heart } from 'lucide-react';
import { RecommendationScore } from '../ml/recommendationEngine';

interface RecommendationSectionProps {
  recommendations: RecommendationScore[];
  title: string;
  icon?: React.ReactNode;
  onProductClick: (productId: string) => void;
  onLike: (productId: string) => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  recommendations,
  title,
  icon,
  onProductClick,
  onLike
}) => {
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        {icon || <Sparkles className="h-6 w-6 text-green-600 mr-2" />}
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map(({ product, score, reasons }) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(product.id);
                  }}
                  className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              {score > 0.8 && (
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-full flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Perfect Match
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold text-lg mb-2">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{product.location}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{new Date(product.datePosted).toLocaleDateString()}</span>
                </div>
              </div>
              
              {reasons.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                    {reasons[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;