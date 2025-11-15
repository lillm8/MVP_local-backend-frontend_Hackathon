import { Button } from '@components/ui/button';
import { Filter } from 'lucide-react';
import { useHomePage } from '@hooks/home/use-home-page';
import { HeroSection } from './HeroSection';
import { FiltersPanel } from './FiltersPanel';
import { FeaturedProducts } from './FeaturedProducts';
import { RecommendedProducers } from './RecommendedProducers';

interface HomePageProps {
  onNavigateToProduct: () => void;
  onViewSupplier?: (supplierId: string) => void;
}

export function HomePage({
  onNavigateToProduct,
  onViewSupplier,
}: HomePageProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedRegions,
    toggleRegion,
    selectedCerts,
    toggleCert,
    showFilters,
    setShowFilters,
    categoryOpen,
    setCategoryOpen,
    regionOpen,
    setRegionOpen,
    certOpen,
    setCertOpen,
    categories,
    regions,
    certifications,
    filteredProducts,
    filteredProducers,
    clearAllFilters,
    activeFilterCount,
  } = useHomePage();

  return (
    <div className='min-h-screen'>
      <HeroSection />

      <div className='mx-auto max-w-[1440px] px-8 py-12'>
        <div className='relative'>
          <FiltersPanel
            show={showFilters}
            activeFilterCount={activeFilterCount}
            onClose={() => setShowFilters(false)}
            onClear={clearAllFilters}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryOpen={categoryOpen}
            setCategoryOpen={setCategoryOpen}
            regions={regions}
            selectedRegions={selectedRegions}
            toggleRegion={toggleRegion}
            regionOpen={regionOpen}
            setRegionOpen={setRegionOpen}
            certifications={certifications}
            selectedCerts={selectedCerts}
            toggleCert={toggleCert}
            certOpen={certOpen}
            setCertOpen={setCertOpen}
          />

          <div
            className={`transition-all duration-300 ${showFilters ? 'ml-80' : 'ml-0'}`}
          >
            {!showFilters && (
              <div className='mb-6'>
                <Button
                  onClick={() => setShowFilters(true)}
                  className='duration-250 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all hover:bg-primary/5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]'
                  variant='outline'
                >
                  <Filter className='mr-2 h-4 w-4' />
                  Show Filters
                </Button>
              </div>
            )}

            <FeaturedProducts
              products={filteredProducts as any}
              onNavigate={onNavigateToProduct}
              onClearAll={clearAllFilters}
            />

            <RecommendedProducers
              producers={filteredProducers as any}
              onView={id => onViewSupplier?.(id)}
              onClearAll={clearAllFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
