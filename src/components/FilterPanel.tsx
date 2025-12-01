import { Filters } from "../App";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Filter, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  resultCount: number;
}

const cuisineTypes = [
  { id: "bagnet", label: "Bagnet", icon: "🥓" },
  { id: "pinakbet", label: "Pinakbet", icon: "🥗" },
  { id: "empanada", label: "Empanada", icon: "🥟" },
  { id: "longganisa", label: "Longganisa", icon: "🌭" },
  { id: "dinardaraan", label: "Dinardaraan", icon: "🍲" },
  { id: "igado", label: "Igado", icon: "🍖" },
  { id: "poqui-poqui", label: "Poqui-Poqui", icon: "🍆" },
  { id: "sinanglao", label: "Sinanglao", icon: "🍜" },
];

const priceRanges = [
  { id: "$", label: "Budget (₱)", description: "₱50-150" },
  { id: "$$", label: "Moderate (₱₱)", description: "₱150-300" },
  { id: "$$$", label: "Fine Dining (₱₱₱)", description: "₱300+" },
];

const locations = [
  "Laoag City",
  "Batac",
  "Paoay",
  "Pagudpud",
  "Sarrat",
  "Burgos",
  "Bangui",
];

export function FilterPanel({
  filters,
  onFiltersChange,
  resultCount,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    cuisine: true,
    price: true,
    location: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCuisine = (cuisineId: string) => {
    const newCuisine = filters.cuisine.includes(cuisineId)
      ? filters.cuisine.filter((c) => c !== cuisineId)
      : [...filters.cuisine, cuisineId];
    onFiltersChange({ ...filters, cuisine: newCuisine });
  };

  const togglePriceRange = (priceId: string) => {
    const newPrice = filters.priceRange.includes(priceId)
      ? filters.priceRange.filter((p) => p !== priceId)
      : [...filters.priceRange, priceId];
    onFiltersChange({ ...filters, priceRange: newPrice });
  };

  const clearFilters = () => {
    onFiltersChange({
      cuisine: [],
      priceRange: [],
      location: "",
      maxDistance: 50,
      minRating: 0,
    });
  };

  const hasActiveFilters =
    filters.cuisine.length > 0 ||
    filters.priceRange.length > 0 ||
    filters.location !== "" ||
    filters.minRating > 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="size-5 text-orange-600" />
          <h2 className="text-orange-900">Smart Filters</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-amber-500" />
          <span className="text-orange-600">Rule-based matching engine</span>
        </div>
      </div>

      {/* Results Counter */}
      <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200">
        <div className="text-sm text-orange-700 mb-1">Matching Restaurants</div>
        <div className="text-orange-900">{resultCount} Results Found</div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="mt-2 text-sm text-orange-600 hover:text-orange-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Cuisine Types */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("cuisine")}
          className="flex items-center justify-between w-full"
        >
          <h3 className="text-orange-900">Cuisine Type</h3>
          <ChevronDown
            className={`size-4 text-orange-600 transition-transform ${
              expandedSections.cuisine ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.cuisine && (
          <div className="space-y-2">
            {cuisineTypes.map((cuisine) => (
              <div
                key={cuisine.id}
                className="flex items-center space-x-3 group"
              >
                <Checkbox
                  id={cuisine.id}
                  checked={filters.cuisine.includes(cuisine.id)}
                  onCheckedChange={() => toggleCuisine(cuisine.id)}
                  className="border-orange-300"
                />
                <Label
                  htmlFor={cuisine.id}
                  className="flex items-center gap-2 cursor-pointer group-hover:text-orange-700 transition-colors"
                >
                  <span>{cuisine.icon}</span>
                  <span className="text-sm">{cuisine.label}</span>
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-orange-100">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full"
        >
          <h3 className="text-orange-900">Price Range</h3>
          <ChevronDown
            className={`size-4 text-orange-600 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((price) => (
              <div key={price.id} className="flex items-center space-x-3 group">
                <Checkbox
                  id={price.id}
                  checked={filters.priceRange.includes(price.id)}
                  onCheckedChange={() => togglePriceRange(price.id)}
                  className="border-orange-300"
                />
                <Label
                  htmlFor={price.id}
                  className="cursor-pointer flex-1 group-hover:text-orange-700"
                >
                  <div className="text-sm">{price.label}</div>
                  <div className="text-xs text-orange-500">
                    {price.description}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="space-y-3 pt-4 border-t border-orange-100">
        <button
          onClick={() => toggleSection("location")}
          className="flex items-center justify-between w-full"
        >
          <h3 className="text-orange-900">Location</h3>
          <ChevronDown
            className={`size-4 text-orange-600 transition-transform ${
              expandedSections.location ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.location && (
          <div className="space-y-2">
            <select
              value={filters.location}
              onChange={(e) =>
                onFiltersChange({ ...filters, location: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <div className="pt-2">
              <Label className="text-sm text-orange-700 mb-2 block">
                Max Distance: {filters.maxDistance} km
              </Label>
              <Slider
                value={[filters.maxDistance]}
                onValueChange={([value]) =>
                  onFiltersChange({ ...filters, maxDistance: value })
                }
                max={50}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-3 pt-4 border-t border-orange-100">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full"
        >
          <h3 className="text-orange-900">Minimum Rating</h3>
          <ChevronDown
            className={`size-4 text-orange-600 transition-transform ${
              expandedSections.rating ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    onFiltersChange({ ...filters, minRating: rating })
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filters.minRating === rating
                      ? "bg-orange-500 text-white"
                      : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  {rating === 0 ? "Any" : `${rating}+ ⭐`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-orange-100">
          <h3 className="text-orange-900 mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.cuisine.map((c) => {
              const cuisine = cuisineTypes.find((ct) => ct.id === c);
              return (
                <Badge
                  key={c}
                  variant="secondary"
                  className="bg-orange-100 text-orange-700"
                >
                  {cuisine?.icon} {cuisine?.label}
                </Badge>
              );
            })}
            {filters.priceRange.map((p) => (
              <Badge
                key={p}
                variant="secondary"
                className="bg-amber-100 text-amber-700"
              >
                {p}
              </Badge>
            ))}
            {filters.location && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700"
              >
                📍 {filters.location}
              </Badge>
            )}
            {filters.minRating > 0 && (
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-700"
              >
                ⭐ {filters.minRating}+
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
