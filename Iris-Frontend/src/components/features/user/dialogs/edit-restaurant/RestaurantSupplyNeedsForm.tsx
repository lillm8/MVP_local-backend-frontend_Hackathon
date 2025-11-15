// Supply needs form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Plus, Trash2, Package } from 'lucide-react';
import {
  RestaurantProfile,
  SupplyNeed,
} from '@/types/user/edit-restaurant/types';

interface RestaurantSupplyNeedsFormProps {
  profile: RestaurantProfile;
  onAddSupplyNeed: () => void;
  onUpdateSupplyNeed: (index: number, updates: Partial<SupplyNeed>) => void;
  onRemoveSupplyNeed: (index: number) => void;
}

export function RestaurantSupplyNeedsForm({
  profile,
  onAddSupplyNeed,
  onUpdateSupplyNeed,
  onRemoveSupplyNeed,
}: RestaurantSupplyNeedsFormProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Supplier Needs</h3>
        <Button onClick={onAddSupplyNeed}>
          <Plus className='mr-2 h-4 w-4' />
          Add Need
        </Button>
      </div>

      {profile.supplierNeeds.length === 0 ? (
        <Card className='p-8 text-center'>
          <Package className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
          <h3 className='mb-2 text-lg font-semibold'>No supplier needs yet</h3>
          <p className='mb-4 text-muted-foreground'>
            Add your supplier needs to help suppliers understand your
            requirements
          </p>
          <Button onClick={onAddSupplyNeed}>
            <Plus className='mr-2 h-4 w-4' />
            Add Need
          </Button>
        </Card>
      ) : (
        <div className='space-y-4'>
          {profile.supplierNeeds.map((need, index) => (
            <Card key={index} className='p-4'>
              <div className='mb-4 flex items-center justify-between'>
                <h4 className='font-medium'>Supply Need #{index + 1}</h4>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onRemoveSupplyNeed(index)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <Label htmlFor={`need-category-${index}`}>Category</Label>
                  <Input
                    id={`need-category-${index}`}
                    value={need.category}
                    onChange={e =>
                      onUpdateSupplyNeed(index, { category: e.target.value })
                    }
                    placeholder='e.g., Fresh Produce, Dairy, Meat'
                  />
                </div>
                <div>
                  <Label htmlFor={`need-frequency-${index}`}>
                    Order Frequency
                  </Label>
                  <Input
                    id={`need-frequency-${index}`}
                    value={need.frequency}
                    onChange={e =>
                      onUpdateSupplyNeed(index, { frequency: e.target.value })
                    }
                    placeholder='e.g., Weekly, Bi-weekly, Monthly'
                  />
                </div>
                <div>
                  <Label htmlFor={`need-average-${index}`}>
                    Average Order Value
                  </Label>
                  <Input
                    id={`need-average-${index}`}
                    value={need.averageOrder}
                    onChange={e =>
                      onUpdateSupplyNeed(index, {
                        averageOrder: e.target.value,
                      })
                    }
                    placeholder='e.g., €500 - €1000'
                  />
                </div>
                <div>
                  <Label htmlFor={`need-preferences-${index}`}>
                    Special Preferences
                  </Label>
                  <Input
                    id={`need-preferences-${index}`}
                    value={need.preferences}
                    onChange={e =>
                      onUpdateSupplyNeed(index, { preferences: e.target.value })
                    }
                    placeholder='e.g., Organic, Local, Halal'
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
