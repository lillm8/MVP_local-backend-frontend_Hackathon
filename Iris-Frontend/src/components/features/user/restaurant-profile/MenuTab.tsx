'use client';

import { Card } from '@components/ui/card';
import { ImageWithFallback } from '@components/ui/image-with-fallback';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

export interface MenuTabProps {
  menu: MenuSection[];
}

export function MenuTab({ menu }: MenuTabProps) {
  return (
    <div className='space-y-6'>
      {menu.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          className='rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
        >
          <h3 className='mb-4 text-xl text-primary'>{section.category}</h3>
          <div className='grid gap-4 md:grid-cols-2'>
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className='duration-250 flex gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/50'
              >
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg'>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='mb-1 flex items-start justify-between'>
                    <h4>{item.name}</h4>
                    <span className='text-primary'>{item.price}</span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
