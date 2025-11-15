import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Percent, Repeat, Calendar } from 'lucide-react';

export interface SupplyAgreementItem {
  id: number;
  supplier: string;
  type: string;
  frequency: string;
  status: string;
  nextDelivery: string;
  items: string;
  discount: string;
  startDate: string;
  endDate: string;
}

interface SupplyAgreementsProps {
  agreements: SupplyAgreementItem[];
}

export function SupplyAgreements({ agreements }: SupplyAgreementsProps) {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>Active Supply Agreements</h3>
      <div className='space-y-4'>
        {agreements.map(agreement => (
          <div
            key={agreement.id}
            className='rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5'
          >
            <div className='mb-4 flex items-start justify-between'>
              <div>
                <div className='mb-1 flex items-center gap-2'>
                  <h4>{agreement.supplier}</h4>
                  <Badge variant='default' className='bg-primary'>
                    {agreement.status}
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {agreement.type}
                </p>
              </div>
              <Badge variant='outline' className='text-primary'>
                <Percent className='mr-1 h-3 w-3' />
                {agreement.discount} discount
              </Badge>
            </div>
            <div className='mb-4 grid gap-3 sm:grid-cols-2'>
              <div className='rounded-lg bg-background/50 p-3'>
                <div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Repeat className='h-3 w-3' />
                  Frequency
                </div>
                <div className='text-sm'>{agreement.frequency}</div>
              </div>
              <div className='rounded-lg bg-background/50 p-3'>
                <div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
                  <Calendar className='h-3 w-3' />
                  Next Delivery
                </div>
                <div className='text-sm'>{agreement.nextDelivery}</div>
              </div>
            </div>
            <div className='mb-3 text-sm'>
              <span className='text-muted-foreground'>Items: </span>
              <span>{agreement.items}</span>
            </div>
            <div className='flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground'>
              <span>
                Contract: {agreement.startDate} - {agreement.endDate}
              </span>
              <Button size='sm' variant='outline' className='rounded-xl'>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
