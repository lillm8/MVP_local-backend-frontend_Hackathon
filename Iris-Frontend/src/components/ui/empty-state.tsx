'use client';

import { LucideIcon, Package } from 'lucide-react';
import { Button } from './button';
import { cn } from './utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'minimal' | 'full';
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  secondaryAction,
  className,
  variant = 'default',
}: EmptyStateProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn('py-8 text-center', className)}>
        <Icon className='mx-auto mb-3 h-8 w-8 text-muted-foreground' />
        <h3 className='mb-1 text-sm font-medium text-foreground'>{title}</h3>
        <p className='text-xs text-muted-foreground'>{description}</p>
        {action && (
          <Button size='sm' onClick={action.onClick} className='mt-3'>
            {action.label}
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={cn(
          'flex min-h-screen items-center justify-center p-8',
          className
        )}
      >
        <div className='max-w-md text-center'>
          <Icon className='mx-auto mb-6 h-16 w-16 text-muted-foreground' />
          <h1 className='mb-3 text-2xl font-bold text-foreground'>{title}</h1>
          <p className='mb-8 text-lg text-muted-foreground'>{description}</p>
          <div className='space-y-3'>
            {action && (
              <Button onClick={action.onClick} size='lg' className='w-full'>
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant='outline'
                onClick={secondaryAction.onClick}
                size='lg'
                className='w-full'
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center',
        className
      )}
    >
      <Icon className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>{title}</h3>
      <p className='mb-6 max-w-md text-muted-foreground'>{description}</p>
      <div className='flex gap-3'>
        {action && <Button onClick={action.onClick}>{action.label}</Button>}
        {secondaryAction && (
          <Button variant='outline' onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

// Re-export specific empty state components from focused modules
export * from './empty-states';
