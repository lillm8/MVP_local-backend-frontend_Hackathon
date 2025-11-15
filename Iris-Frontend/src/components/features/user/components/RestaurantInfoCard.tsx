import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Building2 } from 'lucide-react';

interface RestaurantInfoCardProps {
  name: string;
  type: string;
  address: string;
  memberSince: string;
  onEdit: () => void;
}

export function RestaurantInfoCard({
  name,
  type,
  address,
  memberSince,
  onEdit,
}: RestaurantInfoCardProps) {
  return (
    <div className='overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
      <div className='mb-6 flex items-start gap-4'>
        <Avatar className='h-16 w-16'>
          <AvatarFallback className='bg-primary text-2xl text-primary-foreground'>
            {name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <h3 className='mb-1'>{name}</h3>
          <p className='mb-1 text-sm text-muted-foreground'>{type}</p>
          <p className='text-xs text-muted-foreground'>
            Member since {memberSince}
          </p>
        </div>
      </div>
      <div className='mb-4 text-sm text-muted-foreground'>
        <Building2 className='mb-2 inline h-4 w-4' /> {address}
      </div>
      <Button variant='outline' className='w-full rounded-xl' onClick={onEdit}>
        Edit Profile
      </Button>
    </div>
  );
}
