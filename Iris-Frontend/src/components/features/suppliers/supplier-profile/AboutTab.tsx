'use client';

import { Card } from '@components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface AboutTabProps {
  contact: ContactInfo;
  location: string;
  category: string;
}

export function AboutTab({ contact, location, category }: AboutTabProps) {
  return (
    <Card className='rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>Contact Information</h3>
      <div className='space-y-4'>
        <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
          <Mail className='h-5 w-5 text-primary' />
          <div>
            <div className='text-sm text-muted-foreground'>Email</div>
            <div>{contact.email}</div>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
          <Phone className='h-5 w-5 text-primary' />
          <div>
            <div className='text-sm text-muted-foreground'>Phone</div>
            <div>{contact.phone}</div>
          </div>
        </div>
        <div className='flex items-center gap-3 rounded-xl bg-muted/30 p-4'>
          <MapPin className='h-5 w-5 text-primary' />
          <div>
            <div className='text-sm text-muted-foreground'>Location</div>
            <div>{location}</div>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <h3 className='mb-4'>Categories</h3>
        <div className='text-muted-foreground'>{category}</div>
      </div>
    </Card>
  );
}
