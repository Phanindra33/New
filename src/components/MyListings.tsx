import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const MyListings = () => {
  const listings = [
    {
      id: 1,
      title: 'Vintage Woven Rugs',
      price: '$26.00',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Bamboo Water Bottle',
      price: '$12.00',
      image: 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Biology Textbook Used',
      price: '$13.00',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Sold',
    },
    {
      id: 4,
      title: 'Denim Jacket',
      price: '$70.00',
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Active',
    },
    {
      id: 5,
      title: 'Ergonomic Desk Chair',
      price: '$65.00',
      image: 'https://images.pexels.com/photos/586237/pexels-photo-586237.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Sold',
    },
    {
      id: 6,
      title: 'Perfect Succulent',
      price: '$15.00',
      image: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'Sold',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">My Listings</h3>
        <button className="text-green-600 hover:text-green-800 font-medium">List New Item</button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  listing.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {listing.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{listing.title}</h4>
                  <p className="text-lg font-semibold text-green-600">{listing.price}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <button className="w-full mt-3 text-sm text-green-600 hover:text-green-800 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-green-600 hover:text-green-800 font-medium">View All Listings</button>
      </div>
    </div>
  );
};

export default MyListings;