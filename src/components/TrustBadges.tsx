import React from 'react';
import { Shield, Award, Users, Star } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      name: 'Verified Seller',
      icon: Shield,
      color: 'bg-blue-500',
      earned: true,
    },
    {
      name: 'Top Rated',
      icon: Star,
      color: 'bg-yellow-500',
      earned: true,
    },
    {
      name: 'Community Champion',
      icon: Users,
      color: 'bg-purple-500',
      earned: false,
    },
    {
      name: 'Expert Seller',
      icon: Award,
      color: 'bg-orange-500',
      earned: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust & Community Badges</h3>
      <div className="flex flex-wrap gap-3">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <div
              key={index}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
                badge.earned
                  ? `${badge.color} text-white`
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span>{badge.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustBadges;