'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Separator } from '@components/ui/separator';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Star,
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@restaurant.com',
    phone: '+1 (555) 123-4567',
    restaurant: 'Bella Vista Restaurant',
    address: '123 Main Street, San Francisco, CA 94102',
    joinDate: 'January 2023',
    role: 'Restaurant Manager',
    rating: 4.8,
    totalOrders: 156,
    memberSince: '2023-01-15',
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditData(prev => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
          <p className='text-muted-foreground'>
            Manage your account information and preferences
          </p>
        </div>
        <div className='flex gap-2'>
          {isEditing ? (
            <>
              <Button variant='outline' onClick={handleCancel}>
                <X className='mr-2 h-4 w-4' />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className='mr-2 h-4 w-4' />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Profile Overview */}
        <div className='md:col-span-1'>
          <Card>
            <CardHeader className='text-center'>
              <div className='mb-4 flex justify-center'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage src='/placeholder-avatar.jpg' />
                  <AvatarFallback className='text-2xl'>
                    {profileData.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profileData.name}</CardTitle>
              <CardDescription>{profileData.role}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Rating</span>
                <div className='flex items-center gap-1'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='font-medium'>{profileData.rating}</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Total Orders
                </span>
                <span className='font-medium'>{profileData.totalOrders}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>
                  Member Since
                </span>
                <span className='font-medium'>{profileData.memberSince}</span>
              </div>
              <Separator />
              <div className='flex items-center gap-2'>
                <Shield className='h-4 w-4 text-green-500' />
                <span className='text-sm text-green-600'>Verified Account</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className='space-y-6 md:col-span-2'>
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  {isEditing ? (
                    <Input
                      id='name'
                      value={editData.name}
                      onChange={handleInputChange('name')}
                    />
                  ) : (
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4 text-muted-foreground' />
                      <span>{profileData.name}</span>
                    </div>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  {isEditing ? (
                    <Input
                      id='email'
                      type='email'
                      value={editData.email}
                      onChange={handleInputChange('email')}
                    />
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-muted-foreground' />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id='phone'
                      value={editData.phone}
                      onChange={handleInputChange('phone')}
                    />
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-muted-foreground' />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='restaurant'>Restaurant</Label>
                  {isEditing ? (
                    <Input
                      id='restaurant'
                      value={editData.restaurant}
                      onChange={handleInputChange('restaurant')}
                    />
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Building className='h-4 w-4 text-muted-foreground' />
                      <span>{profileData.restaurant}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                {isEditing ? (
                  <Textarea
                    id='address'
                    value={editData.address}
                    onChange={handleInputChange('address')}
                    rows={2}
                  />
                ) : (
                  <div className='flex items-start gap-2'>
                    <MapPin className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <span>{profileData.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>
                Your activity and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>156</div>
                  <div className='text-sm text-muted-foreground'>
                    Total Orders
                  </div>
                </div>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    $24,580
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Total Spent
                  </div>
                </div>
                <div className='rounded-lg border p-4 text-center'>
                  <div className='text-2xl font-bold text-purple-600'>12</div>
                  <div className='text-sm text-muted-foreground'>
                    Active Suppliers
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest marketplace activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[
                  {
                    action: 'Placed order #1234',
                    time: '2 hours ago',
                    type: 'order',
                  },
                  {
                    action: 'Added new supplier',
                    time: '1 day ago',
                    type: 'supplier',
                  },
                  {
                    action: 'Updated profile',
                    time: '3 days ago',
                    type: 'profile',
                  },
                  {
                    action: 'Completed order #1233',
                    time: '1 week ago',
                    type: 'order',
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between rounded-lg border p-3'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='h-2 w-2 rounded-full bg-blue-500' />
                      <span className='text-sm'>{activity.action}</span>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
