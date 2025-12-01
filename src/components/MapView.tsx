import { Restaurant } from '../App';
import { MapPin, Navigation, Zap } from 'lucide-react';

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  searchQuery: string;
}

export function MapView({ restaurants, selectedRestaurant, onRestaurantSelect, searchQuery }: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
      {/* Map Background with Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(251, 146, 60)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* AI Algorithm Badge */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-orange-200">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="size-4 text-amber-500" />
          <span className="text-sm text-orange-900">Search Algorithm Active</span>
        </div>
        <div className="text-xs text-orange-600">Optimizing {restaurants.length} restaurant matches</div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button className="bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-orange-200 group">
          <Navigation className="size-5 text-orange-600 group-hover:text-orange-700" />
        </button>
        <div className="bg-white rounded-xl shadow-lg border border-orange-200 overflow-hidden">
          <button className="px-4 py-2 hover:bg-orange-50 border-b border-orange-100 transition-colors">
            <span className="text-orange-900">+</span>
          </button>
          <button className="px-4 py-2 hover:bg-orange-50 transition-colors">
            <span className="text-orange-900">−</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="absolute inset-0 flex items-center justify-center p-12">
        {/* Simulated Map Area */}
        <div className="relative w-full h-full max-w-5xl">
          {/* Location Markers */}
          {restaurants.map((restaurant, index) => {
            const isSelected = selectedRestaurant?.id === restaurant.id;
            // Distribute markers across the map area
            const positions = [
              { top: '25%', left: '30%' },
              { top: '35%', left: '45%' },
              { top: '45%', left: '25%' },
              { top: '28%', left: '65%' },
              { top: '52%', left: '38%' },
              { top: '40%', left: '55%' },
              { top: '65%', left: '70%' },
              { top: '58%', left: '48%' },
            ];
            const position = positions[index % positions.length];

            return (
              <div
                key={restaurant.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={position}
                onClick={() => onRestaurantSelect(restaurant)}
              >
                {/* Connection Line to Selected */}
                {isSelected && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 bg-orange-400/20 rounded-full animate-ping" />
                  </div>
                )}

                {/* Marker Pin */}
                <div
                  className={`relative transition-all ${
                    isSelected
                      ? 'scale-125 z-20'
                      : 'scale-100 hover:scale-110 z-10'
                  }`}
                >
                  <div
                    className={`${
                      isSelected
                        ? 'bg-gradient-to-br from-orange-500 to-amber-600'
                        : 'bg-gradient-to-br from-orange-400 to-amber-500 group-hover:from-orange-500 group-hover:to-amber-600'
                    } p-3 rounded-full shadow-lg transition-all`}
                  >
                    <MapPin className="size-5 text-white" />
                  </div>
                  
                  {/* Match Score Badge */}
                  {restaurant.matchScore && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-md">
                      {restaurant.matchScore}%
                    </div>
                  )}

                  {/* Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity pointer-events-none`}
                  >
                    <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-orange-200 whitespace-nowrap">
                      <div className="text-sm text-orange-900">{restaurant.name}</div>
                      <div className="text-xs text-orange-600">{restaurant.location}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs">⭐ {restaurant.rating}</span>
                        <span className="text-xs text-orange-400">•</span>
                        <span className="text-xs text-orange-600">{restaurant.priceRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Labels */}
          <div className="absolute top-8 left-12 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-orange-900">
            Laoag City Center
          </div>
          <div className="absolute bottom-20 right-16 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-orange-900">
            Pagudpud Beach Area
          </div>
          <div className="absolute top-1/2 left-8 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-orange-900">
            Batac Region
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-200">
        <div className="text-sm text-orange-900 mb-2">Match Score</div>
        <div className="flex items-center gap-4 text-xs text-orange-700">
          <div className="flex items-center gap-1">
            <div className="size-3 bg-green-500 rounded-full" />
            <span>90%+ Excellent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-3 bg-orange-400 rounded-full" />
            <span>80%+ Good</span>
          </div>
        </div>
      </div>
    </div>
  );
}