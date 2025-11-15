interface ActivityItem {
  action: string;
  supplier: string;
  time: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4'>Recent Activity</h3>
      <div className='space-y-3'>
        {items.map((activity, index) => (
          <div
            key={index}
            className='flex items-start gap-3 border-l-2 border-primary/20 pl-4'
          >
            <div className='flex-1'>
              <div className='mb-1'>{activity.action}</div>
              <div className='text-sm text-muted-foreground'>
                {activity.supplier}
              </div>
            </div>
            <div className='text-sm text-muted-foreground'>{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
