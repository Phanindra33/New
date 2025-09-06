import React from 'react';
import { MapPin, Star } from 'lucide-react';

const ProfileSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150"
          alt="Alex Green"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alex Green</h2>
          <p className="text-gray-600">Passionate about sustainable living and finding great deals on second-hand treasures.</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Los Angeles, CA</span>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
              <span>4.8 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;