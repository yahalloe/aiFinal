import { Restaurant } from "../App";
import {
  X,
  MapPin,
  Star,
  Phone,
  Clock,
  DollarSign,
  Navigation,
  Heart,
  Share2,
  TrendingUp,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantDetails({
  restaurant,
  onClose,
}: RestaurantDetailsProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <X className="size-5 text-orange-900" />
            </button>

            {/* Match Score */}
            {restaurant.matchScore && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-green-600" />
                  <div>
                    <div className="text-xs text-orange-600">
                      AI Match Score
                    </div>
                    <div className="text-green-600">
                      {restaurant.matchScore}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Restaurant Name & Location */}
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <MapPin className="size-4" />
                <span>{restaurant.location}</span>
                <span>•</span>
                <span>{restaurant.distance} km away</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <Star className="size-5 text-amber-500 mx-auto mb-1 fill-amber-500" />
                <div className="text-orange-900">{restaurant.rating}</div>
                <div className="text-xs text-orange-600">Rating</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <DollarSign className="size-5 text-orange-600 mx-auto mb-1" />
                <div className="text-orange-900">{restaurant.priceRange}</div>
                <div className="text-xs text-orange-600">Price Range</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <Navigation className="size-5 text-orange-600 mx-auto mb-1" />
                <div className="text-orange-900">{restaurant.distance} km</div>
                <div className="text-xs text-orange-600">Distance</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-orange-900 mb-2">About</h3>
              <p className="text-orange-700">{restaurant.description}</p>
            </div>

            {/* Specialties */}
            <div className="mb-6">
              <h3 className="text-orange-900 mb-3">Specialties</h3>
              <div className="grid grid-cols-2 gap-2">
                {restaurant.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-100"
                  >
                    <div className="size-2 bg-orange-500 rounded-full" />
                    <span className="text-sm text-orange-900">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cuisine Types */}
            <div className="mb-6">
              <h3 className="text-orange-900 mb-3">Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    className="bg-orange-100 text-orange-700 capitalize"
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6 space-y-3">
              <h3 className="text-orange-900 mb-3">Contact & Hours</h3>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg">
                  <Phone className="size-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-orange-600">Phone</div>
                  <div className="text-orange-900">{restaurant.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg">
                  <Clock className="size-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-orange-600">Hours</div>
                  <div className="text-orange-900">{restaurant.hours}</div>
                </div>
              </div>
            </div>

            {/* Match Analysis */}
            {restaurant.matchScore && (
              <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="text-green-900 mb-3">Why This Match?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 bg-green-600 rounded-full mt-1.5" />
                    <p className="text-green-800">
                      Matches {restaurant.cuisine.length} of your preferred
                      cuisine types
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 bg-green-600 rounded-full mt-1.5" />
                    <p className="text-green-800">
                      High rating of {restaurant.rating} stars from verified
                      diners
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 bg-green-600 rounded-full mt-1.5" />
                    <p className="text-green-800">
                      Within your preferred distance range (
                      {restaurant.distance} km)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 bg-green-600 rounded-full mt-1.5" />
                    <p className="text-green-800">
                      Price range matches your budget preferences
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${restaurant.coordinates[0]},${restaurant.coordinates[1]}`,
                    "_blank",
                  )
                }
              >
                <Navigation className="size-4 mr-2" />
                Get Directions
              </Button>
              <Button
                variant="outline"
                className={`border-orange-300 ${isFavorited ? "bg-orange-50 text-orange-700" : "text-orange-700 hover:bg-orange-50"}`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  className={`size-4 ${isFavorited ? "fill-orange-500 text-orange-500" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
