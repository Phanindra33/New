import React from 'react';
import { Brain, TrendingUp, Users, Target, BarChart3, Zap } from 'lucide-react';

interface MLInsightsProps {
  searchQuery?: string;
  totalResults: number;
  avgScore: number;
  topCategories: string[];
}

const MLInsights: React.FC<MLInsightsProps> = ({ 
  searchQuery, 
  totalResults, 
  avgScore, 
  topCategories 
}) => {
  const getInsightColor = (score: number) => {
    if (score > 0.8) return 'text-green-600 bg-green-50';
    if (score > 0.6) return 'text-blue-600 bg-blue-50';
    if (score > 0.4) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const insights = [
    {
      icon: Brain,
      title: 'AI Matching',
      value: `${Math.round(avgScore * 100)}%`,
      description: 'Average relevance score',
      color: getInsightColor(avgScore)
    },
    {
      icon: Target,
      title: 'Results Found',
      value: totalResults.toString(),
      description: 'Matching items',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: TrendingUp,
      title: 'Top Category',
      value: topCategories[0] || 'Mixed',
      description: 'Most relevant category',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      icon: Zap,
      title: 'Smart Filters',
      value: 'Active',
      description: 'ML-powered sorting',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">AI Search Insights</h3>
      </div>
      
      {searchQuery && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <span className="font-medium">Search Analysis:</span> Our ML model analyzed "{searchQuery}" 
            and found {totalResults} relevant items with an average match score of {Math.round(avgScore * 100)}%.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <div key={index} className={`p-4 rounded-lg ${insight.color}`}>
              <div className="flex items-center justify-between mb-2">
                <IconComponent className="h-5 w-5" />
                <span className="text-2xl font-bold">{insight.value}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{insight.title}</p>
                <p className="text-xs opacity-75">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-1" />
            <span>Powered by TensorFlow.js & Natural Language Processing</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Personalized recommendations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLInsights;