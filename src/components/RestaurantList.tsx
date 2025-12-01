import { Restaurant, SortOption } from "../App";
import { RestaurantCard } from "./RestaurantCard";
import { TrendingUp, SlidersHorizontal } from "lucide-react";

interface RestaurantListProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

export function RestaurantList({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
  sortBy,
  onSortChange,
}: RestaurantListProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-orange-900">Recommended</h2>
            <p className="text-sm text-orange-600">
              {restaurants.length} restaurant
              {restaurants.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-orange-200">
            <TrendingUp className="size-4 text-green-600" />
            <span className="text-sm text-orange-900">AI Sorted</span>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-orange-600" />
          <div className="flex gap-1 flex-wrap">
            <button
              onClick={() => onSortChange("match")}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                sortBy === "match"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              Best Match
            </button>
            <button
              onClick={() => onSortChange("rating")}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                sortBy === "rating"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              Rating
            </button>
            <button
              onClick={() => onSortChange("distance")}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                sortBy === "distance"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              Distance
            </button>
            <button
              onClick={() => onSortChange("price")}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                sortBy === "price"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
              }`}
            >
              Price
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-orange-400 mb-2">🍽️</div>
            <p className="text-orange-900 mb-1">No restaurants found</p>
            <p className="text-sm text-orange-600">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurant?.id === restaurant.id}
              onSelect={() => onRestaurantSelect(restaurant)}
            />
          ))
        )}
      </div>
    </div>
  );
}
