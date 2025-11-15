import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { Filter, ChevronDown, X } from 'lucide-react';

interface FiltersPanelProps {
  show: boolean;
  activeFilterCount: number;
  onClose: () => void;
  onClear: () => void;
  // category
  categories: { id: string; label: string }[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  categoryOpen: boolean;
  setCategoryOpen: (v: boolean) => void;
  // region
  regions: string[];
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
  regionOpen: boolean;
  setRegionOpen: (v: boolean) => void;
  // certs
  certifications: string[];
  selectedCerts: string[];
  toggleCert: (cert: string) => void;
  certOpen: boolean;
  setCertOpen: (v: boolean) => void;
}

export function FiltersPanel(props: FiltersPanelProps) {
  const {
    show,
    activeFilterCount,
    onClose,
    onClear,
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryOpen,
    setCategoryOpen,
    regions,
    selectedRegions,
    toggleRegion,
    regionOpen,
    setRegionOpen,
    certifications,
    selectedCerts,
    toggleCert,
    certOpen,
    setCertOpen,
  } = props;
  if (!show) return null;
  return (
    <div className='fixed left-8 top-32 z-40 w-72'>
      <div className='overflow-hidden rounded-3xl bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)]'>
        <div className='flex items-center justify-between border-b border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-5'>
          <div className='flex items-center gap-2'>
            <Filter className='h-5 w-5 text-primary' />
            <h3 className='text-lg'>Filters</h3>
            {activeFilterCount > 0 && (
              <Badge className='ml-1 bg-accent'>{activeFilterCount}</Badge>
            )}
          </div>
          <div className='flex items-center gap-1'>
            {activeFilterCount > 0 && (
              <Button
                variant='ghost'
                size='sm'
                onClick={onClear}
                className='h-8 px-2 text-xs hover:bg-primary/10'
              >
                Clear
              </Button>
            )}
            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='h-8 w-8 p-0 hover:bg-primary/10'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='max-h-[calc(100vh-240px)] overflow-y-auto p-2'>
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <CollapsibleTrigger className='flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5'>
              <span className='text-sm'>Category</span>
              <ChevronDown
                className={`duration-250 h-4 w-4 text-muted-foreground transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className='px-2 pb-2'>
              <div className='space-y-1 pt-2'>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`duration-250 w-full rounded-xl px-4 py-2.5 text-left text-sm transition-all ${selectedCategory === category.id ? 'bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(45,77,49,0.2)]' : 'hover:bg-primary/5'}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={regionOpen}
            onOpenChange={setRegionOpen}
            className='mt-2'
          >
            <CollapsibleTrigger className='flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5'>
              <span className='text-sm'>Region</span>
              <ChevronDown
                className={`duration-250 h-4 w-4 text-muted-foreground transition-transform ${regionOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className='px-4 pb-2'>
              <div className='space-y-3 pt-2'>
                {regions.map(region => (
                  <div
                    key={region}
                    className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5'
                  >
                    <Checkbox
                      id={`filter-${region}`}
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={() => toggleRegion(region)}
                    />
                    <Label
                      htmlFor={`filter-${region}`}
                      className='flex-1 cursor-pointer text-sm'
                    >
                      {region}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={certOpen}
            onOpenChange={setCertOpen}
            className='mt-2'
          >
            <CollapsibleTrigger className='flex w-full items-center justify-between rounded-2xl p-4 transition-colors hover:bg-primary/5'>
              <span className='text-sm'>Certification</span>
              <ChevronDown
                className={`duration-250 h-4 w-4 text-muted-foreground transition-transform ${certOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className='px-4 pb-2'>
              <div className='space-y-3 pt-2'>
                {certifications.map(cert => (
                  <div
                    key={cert}
                    className='flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5'
                  >
                    <Checkbox
                      id={`filter-${cert}`}
                      checked={selectedCerts.includes(cert)}
                      onCheckedChange={() => toggleCert(cert)}
                    />
                    <Label
                      htmlFor={`filter-${cert}`}
                      className='flex-1 cursor-pointer text-sm'
                    >
                      {cert}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
