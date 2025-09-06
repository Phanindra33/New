export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  tags: string[];
  sellerId: string;
  sellerName: string;
  location: string;
  image: string;
  datePosted: string;
  views: number;
  likes: number;
  sold: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'Authentic vintage leather jacket from the 80s. Genuine leather with minimal wear. Perfect for casual outings.',
    price: 85,
    category: 'clothing',
    condition: 'good',
    tags: ['vintage', 'leather', 'jacket', 'fashion', 'retro'],
    sellerId: 'seller1',
    sellerName: 'Sarah Miller',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-15',
    views: 45,
    likes: 12,
    sold: false
  },
  {
    id: '2',
    title: 'MacBook Pro 2019 13-inch',
    description: 'Well-maintained MacBook Pro with 256GB SSD, 8GB RAM. Great for students and professionals. Includes charger.',
    price: 750,
    category: 'electronics',
    condition: 'excellent',
    tags: ['laptop', 'apple', 'macbook', 'computer', 'work'],
    sellerId: 'seller2',
    sellerName: 'Mike Chen',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-14',
    views: 89,
    likes: 23,
    sold: false
  },
  {
    id: '3',
    title: 'Wooden Coffee Table',
    description: 'Handcrafted oak coffee table with storage compartment. Perfect centerpiece for living room.',
    price: 120,
    category: 'furniture',
    condition: 'good',
    tags: ['furniture', 'table', 'wood', 'oak', 'living room'],
    sellerId: 'seller3',
    sellerName: 'Emma Johnson',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-13',
    views: 34,
    likes: 8,
    sold: false
  },
  {
    id: '4',
    title: 'Canon EOS Camera',
    description: 'Professional DSLR camera with 18-55mm lens. Excellent condition, barely used. Perfect for photography enthusiasts.',
    price: 450,
    category: 'electronics',
    condition: 'excellent',
    tags: ['camera', 'canon', 'photography', 'dslr', 'lens'],
    sellerId: 'seller4',
    sellerName: 'David Wilson',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-12',
    views: 67,
    likes: 18,
    sold: false
  },
  {
    id: '5',
    title: 'Yoga Mat Set',
    description: 'Premium yoga mat with carrying strap and blocks. Non-slip surface, perfect for home workouts.',
    price: 25,
    category: 'sports',
    condition: 'good',
    tags: ['yoga', 'fitness', 'exercise', 'mat', 'wellness'],
    sellerId: 'seller5',
    sellerName: 'Lisa Brown',
    location: 'Denver, CO',
    image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-11',
    views: 28,
    likes: 6,
    sold: false
  },
  {
    id: '6',
    title: 'Acoustic Guitar',
    description: 'Beautiful acoustic guitar with rich sound. Great for beginners and intermediate players. Includes case.',
    price: 180,
    category: 'music',
    condition: 'good',
    tags: ['guitar', 'music', 'acoustic', 'instrument', 'strings'],
    sellerId: 'seller6',
    sellerName: 'Alex Rodriguez',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-10',
    views: 52,
    likes: 14,
    sold: false
  },
  {
    id: '7',
    title: 'Designer Handbag',
    description: 'Authentic designer handbag in excellent condition. Timeless style with premium materials.',
    price: 200,
    category: 'accessories',
    condition: 'excellent',
    tags: ['handbag', 'designer', 'fashion', 'luxury', 'accessories'],
    sellerId: 'seller7',
    sellerName: 'Jennifer Lee',
    location: 'Miami, FL',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-09',
    views: 41,
    likes: 11,
    sold: false
  },
  {
    id: '8',
    title: 'Mountain Bike',
    description: 'Trek mountain bike with 21 speeds. Perfect for trail riding and outdoor adventures. Well maintained.',
    price: 320,
    category: 'sports',
    condition: 'good',
    tags: ['bike', 'mountain', 'cycling', 'outdoor', 'trek'],
    sellerId: 'seller8',
    sellerName: 'Tom Anderson',
    location: 'Boulder, CO',
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-08',
    views: 73,
    likes: 19,
    sold: false
  },
  {
    id: '9',
    title: 'Vintage Vinyl Records',
    description: 'Collection of classic rock vinyl records from the 70s and 80s. Great condition, perfect sound quality.',
    price: 95,
    category: 'music',
    condition: 'good',
    tags: ['vinyl', 'records', 'music', 'vintage', 'rock'],
    sellerId: 'seller9',
    sellerName: 'Robert Taylor',
    location: 'Nashville, TN',
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-07',
    views: 36,
    likes: 9,
    sold: false
  },
  {
    id: '10',
    title: 'Gaming Chair',
    description: 'Ergonomic gaming chair with lumbar support. Adjustable height and armrests. Perfect for long gaming sessions.',
    price: 150,
    category: 'furniture',
    condition: 'excellent',
    tags: ['chair', 'gaming', 'ergonomic', 'furniture', 'comfort'],
    sellerId: 'seller10',
    sellerName: 'Kevin Park',
    location: 'San Jose, CA',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-06',
    views: 58,
    likes: 15,
    sold: false
  },
  {
    id: '11',
    title: 'Kitchen Appliance Set',
    description: 'Complete kitchen appliance set including blender, toaster, and coffee maker. All in working condition.',
    price: 80,
    category: 'home',
    condition: 'good',
    tags: ['kitchen', 'appliances', 'home', 'cooking', 'blender'],
    sellerId: 'seller11',
    sellerName: 'Maria Garcia',
    location: 'Phoenix, AZ',
    image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-05',
    views: 42,
    likes: 10,
    sold: false
  },
  {
    id: '12',
    title: 'Art Supplies Bundle',
    description: 'Professional art supplies including paints, brushes, and canvases. Perfect for artists and students.',
    price: 60,
    category: 'art',
    condition: 'good',
    tags: ['art', 'supplies', 'painting', 'brushes', 'canvas'],
    sellerId: 'seller12',
    sellerName: 'Sophie White',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: '2024-01-04',
    views: 29,
    likes: 7,
    sold: false
  }
];

export const userInteractions = [
  { userId: 'user1', productId: '2', action: 'view', timestamp: '2024-01-15T10:30:00Z' },
  { userId: 'user1', productId: '4', action: 'like', timestamp: '2024-01-15T11:00:00Z' },
  { userId: 'user1', productId: '8', action: 'view', timestamp: '2024-01-15T12:00:00Z' },
  { userId: 'user2', productId: '1', action: 'view', timestamp: '2024-01-15T09:00:00Z' },
  { userId: 'user2', productId: '7', action: 'like', timestamp: '2024-01-15T09:30:00Z' },
  { userId: 'user3', productId: '3', action: 'view', timestamp: '2024-01-15T14:00:00Z' },
  { userId: 'user3', productId: '10', action: 'like', timestamp: '2024-01-15T14:30:00Z' },
];