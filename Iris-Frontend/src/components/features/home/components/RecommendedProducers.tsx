import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ProducerCard } from '@components/features/suppliers';

interface ProducerItem {
  id: number;
  name: string;
  image: string;
  distance: string;
  rating: number;
  verified: boolean;
}

interface RecommendedProducersProps {
  producers: ProducerItem[];
  onView: (id: string) => void;
  onClearAll: () => void;
}

export function RecommendedProducers({
  producers,
  onView,
  onClearAll,
}: RecommendedProducersProps) {
  return (
    <section className='overflow-hidden'>
      <div className='mb-6'>
        <h2>Recommended for You</h2>
        <p className='mt-1 text-muted-foreground'>
          Based on your preferences — {producers.length} producer
          {producers.length !== 1 ? 's' : ''} found
        </p>
      </div>
      {producers.length === 0 ? (
        <div className='flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 p-12 text-center'>
          <Search className='mb-4 h-12 w-12 text-muted-foreground/30' />
          <h3 className='mb-2 text-xl text-primary'>No producers found</h3>
          <p className='mb-4 max-w-md text-muted-foreground'>
            Try different filters to discover more producers
          </p>
          <Button onClick={onClearAll} variant='outline' className='rounded-xl'>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className='relative -mx-2 px-2'>
          <div className='scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4'>
            {producers.map(producer => (
              <div key={producer.id} className='w-80 flex-shrink-0 snap-start'>
                <ProducerCard
                  {...(producer as any)}
                  onClick={() => onView(producer.id.toString())}
                />
              </div>
            ))}
          </div>
          <div className='pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent' />
        </div>
      )}
    </section>
  );
}
