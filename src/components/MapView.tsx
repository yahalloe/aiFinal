import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Restaurant } from '../App';

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  searchQuery: string;
}

// Custom component to center map on selected restaurant
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function MapView({ restaurants, selectedRestaurant, onRestaurantSelect }: MapViewProps) {
  // Default coordinates for Laoag City
  const defaultPosition: [number, number] = [18.1970, 120.5920];

  const selectedPosition = selectedRestaurant?.coordinates || defaultPosition;

  return (
    <MapContainer center={defaultPosition} zoom={13} className="w-full h-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={restaurant.coordinates as [number, number]}
          eventHandlers={{
            click: () => onRestaurantSelect(restaurant),
          }}
        >
          <Popup>
            <strong>{restaurant.name}</strong>
            <br />
            {restaurant.cuisine.join(', ')}
          </Popup>
        </Marker>
      ))}

      {selectedRestaurant && <ChangeView center={selectedPosition} zoom={15} />}
    </MapContainer>
  );
}
