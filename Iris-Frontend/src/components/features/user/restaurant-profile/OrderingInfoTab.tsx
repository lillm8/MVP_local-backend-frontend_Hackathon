'use client';

import { Card } from '@components/ui/card';
import { Calendar, Clock, Globe, Mail, Phone } from 'lucide-react';

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
}

export interface OrderingPreferences {
  leadTime: string;
  deliveryWindow: string;
  paymentTerms: string;
  minimumOrder: string;
}

export interface OrderingInfoTabProps {
  contact: ContactInfo;
  orderingPreferences: OrderingPreferences;
}

export function OrderingInfoTab({
  contact,
  orderingPreferences,
}: OrderingInfoTabProps) {
  return (
    <div className='grid gap-6 lg:grid-cols-2'>
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
            <Globe className='h-5 w-5 text-primary' />
            <div>
              <div className='text-sm text-muted-foreground'>Website</div>
              <div>{contact.website}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className='rounded-2xl border-0 p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
        <h3 className='mb-4'>Ordering Preferences</h3>
        <div className='space-y-4'>
          <div className='rounded-xl bg-muted/30 p-4'>
            <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-4 w-4' />
              Lead Time
            </div>
            <div>{orderingPreferences.leadTime}</div>
          </div>
          <div className='rounded-xl bg-muted/30 p-4'>
            <div className='mb-1 flex items-center gap-2 text-sm text-muted-foreground'>
              <Calendar className='h-4 w-4' />
              Delivery Window
            </div>
            <div>{orderingPreferences.deliveryWindow}</div>
          </div>
          <div className='rounded-xl bg-muted/30 p-4'>
            <div className='mb-1 text-sm text-muted-foreground'>
              Payment Terms
            </div>
            <div>{orderingPreferences.paymentTerms}</div>
          </div>
          <div className='rounded-xl bg-muted/30 p-4'>
            <div className='mb-1 text-sm text-muted-foreground'>
              Minimum Order
            </div>
            <div>{orderingPreferences.minimumOrder}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
