import { Search } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

interface RestaurantFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  cuisineFilter: string;
  setCuisineFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  numFound: number;
  numCustomers: number;
  numSeeking: number;
}

export function RestaurantFiltersBar(props: RestaurantFiltersBarProps) {
  const {
    searchQuery,
    setSearchQuery,
    cuisineFilter,
    setCuisineFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    numFound,
    numCustomers,
    numSeeking,
  } = props;
  return (
    <div className='mb-6 flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search restaurants by name or type...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='h-12 rounded-2xl pl-12'
          />
        </div>
        <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder='All Cuisines' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='all'>All Cuisines</SelectItem>
            <SelectItem value='Italian'>Italian</SelectItem>
            <SelectItem value='Japanese'>Japanese</SelectItem>
            <SelectItem value='French'>French</SelectItem>
            <SelectItem value='Contemporary'>Contemporary</SelectItem>
            <SelectItem value='Vegetarian'>Vegetarian</SelectItem>
            <SelectItem value='Vegan'>Vegan</SelectItem>
            <SelectItem value='Indian'>Indian</SelectItem>
            <SelectItem value='Seafood'>Seafood</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder='All Locations' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='all'>All Locations</SelectItem>
            <SelectItem value='Downtown'>Downtown</SelectItem>
            <SelectItem value='Midtown'>Midtown</SelectItem>
            <SelectItem value='East Side'>East Side</SelectItem>
            <SelectItem value='West End'>West End</SelectItem>
            <SelectItem value='Waterfront'>Waterfront</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className='h-12 w-[180px] rounded-2xl'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='rating'>Highest Rated</SelectItem>
            <SelectItem value='name'>Name (A-Z)</SelectItem>
            <SelectItem value='newest'>Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {numFound} restaurant{numFound !== 1 ? 's' : ''} found
        </p>
        <div className='flex gap-2'>
          <Badge variant='outline' className='px-3 py-1'>
            {numCustomers} Customers
          </Badge>
          <Badge variant='outline' className='px-3 py-1'>
            {numSeeking} Seeking Suppliers
          </Badge>
        </div>
      </div>
    </div>
  );
}
