// Metrics cards component for supplier dashboard

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { StatCard } from '@/types/suppliers/supplier-dashboard/types';

interface SupplierMetricsCardsProps {
  stats: StatCard[];
}

export function SupplierMetricsCards({ stats }: SupplierMetricsCardsProps) {
  return (
    <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';

        return (
          <Card key={index} className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  {stat.label}
                </p>
                <p className='text-2xl font-bold'>{stat.value}</p>
                <div className='mt-2 flex items-center'>
                  {isPositive ? (
                    <TrendingUp className='mr-1 h-4 w-4 text-green-500' />
                  ) : (
                    <TrendingDown className='mr-1 h-4 w-4 text-red-500' />
                  )}
                  <Badge
                    variant={isPositive ? 'default' : 'destructive'}
                    className='text-xs'
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <div className='rounded-lg bg-primary/10 p-3'>
                <Icon className='h-6 w-6 text-primary' />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
