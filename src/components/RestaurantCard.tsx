import { Restaurant } from '../App';
import { MapPin, Star, Clock, Phone, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelect: () => void;
}

export function RestaurantCard({ restaurant, isSelected, onSelect }: RestaurantCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-orange-500';
    return 'bg-amber-500';
  };

  const getMatchScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 80) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? 'ring-2 ring-orange-500 shadow-lg scale-[1.02]'
          : 'border border-orange-100 hover:border-orange-300'
      }`}
    >
      {/* Restaurant Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Match Score Badge */}
        {restaurant.matchScore && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg">
            <TrendingUp className="size-3 text-green-600" />
            <span className={`text-xs ${restaurant.matchScore >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
              {restaurant.matchScore}% Match
            </span>
          </div>
        )}

        {/* Price Range */}
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-orange-900">
          {restaurant.priceRange}
        </div>

        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-orange-900">{restaurant.rating}</span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-3">
        <h3 className="text-orange-900 mb-1 line-clamp-1">{restaurant.name}</h3>
        
        <div className="flex items-center gap-1 text-xs text-orange-600 mb-2">
          <MapPin className="size-3" />
          <span>{restaurant.location}</span>
          <span className="text-orange-400">•</span>
          <span>{restaurant.distance} km</span>
        </div>

        <p className="text-sm text-orange-700 mb-3 line-clamp-2">{restaurant.description}</p>

        {/* Cuisine Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.cuisine.slice(0, 3).map(cuisine => (
            <Badge
              key={cuisine}
              variant="secondary"
              className="bg-orange-50 text-orange-700 text-xs capitalize"
            >
              {cuisine}
            </Badge>
          ))}
          {restaurant.cuisine.length > 3 && (
            <Badge variant="secondary" className="bg-orange-50 text-orange-700 text-xs">
              +{restaurant.cuisine.length - 3}
            </Badge>
          )}
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-orange-600 pt-2 border-t border-orange-100">
          <div className="flex items-center gap-1">
            <Clock className="size-3" />
            <span className="line-clamp-1">{restaurant.hours}</span>
          </div>
        </div>
      </div>

      {/* Match Score Indicator */}
      {restaurant.matchScore && (
        <div className="px-3 pb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-orange-700">{getMatchScoreLabel(restaurant.matchScore)}</span>
            <span className="text-orange-600">{restaurant.matchScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-orange-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${getMatchScoreColor(restaurant.matchScore)} transition-all duration-500`}
              style={{ width: `${restaurant.matchScore}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
