// User profile component
// Displays user profile information

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { User } from '@/types';

interface UserProfileProps {
  user: User;
  onEdit?: () => void;
  onLogout?: () => void;
}

export function UserProfile({ user, onEdit, onLogout }: UserProfileProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='text-center'>
        <Avatar className='mx-auto mb-4 h-24 w-24'>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <CardTitle className='text-xl'>{user.name}</CardTitle>
        <p className='text-muted-foreground'>{user.email}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm font-medium'>Role:</span>
            <span className='text-sm capitalize'>{user.role}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm font-medium'>Member since:</span>
            <span className='text-sm'>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className='flex gap-2 pt-4'>
          {onEdit && (
            <Button
              variant='outline'
              size='sm'
              onClick={onEdit}
              className='flex-1'
            >
              Edit Profile
            </Button>
          )}
          {onLogout && (
            <Button
              variant='destructive'
              size='sm'
              onClick={onLogout}
              className='flex-1'
            >
              Logout
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
