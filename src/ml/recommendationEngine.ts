import { Product, products, userInteractions } from '../data/products';
import { stemmer } from 'natural';
import Fuse from 'fuse.js';

export interface RecommendationScore {
  product: Product;
  score: number;
  reasons: string[];
}

export class RecommendationEngine {
  private products: Product[];
  private fuse: Fuse<Product>;
  private userPreferences: Map<string, Map<string, number>>;

  constructor() {
    this.products = products;
    this.userPreferences = new Map();
    this.initializeFuse();
    this.buildUserPreferences();
  }

  private initializeFuse() {
    const options = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.3 },
        { name: 'category', weight: 0.2 }
      ],
      threshold: 0.4,
      includeScore: true
    };
    this.fuse = new Fuse(this.products, options);
  }

  private buildUserPreferences() {
    userInteractions.forEach(interaction => {
      if (!this.userPreferences.has(interaction.userId)) {
        this.userPreferences.set(interaction.userId, new Map());
      }
      
      const userPrefs = this.userPreferences.get(interaction.userId)!;
      const product = this.products.find(p => p.id === interaction.productId);
      
      if (product) {
        const weight = interaction.action === 'like' ? 2 : 1;
        
        // Category preference
        const currentCategoryScore = userPrefs.get(`category_${product.category}`) || 0;
        userPrefs.set(`category_${product.category}`, currentCategoryScore + weight);
        
        // Tag preferences
        product.tags.forEach(tag => {
          const currentTagScore = userPrefs.get(`tag_${tag}`) || 0;
          userPrefs.set(`tag_${tag}`, currentTagScore + weight);
        });
        
        // Price range preference
        const priceRange = this.getPriceRange(product.price);
        const currentPriceScore = userPrefs.get(`price_${priceRange}`) || 0;
        userPrefs.set(`price_${priceRange}`, currentPriceScore + weight);
      }
    });
  }

  private getPriceRange(price: number): string {
    if (price < 50) return 'low';
    if (price < 200) return 'medium';
    if (price < 500) return 'high';
    return 'premium';
  }

  private calculateContentSimilarity(query: string, product: Product): number {
    const queryTerms = query.toLowerCase().split(' ').map(term => stemmer.stem(term));
    const productText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
    const productTerms = productText.split(' ').map(term => stemmer.stem(term));
    
    let matches = 0;
    queryTerms.forEach(queryTerm => {
      if (productTerms.some(productTerm => productTerm.includes(queryTerm) || queryTerm.includes(productTerm))) {
        matches++;
      }
    });
    
    return matches / queryTerms.length;
  }

  private calculateUserPreferenceScore(userId: string, product: Product): number {
    const userPrefs = this.userPreferences.get(userId);
    if (!userPrefs) return 0;
    
    let score = 0;
    
    // Category preference
    const categoryScore = userPrefs.get(`category_${product.category}`) || 0;
    score += categoryScore * 0.3;
    
    // Tag preferences
    product.tags.forEach(tag => {
      const tagScore = userPrefs.get(`tag_${tag}`) || 0;
      score += tagScore * 0.2;
    });
    
    // Price range preference
    const priceRange = this.getPriceRange(product.price);
    const priceScore = userPrefs.get(`price_${priceRange}`) || 0;
    score += priceScore * 0.1;
    
    return score;
  }

  private calculatePopularityScore(product: Product): number {
    const viewWeight = 0.1;
    const likeWeight = 0.3;
    return (product.views * viewWeight + product.likes * likeWeight) / 100;
  }

  private calculateFreshnessScore(product: Product): number {
    const daysSincePosted = (Date.now() - new Date(product.datePosted).getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, 1 - daysSincePosted / 30); // Decay over 30 days
  }

  public searchAndRecommend(query: string, userId?: string, limit: number = 10): RecommendationScore[] {
    const searchResults = this.fuse.search(query);
    const recommendations: RecommendationScore[] = [];
    
    // Process search results
    searchResults.forEach(result => {
      if (result.item.sold) return;
      
      const product = result.item;
      const reasons: string[] = [];
      let totalScore = 0;
      
      // Search relevance score (inverted because Fuse returns lower scores for better matches)
      const searchScore = 1 - (result.score || 0);
      totalScore += searchScore * 0.4;
      if (searchScore > 0.6) reasons.push('Matches your search');
      
      // Content similarity
      const contentScore = this.calculateContentSimilarity(query, product);
      totalScore += contentScore * 0.2;
      if (contentScore > 0.5) reasons.push('Similar content');
      
      // User preference score
      if (userId) {
        const userScore = this.calculateUserPreferenceScore(userId, product);
        totalScore += userScore * 0.2;
        if (userScore > 2) reasons.push('Based on your interests');
      }
      
      // Popularity score
      const popularityScore = this.calculatePopularityScore(product);
      totalScore += popularityScore * 0.1;
      if (product.likes > 10) reasons.push('Popular item');
      
      // Freshness score
      const freshnessScore = this.calculateFreshnessScore(product);
      totalScore += freshnessScore * 0.1;
      if (freshnessScore > 0.8) reasons.push('Recently posted');
      
      recommendations.push({
        product,
        score: totalScore,
        reasons
      });
    });
    
    // Add products not in search results but might be relevant based on user preferences
    if (userId && recommendations.length < limit) {
      const searchedIds = new Set(recommendations.map(r => r.product.id));
      
      this.products
        .filter(p => !p.sold && !searchedIds.has(p.id))
        .forEach(product => {
          const userScore = this.calculateUserPreferenceScore(userId, product);
          if (userScore > 1) {
            const reasons: string[] = ['Recommended for you'];
            const popularityScore = this.calculatePopularityScore(product);
            const freshnessScore = this.calculateFreshnessScore(product);
            
            const totalScore = userScore * 0.6 + popularityScore * 0.2 + freshnessScore * 0.2;
            
            if (popularityScore > 0.5) reasons.push('Popular item');
            if (freshnessScore > 0.8) reasons.push('Recently posted');
            
            recommendations.push({
              product,
              score: totalScore,
              reasons
            });
          }
        });
    }
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  public getRecommendationsForUser(userId: string, limit: number = 6): RecommendationScore[] {
    const userPrefs = this.userPreferences.get(userId);
    if (!userPrefs) {
      // Return popular items for new users
      return this.products
        .filter(p => !p.sold)
        .map(product => ({
          product,
          score: this.calculatePopularityScore(product),
          reasons: ['Popular item']
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    }
    
    const recommendations: RecommendationScore[] = [];
    
    this.products
      .filter(p => !p.sold)
      .forEach(product => {
        const userScore = this.calculateUserPreferenceScore(userId, product);
        const popularityScore = this.calculatePopularityScore(product);
        const freshnessScore = this.calculateFreshnessScore(product);
        
        const totalScore = userScore * 0.5 + popularityScore * 0.3 + freshnessScore * 0.2;
        const reasons: string[] = [];
        
        if (userScore > 2) reasons.push('Based on your interests');
        if (popularityScore > 0.5) reasons.push('Popular item');
        if (freshnessScore > 0.8) reasons.push('Recently posted');
        if (reasons.length === 0) reasons.push('You might like this');
        
        recommendations.push({
          product,
          score: totalScore,
          reasons
        });
      });
    
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}