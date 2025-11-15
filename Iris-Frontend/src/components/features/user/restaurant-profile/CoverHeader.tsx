'use client';

import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { ImageWithFallback } from '@components/ui/image-with-fallback';
import { Heart, Utensils } from 'lucide-react';
import type { CoverHeaderProps } from '@/components/types/cover-header';

export function CoverHeader(props: CoverHeaderProps) {
  const {
    name,
    type,
    coverImage,
    avatarCode,
    onBack,
    onContact,
    onProposal,
    onToggleFavorite,
    isFavorite,
  } = props;
  return (
    <>
      <Button variant='outline' onClick={onBack} className='mb-6 rounded-xl'>
        ← Back
      </Button>
      <Card className='mb-8 overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
        <div className='relative h-64 overflow-hidden'>
          <ImageWithFallback
            src={coverImage}
            alt={name}
            width={800}
            height={256}
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
          <div className='absolute bottom-6 left-6 right-6 flex items-end justify-between'>
            <div className='flex items-end gap-4'>
              <Avatar className='h-20 w-20 border-4 border-white'>
                <AvatarFallback className='bg-primary text-2xl text-primary-foreground'>
                  {avatarCode}
                </AvatarFallback>
              </Avatar>
              <div className='text-white'>
                <h1 className='mb-1 text-3xl'>{name}</h1>
                <div className='flex items-center gap-2 text-sm'>
                  <Utensils className='h-4 w-4' />
                  {type}
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button
                size='sm'
                variant='outline'
                className='rounded-xl border-white bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                onClick={onContact}
              >
                Contact
              </Button>
              <Button
                size='sm'
                className='rounded-xl bg-primary hover:bg-primary/90'
                onClick={onProposal}
              >
                Send Proposal
              </Button>
              <Button
                size='sm'
                className='rounded-xl bg-primary hover:bg-primary/90'
                onClick={onToggleFavorite}
              >
                {isFavorite ? (
                  <Heart className='h-4 w-4 fill-red-500' />
                ) : (
                  <Heart className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
