import { Search, ChevronRight } from 'lucide-react';
import { Input } from '@components/ui/input';

export function HeroSection() {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/5'>
      <div className='mx-auto max-w-[1440px] px-8 py-20'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-5xl tracking-tight text-primary'>
            Empowering local producers
          </h1>
          <p className='flex items-center justify-center gap-2 text-xl text-muted-foreground'>
            Fresh ingredients daily
            <ChevronRight className='h-5 w-5 text-accent' />
          </p>
        </div>
        <div className='mx-auto max-w-2xl'>
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search producers, ingredients, or categories...'
              className='duration-250 h-14 rounded-2xl border-0 bg-white pl-12 pr-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow focus:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
