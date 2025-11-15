'use client';

import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { SupplierKpiStat } from '@/hooks/suppliers/use-supplier-dashboard-tab';

export interface KpiStatsGridProps {
  stats: SupplierKpiStat[];
}

export function KpiStatsGrid({ stats }: KpiStatsGridProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className='rounded-2xl border-0 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
        >
          <div className='flex items-center justify-between'>
            <div className='rounded-xl bg-muted p-2'>
              <stat.icon className='h-4 w-4 text-muted-foreground' />
            </div>
            <Badge
              variant='secondary'
              className={`text-xs ${stat.trend === 'up' ? 'bg-primary/10 text-primary' : ''}`}
            >
              {stat.change}
            </Badge>
          </div>
          <h3 className='mb-0.5 mt-3'>{stat.value}</h3>
          <p className='text-xs text-muted-foreground'>{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
