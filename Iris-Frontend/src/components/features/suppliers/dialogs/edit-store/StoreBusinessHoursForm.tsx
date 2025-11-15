// Business hours form component for edit store dialog

import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Card } from '@components/ui/card';
import { Clock } from 'lucide-react';
import { StoreFormData } from '@/types/suppliers/edit-store/types';

interface StoreBusinessHoursFormProps {
  formData: StoreFormData;
  onUpdate: (updates: Partial<StoreFormData>) => void;
}

const days = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

export function StoreBusinessHoursForm({
  formData,
  onUpdate,
}: StoreBusinessHoursFormProps) {
  const handleTimeChange = (
    day: string,
    timeType: 'Open' | 'Close',
    value: string
  ) => {
    const key =
      `${day.toLowerCase()}${timeType.toLowerCase()}` as keyof StoreFormData;
    onUpdate({ [key]: value });
  };

  return (
    <div className='space-y-4'>
      <div className='mb-4 flex items-center space-x-2'>
        <Clock className='h-5 w-5 text-primary' />
        <h3 className='text-lg font-semibold'>Business Hours</h3>
      </div>

      <div className='space-y-4'>
        {days.map(day => (
          <Card key={day.key} className='p-4'>
            <div className='flex items-center justify-between'>
              <Label className='min-w-[100px] font-medium'>{day.label}</Label>
              <div className='flex items-center space-x-2'>
                <div>
                  <Label
                    htmlFor={`${day.key}Open`}
                    className='text-sm text-muted-foreground'
                  >
                    Open
                  </Label>
                  <Input
                    id={`${day.key}Open`}
                    type='time'
                    value={
                      formData[
                        `${day.key}Open` as keyof StoreFormData
                      ] as string
                    }
                    onChange={e =>
                      handleTimeChange(day.key, 'Open', e.target.value)
                    }
                    className='w-24'
                  />
                </div>
                <span className='text-muted-foreground'>to</span>
                <div>
                  <Label
                    htmlFor={`${day.key}Close`}
                    className='text-sm text-muted-foreground'
                  >
                    Close
                  </Label>
                  <Input
                    id={`${day.key}Close`}
                    type='time'
                    value={
                      formData[
                        `${day.key}Close` as keyof StoreFormData
                      ] as string
                    }
                    onChange={e =>
                      handleTimeChange(day.key, 'Close', e.target.value)
                    }
                    className='w-24'
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className='text-sm text-muted-foreground'>
        <p>
          Set your business hours to help customers know when you're available.
          You can set different hours for weekends if needed.
        </p>
      </div>
    </div>
  );
}
