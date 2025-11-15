'use client';

import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { MapPin, MessageCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

export interface SupplierCustomer {
  id: string;
  name: string;
  type: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  lastOrder: string;
  status: 'active' | 'inactive';
  avatar: string; // initials
}

interface SupplierCustomersTabProps {
  customers: SupplierCustomer[];
  onContact?: (name: string) => void;
  onViewProfile?: (id: string) => void;
}

export function SupplierCustomersTab({
  customers,
  onContact,
  onViewProfile,
}: SupplierCustomersTabProps) {
  const handleContact = (name: string) => {
    if (onContact) onContact(name);
    else toast.success(`Opening message to ${name}`);
  };
  const handleView = (id: string) => {
    if (onViewProfile) onViewProfile(id);
    else toast.success(`Open restaurant profile ${id}`);
  };

  return (
    <div>
      <div className='mb-6'>
        <p className='text-sm text-muted-foreground'>
          View and manage your restaurant partnerships
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        {customers.map(c => (
          <div
            key={c.id}
            className='duration-250 rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-5 transition-all hover:border-primary/30'
          >
            <div className='mb-4 flex items-start justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                  {c.avatar}
                </div>
                <div>
                  <h4 className='mb-1'>{c.name}</h4>
                  <p className='text-sm text-muted-foreground'>{c.type}</p>
                </div>
              </div>
              <Badge
                className={c.status === 'active' ? 'bg-primary' : undefined}
              >
                {c.status}
              </Badge>
            </div>

            <div className='mb-4 grid grid-cols-3 gap-3 text-sm'>
              <div>
                <p className='mb-1 text-xs text-muted-foreground'>
                  Total Orders
                </p>
                <p className='font-medium'>{c.totalOrders}</p>
              </div>
              <div>
                <p className='mb-1 text-xs text-muted-foreground'>
                  Total Spent
                </p>
                <p className='font-medium text-primary'>{c.totalSpent}</p>
              </div>
              <div>
                <p className='mb-1 text-xs text-muted-foreground'>Last Order</p>
                <p className='font-medium'>{c.lastOrder}</p>
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='h-4 w-4' />
              {c.location}
            </div>

            <div className='mt-4 flex gap-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => handleContact(c.name)}
                className='flex-1 rounded-xl'
              >
                <MessageCircle className='mr-2 h-4 w-4' />
                Message
              </Button>
              <Button
                size='sm'
                onClick={() => handleView(c.id)}
                className='flex-1 rounded-xl bg-primary hover:bg-primary/90'
              >
                <Eye className='mr-2 h-4 w-4' />
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
