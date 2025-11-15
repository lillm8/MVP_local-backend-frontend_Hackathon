import { Percent, Package, TrendingUp } from 'lucide-react';

interface MetricItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
}

interface MetricsGridProps {
  metrics: MetricItem[];
}

const iconForMetric = (label: string) => {
  if (label.toLowerCase().includes('order')) return Package;
  if (label.toLowerCase().includes('reorder')) return Percent;
  return TrendingUp;
};

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {metrics.map((metric, index) => {
        const Icon = iconForMetric(metric.label);
        return (
          <div
            key={index}
            className='duration-250 overflow-hidden rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
          >
            <div className='mb-4 flex items-center justify-between'>
              <div className='rounded-xl bg-primary/10 p-3'>
                <Icon className='h-5 w-5 text-primary' />
              </div>
              <div
                className={`text-sm ${metric.trend === 'up' ? 'text-primary' : 'text-accent'}`}
              >
                {metric.change}
              </div>
            </div>
            <div className='text-3xl text-primary'>{metric.value}</div>
            <div className='mt-1 text-sm text-muted-foreground'>
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
