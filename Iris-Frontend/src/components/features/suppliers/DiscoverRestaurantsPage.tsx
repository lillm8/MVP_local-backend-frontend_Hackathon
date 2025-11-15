import { Card } from '@components/ui/card';
import { Utensils } from 'lucide-react';
import {
  useDiscoverRestaurants,
  type SortBy,
} from '@hooks/suppliers/use-discover-restaurants';
import { RestaurantFiltersBar } from './components/RestaurantFiltersBar';
import { RestaurantCard } from './components/RestaurantCard';

interface DiscoverRestaurantsPageProps {
  onViewRestaurant: (id: string) => void;
  onContactRestaurant: (name: string) => void;
}

export function DiscoverRestaurantsPage({
  onViewRestaurant,
  onContactRestaurant,
}: DiscoverRestaurantsPageProps) {
  const {
    searchQuery,
    setSearchQuery,
    cuisineFilter,
    setCuisineFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    filteredRestaurants,
    handleAddToFavorites,
  } = useDiscoverRestaurants();

  return (
    <div>
      <RestaurantFiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cuisineFilter={cuisineFilter}
        setCuisineFilter={setCuisineFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        sortBy={sortBy}
        setSortBy={value => setSortBy(value as SortBy)}
        numFound={filteredRestaurants.length}
        numCustomers={filteredRestaurants.filter(r => r.isCustomer).length}
        numSeeking={
          filteredRestaurants.filter(r => r.lookingForSuppliers).length
        }
      />

      <div className='grid gap-4 md:grid-cols-2'>
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            onAddFavorite={handleAddToFavorites}
            onView={onViewRestaurant}
            onContact={onContactRestaurant}
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <Card className='rounded-3xl border-0 p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
          <Utensils className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
          <h3 className='mb-2'>No restaurants found</h3>
          <p className='text-muted-foreground'>
            Try adjusting your search or filters
          </p>
        </Card>
      )}
    </div>
  );
}
