import { useState, useEffect } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { MapView } from './components/MapView';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetails } from './components/RestaurantDetails';
import { Search, MapPin } from 'lucide-react';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  location: string;
  coordinates: [number, number];
  rating: number;
  priceRange: string;
  distance: number;
  image: string;
  description: string;
  specialties: string[];
  hours: string;
  phone: string;
  matchScore?: number;
}

export interface Filters {
  cuisine: string[];
  priceRange: string[];
  location: string;
  maxDistance: number;
  minRating: number;
}

// Centralized restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Preciosa',
    cuisine: ['empanada', 'longganisa'],
    location: 'Laoag City',
    coordinates: [18.1987, 120.5927],
    rating: 4.8,
    priceRange: '$',
    distance: 2.3,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    description: 'Famous for authentic Ilocano empanada and longganisa',
    specialties: ['Vigan Empanada', 'Ilocos Longganisa', 'Bagnet'],
    hours: '6:00 AM - 8:00 PM',
    phone: '+63 917 123 4567',
  },
  {
    id: '2',
    name: 'Saramsam Ylocano',
    cuisine: ['bagnet', 'pinakbet', 'dinardaraan'],
    location: 'Laoag City',
    coordinates: [18.2012, 120.5889],
    rating: 4.7,
    priceRange: '$$',
    distance: 1.8,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    description: 'Traditional Ilocano dishes in a modern setting',
    specialties: ['Crispy Bagnet', 'Pinakbet Pizza', 'Dinardaraan'],
    hours: '10:00 AM - 9:00 PM',
    phone: '+63 917 234 5678',
  },
  {
    id: '3',
    name: 'Dawang\'s Grill & Restaurant',
    cuisine: ['bagnet', 'igado', 'sinanglao'],
    location: 'Batac',
    coordinates: [18.0556, 120.5642],
    rating: 4.6,
    priceRange: '$',
    distance: 12.5,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    description: 'Family-style restaurant serving hearty Ilocano meals',
    specialties: ['Grilled Seafood', 'Igado', 'Sinanglao Soup'],
    hours: '11:00 AM - 10:00 PM',
    phone: '+63 917 345 6789',
  },
  {
    id: '4',
    name: 'Herencia Cafe',
    cuisine: ['empanada', 'poqui-poqui', 'pinakbet'],
    location: 'Paoay',
    coordinates: [18.0553, 120.5281],
    rating: 4.9,
    priceRange: '$$$',
    distance: 15.2,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    description: 'Heritage cafe with authentic Ilocano recipes',
    specialties: ['Poqui-Poqui', 'Pinakbet', 'Ilocano Coffee'],
    hours: '8:00 AM - 8:00 PM',
    phone: '+63 917 456 7890',
  },
  {
    id: '5',
    name: 'Batac Riverside Empanada House',
    cuisine: ['empanada', 'longganisa'],
    location: 'Batac',
    coordinates: [18.0589, 120.5698],
    rating: 4.5,
    priceRange: '$',
    distance: 13.1,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    description: 'Riverside dining with the best empanadas in town',
    specialties: ['Orange Empanada', 'Longganisa Platter'],
    hours: '7:00 AM - 7:00 PM',
    phone: '+63 917 567 8901',
  },
  {
    id: '6',
    name: 'Kusina Felicitas',
    cuisine: ['bagnet', 'pinakbet', 'igado', 'dinardaraan'],
    location: 'Laoag City',
    coordinates: [18.1945, 120.5891],
    rating: 4.8,
    priceRange: '$$',
    distance: 3.2,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    description: 'Home-style cooking featuring Lola\'s secret recipes',
    specialties: ['Bagnet with KBL Dip', 'Special Pinakbet', 'Igado'],
    hours: '10:00 AM - 9:00 PM',
    phone: '+63 917 678 9012',
  },
  {
    id: '7',
    name: 'Pagudpud Seafood Grill',
    cuisine: ['sinanglao', 'poqui-poqui'],
    location: 'Pagudpud',
    coordinates: [18.5506, 120.7893],
    rating: 4.7,
    priceRange: '$$',
    distance: 45.8,
    image: 'https://images.unsplash.com/photo-1562158147-f8da1233e03f?w=800&q=80',
    description: 'Beachfront restaurant with fresh seafood and local dishes',
    specialties: ['Grilled Fish', 'Sinanglao', 'Seafood Poqui-Poqui'],
    hours: '9:00 AM - 9:00 PM',
    phone: '+63 917 789 0123',
  },
  {
    id: '8',
    name: 'Johnny Moon Cafe',
    cuisine: ['empanada', 'bagnet', 'longganisa'],
    location: 'Laoag City',
    coordinates: [18.1978, 120.5945],
    rating: 4.6,
    priceRange: '$$$',
    distance: 2.7,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    description: 'Fusion cafe blending traditional and modern Ilocano flavors',
    specialties: ['Bagnet Sisig', 'Empanada Bites', 'Longganisa Pasta'],
    hours: '11:00 AM - 11:00 PM',
    phone: '+63 917 890 1234',
  },
];

export type SortOption = 'match' | 'rating' | 'distance' | 'price';

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    cuisine: [],
    priceRange: [],
    location: '',
    maxDistance: 50,
    minRating: 0,
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  // Centralized filtering, matching, and sorting algorithm
  useEffect(() => {
    let filtered = [...mockRestaurants];

    // 1. SEARCH QUERY FILTER
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 2. RULE-BASED FILTERS
    // Cuisine filter
    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.some(c => filters.cuisine.includes(c))
      );
    }

    // Price range filter
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.priceRange.includes(restaurant.priceRange)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(restaurant =>
        restaurant.location === filters.location
      );
    }

    // Distance filter
    filtered = filtered.filter(restaurant =>
      restaurant.distance <= filters.maxDistance
    );

    // Rating filter
    filtered = filtered.filter(restaurant =>
      restaurant.rating >= filters.minRating
    );

    // 3. MATCHING ALGORITHM - Calculate AI match scores
    filtered = filtered.map(restaurant => {
      let score = 70; // Base score

      // Bonus for matching cuisine (+8 per match)
      const cuisineMatches = restaurant.cuisine.filter(c => filters.cuisine.includes(c)).length;
      score += cuisineMatches * 8;

      // Bonus for rating
      score += (restaurant.rating - 4) * 10;

      // Bonus for proximity (distance < 5km)
      if (restaurant.distance < 5) score += 5;

      return { ...restaurant, matchScore: Math.min(99, score) };
    });

    // 4. SORTING ALGORITHM
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'price':
          return a.priceRange.length - b.priceRange.length;
        default:
          return 0;
      }
    });

    setFilteredRestaurants(sorted);
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl">
                <MapPin className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-orange-900">Ilocos Norte Food Adventure</h1>
                <p className="text-sm text-orange-600">Discover authentic Ilocano cuisine</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
              <div className="size-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-orange-700">AI-Powered Matching Active</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-orange-400" />
            <input
              type="text"
              placeholder="Search by restaurant name, dish, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Filter Panel */}
        <aside className="w-80 bg-white border-r border-orange-100 overflow-y-auto">
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={filteredRestaurants.length}
          />
        </aside>

        {/* Map Section */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative">
            <MapView
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={setSelectedRestaurant}
              searchQuery={searchQuery}
            />
          </div>
        </main>

        {/* Restaurant List */}
        <aside className="w-96 bg-white border-l border-orange-100 flex flex-col">
          <RestaurantList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onRestaurantSelect={setSelectedRestaurant}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>
      </div>

      {/* Restaurant Details Modal */}
      {selectedRestaurant && (
        <RestaurantDetails
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}