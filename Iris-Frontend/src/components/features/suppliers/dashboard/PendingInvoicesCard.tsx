'use client';

import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { toast } from 'sonner';

export function PendingInvoicesCard() {
  return (
    <Card className='rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='border-b border-border p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='rounded-xl bg-accent/10 p-2'>
              <FileText className='h-5 w-5 text-accent' />
            </div>
            <h3 className='text-lg'>Pending Invoices</h3>
          </div>
          <Badge variant='secondary'>2</Badge>
        </div>
      </div>
      <div className='p-6'>
        <div className='space-y-3'>
          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div>
                <h4 className='mb-1 text-sm font-medium'>INV-2024-002</h4>
                <p className='text-sm text-muted-foreground'>Farm to Fork</p>
              </div>
              <span className='text-primary'>€32.40</span>
            </div>
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>Due: Nov 06, 2024</span>
              <Badge variant='secondary'>Pending</Badge>
            </div>
          </div>

          <div className='rounded-2xl border-2 border-accent/10 bg-accent/5 p-4'>
            <div className='mb-2 flex items-start justify-between'>
              <div>
                <h4 className='mb-1 text-sm font-medium'>INV-2024-003</h4>
                <p className='text-sm text-muted-foreground'>Green Table</p>
              </div>
              <span className='text-primary'>€78.20</span>
            </div>
            <div className='flex items-center justify-between text-xs text-muted-foreground'>
              <span>Due: Nov 07, 2024</span>
              <Badge variant='secondary'>Sent</Badge>
            </div>
          </div>
        </div>
        <Button
          variant='outline'
          className='mt-4 w-full rounded-xl'
          onClick={() => toast.success('Opening invoices')}
        >
          View All Invoices
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </Card>
  );
}
