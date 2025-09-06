import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SmartSearch, { SearchFilters } from './components/SmartSearch';
import SearchResults from './components/SearchResults';
import RecommendationSection from './components/RecommendationSection';
import MLInsights from './components/MLInsights';
import { RecommendationEngine, RecommendationScore } from './ml/recommendationEngine';
import { TrendingUp, Sparkles, Clock } from 'lucide-react';

function App() {
  const [searchResults, setSearchResults] = useState<RecommendationScore[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [trendingItems, setTrendingItems] = useState<RecommendationScore[]>([]);
  const [recentItems, setRecentItems] = useState<RecommendationScore[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const recommendationEngine = useRef(new RecommendationEngine());
  const currentUserId = 'user1'; // In a real app, this would come from authentication

  useEffect(() => {
    // Load initial recommendations
    const userRecs = recommendationEngine.current.getRecommendationsForUser(currentUserId, 8);
    setRecommendations(userRecs);
    
    // Load trending items (popular items)
    const trending = recommendationEngine.current.searchAndRecommend('', undefined, 6)
      .sort((a, b) => (b.product.likes + b.product.views) - (a.product.likes + a.product.views));
    setTrendingItems(trending);
    
    // Load recent items
    const recent = recommendationEngine.current.searchAndRecommend('', undefined, 6)
      .sort((a, b) => new Date(b.product.datePosted).getTime() - new Date(a.product.datePosted).getTime());
    setRecentItems(recent);
  }, []);

  const handleSearch = (query: string, filters: SearchFilters) => {
    setIsSearching(true);
    setCurrentQuery(query);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      let results = recommendationEngine.current.searchAndRecommend(query, currentUserId, 20);
      
      // Apply filters
      if (filters.category) {
        results = results.filter(r => r.product.category === filters.category);
      }
      
      if (filters.condition.length > 0) {
        results = results.filter(r => filters.condition.includes(r.product.condition));
      }
      
      if (filters.location) {
        results = results.filter(r => 
          r.product.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      // Apply price range filter
      results = results.filter(r => 
        r.product.price >= filters.priceRange[0] && r.product.price <= filters.priceRange[1]
      );
      
      // Apply sorting
      switch (filters.sortBy) {
        case 'price_low':
          results.sort((a, b) => a.product.price - b.product.price);
          break;
        case 'price_high':
          results.sort((a, b) => b.product.price - a.product.price);
          break;
        case 'newest':
          results.sort((a, b) => 
            new Date(b.product.datePosted).getTime() - new Date(a.product.datePosted).getTime()
          );
          break;
        case 'popular':
          results.sort((a, b) => 
            (b.product.likes + b.product.views) - (a.product.likes + a.product.views)
          );
          break;
        default:
          // Keep relevance sorting (already sorted by score)
          break;
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
    // In a real app, this would navigate to product details
    // and record the interaction for ML learning
  };

  const handleLike = (productId: string) => {
    console.log('Product liked:', productId);
    // In a real app, this would update the like count
    // and record the interaction for ML learning
  };

  const calculateInsights = () => {
    if (searchResults.length === 0) {
      return {
        totalResults: 0,
        avgScore: 0,
        topCategories: []
      };
    }
    
    const avgScore = searchResults.reduce((sum, r) => sum + r.score, 0) / searchResults.length;
    const categoryCount = searchResults.reduce((acc, r) => {
      acc[r.product.category] = (acc[r.product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .map(([category]) => category);
    
    return {
      totalResults: searchResults.length,
      avgScore,
      topCategories
    };
  };

  const insights = calculateInsights();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Second-Hand Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing deals with our smart recommendation system
          </p>
          
          <SmartSearch onSearch={handleSearch} />
        </div>

        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">Analyzing and finding the best matches...</span>
          </div>
        )}

        {currentQuery && !isSearching && (
          <>
            <MLInsights
              searchQuery={currentQuery}
              totalResults={insights.totalResults}
              avgScore={insights.avgScore}
              topCategories={insights.topCategories}
            />
            <SearchResults
              results={searchResults}
              query={currentQuery}
              onProductClick={handleProductClick}
              onLike={handleLike}
            />
          </>
        )}

        {!currentQuery && !isSearching && (
          <div className="space-y-12">
            <RecommendationSection
              recommendations={recommendations}
              title="Recommended for You"
              icon={<Sparkles className="h-6 w-6 text-green-600 mr-2" />}
              onProductClick={handleProductClick}
              onLike={handleLike}
            />
            
            <RecommendationSection
              recommendations={trendingItems}
              title="Trending Now"
              icon={<TrendingUp className="h-6 w-6 text-blue-600 mr-2" />}
              onProductClick={handleProductClick}
              onLike={handleLike}
            />
            
            <RecommendationSection
              recommendations={recentItems}
              title="Recently Added"
              icon={<Clock className="h-6 w-6 text-purple-600 mr-2" />}
              onProductClick={handleProductClick}
              onLike={handleLike}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;