// Basic info form component for edit restaurant profile dialog

import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Label } from '@components/ui/label';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { X, Plus } from 'lucide-react';
import { RestaurantProfile } from '@/types/user/edit-restaurant/types';

interface RestaurantBasicInfoFormProps {
  profile: RestaurantProfile;
  newCuisine: string;
  onUpdate: (updates: Partial<RestaurantProfile>) => void;
  onAddCuisine: () => void;
  onRemoveCuisine: (index: number) => void;
  onNewCuisineChange: (value: string) => void;
}

export function RestaurantBasicInfoForm({
  profile,
  newCuisine,
  onUpdate,
  onAddCuisine,
  onRemoveCuisine,
  onNewCuisineChange,
}: RestaurantBasicInfoFormProps) {
  const handleAddCuisine = () => {
    if (newCuisine.trim()) {
      onAddCuisine();
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='name'>Restaurant Name</Label>
        <Input
          id='name'
          value={profile.name}
          onChange={e => onUpdate({ name: e.target.value })}
          placeholder='Enter restaurant name'
        />
      </div>

      <div>
        <Label htmlFor='type'>Restaurant Type</Label>
        <Input
          id='type'
          value={profile.type}
          onChange={e => onUpdate({ type: e.target.value })}
          placeholder='e.g., Fine Dining, Casual, Fast Food'
        />
      </div>

      <div>
        <Label htmlFor='cuisine'>Cuisine Types</Label>
        <div className='flex space-x-2'>
          <Input
            id='cuisine'
            value={newCuisine}
            onChange={e => onNewCuisineChange(e.target.value)}
            placeholder='Add cuisine type'
            onKeyPress={e => e.key === 'Enter' && handleAddCuisine()}
          />
          <Button onClick={handleAddCuisine}>
            <Plus className='mr-2 h-4 w-4' />
            Add
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {profile.cuisine.map((cuisine, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='flex items-center space-x-1'
            >
              <span>{cuisine}</span>
              <Button
                variant='ghost'
                size='sm'
                className='h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground'
                onClick={() => onRemoveCuisine(index)}
              >
                <X className='h-3 w-3' />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor='location'>Location</Label>
        <Input
          id='location'
          value={profile.location}
          onChange={e => onUpdate({ location: e.target.value })}
          placeholder='Enter restaurant location'
        />
      </div>

      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={profile.description}
          onChange={e => onUpdate({ description: e.target.value })}
          placeholder='Describe your restaurant'
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor='coverImage'>Cover Image URL</Label>
        <Input
          id='coverImage'
          value={profile.coverImage}
          onChange={e => onUpdate({ coverImage: e.target.value })}
          placeholder='https://example.com/image.jpg'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='seatingCapacity'>Seating Capacity</Label>
          <Input
            id='seatingCapacity'
            value={profile.seatingCapacity}
            onChange={e => onUpdate({ seatingCapacity: e.target.value })}
            placeholder='e.g., 50'
          />
        </div>
        <div>
          <Label htmlFor='established'>Established Year</Label>
          <Input
            id='established'
            value={profile.established}
            onChange={e => onUpdate({ established: e.target.value })}
            placeholder='e.g., 2020'
          />
        </div>
      </div>

      <div>
        <Label htmlFor='orderVolume'>Monthly Order Volume</Label>
        <Input
          id='orderVolume'
          value={profile.orderVolume}
          onChange={e => onUpdate({ orderVolume: e.target.value })}
          placeholder='e.g., €5,000 - €10,000'
        />
      </div>
    </div>
  );
}
