import React from 'react';
import { Calendar, Package } from 'lucide-react';

const PurchaseHistory = () => {
  const purchases = [
    {
      id: 1,
      item: 'Graphic Design Workbook',
      seller: 'Sarah Miller',
      price: '$19.99',
      date: 'Recent',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 2,
      item: 'Hand-Knitted Wool Scarf',
      seller: 'Emma Johnson',
      price: '$22.00',
      date: 'Recent',
      image: 'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: 3,
      item: 'Gold Phone Charger',
      seller: 'Mike Chen',
      price: '$15.00',
      date: 'Recent',
      image: 'https://images.pexels.com/photos/163143/iphone-charger-technology-phone-163143.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Purchase History</h3>
      <p className="text-gray-600 mb-6">Keep track of items you've purchased from other sellers.</p>
      
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <img
              src={purchase.image}
              alt={purchase.item}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{purchase.item}</h4>
              <p className="text-sm text-gray-600">Sold by {purchase.seller}</p>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{purchase.date}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{purchase.price}</p>
              <button className="text-sm text-green-600 hover:text-green-800">
                View Order
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-green-600 hover:text-green-800 font-medium">View All Purchases</button>
      </div>
    </div>
  );
};

export default PurchaseHistory;