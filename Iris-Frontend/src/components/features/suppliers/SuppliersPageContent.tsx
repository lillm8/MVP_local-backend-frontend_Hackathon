import { Search, Filter } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { useSuppliersPageContent } from '@hooks/suppliers/use-suppliers-page-content';
import { FeaturedProducers } from './supplier-dashboard/../components/FeaturedProducers';
import { FiltersSidebar } from './supplier-dashboard/../components/FiltersSidebar';
import { SuppliersGrid } from './supplier-dashboard/../components/SuppliersGrid';

interface SuppliersPageProps {
  onViewSupplier: (supplierId: string) => void;
}

export function SuppliersPageContent({ onViewSupplier }: SuppliersPageProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    selectedCerts,
    toggleCert,
    selectedDistance,
    setSelectedDistance,
    showFilters,
    setShowFilters,
    categoryOpen,
    setCategoryOpen,
    certOpen,
    setCertOpen,
    sortBy,
    setSortBy,
    suppliers,
    categories,
    certifications,
    filteredSuppliers,
    activeFiltersCount,
    clearAllFilters,
  } = useSuppliersPageContent();

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='mb-8'>
          <h1 className='mb-2 text-4xl text-primary'>Suppliers Directory</h1>
          <p className='text-muted-foreground'>
            Browse and connect with local producers and suppliers
          </p>
        </div>

        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='relative flex-1 sm:max-w-md'>
            <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search suppliers...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='rounded-2xl border-border pl-12 pr-4'
            />
          </div>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              onClick={() => setShowFilters(!showFilters)}
              className='rounded-xl'
            >
              <Filter className='mr-2 h-4 w-4' />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className='ml-2 bg-primary'>{activeFiltersCount}</Badge>
              )}
            </Button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='rounded-xl border px-3 py-2 text-sm'
            >
              <option value='rating'>Highest Rated</option>
              <option value='distance'>Nearest First</option>
              <option value='reviews'>Most Reviewed</option>
              <option value='products'>Most Products</option>
            </select>
          </div>
        </div>

        <FeaturedProducers
          items={suppliers.filter(s => s.rating >= 4.8).slice(0, 6) as any}
          onClick={onViewSupplier}
        />

        <div className='flex gap-8'>
          <FiltersSidebar
            show={showFilters}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            certifications={certifications}
            selectedCerts={selectedCerts}
            toggleCert={toggleCert}
            clearAllFilters={clearAllFilters}
            activeFiltersCount={activeFiltersCount}
            categoryOpen={categoryOpen}
            setCategoryOpen={setCategoryOpen}
            certOpen={certOpen}
            setCertOpen={setCertOpen}
          />

          <div className='flex-1'>
            <div className='mb-4 text-sm text-muted-foreground'>
              Showing {filteredSuppliers.length} of {suppliers.length} suppliers
            </div>
            {filteredSuppliers.length === 0 ? (
              <div className='flex min-h-[400px] items-center justify-center rounded-2xl bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
                <div className='text-center'>
                  <Search className='mx-auto mb-4 h-16 w-16 text-muted-foreground/30' />
                  <h3 className='mb-2 text-primary'>No suppliers found</h3>
                  <p className='text-muted-foreground'>
                    Try adjusting your filters or search query
                  </p>
                  {activeFiltersCount > 0 && (
                    <Button
                      onClick={clearAllFilters}
                      className='mt-4 rounded-xl'
                      variant='outline'
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <SuppliersGrid
                items={filteredSuppliers as any}
                onClick={onViewSupplier}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
