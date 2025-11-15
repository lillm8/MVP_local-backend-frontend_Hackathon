// Base ErrorState component

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Alert, AlertDescription } from '@components/ui/alert';
import { cn } from '../utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  error?: Error | string;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
  variant?: 'default' | 'minimal' | 'full';
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  error,
  onRetry,
  onGoHome,
  className,
  variant = 'default',
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  if (variant === 'minimal') {
    return (
      <Alert variant='destructive' className={cn('max-w-md', className)}>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>{errorMessage || description}</AlertDescription>
      </Alert>
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
          <div className='mb-6'>
            <AlertTriangle className='mx-auto mb-4 h-16 w-16 text-destructive' />
            <h1 className='mb-2 text-2xl font-bold text-foreground'>{title}</h1>
            <p className='mb-6 text-muted-foreground'>
              {errorMessage || description}
            </p>
          </div>
          <div className='space-y-3'>
            {onRetry && (
              <Button onClick={onRetry} className='w-full'>
                <RefreshCw className='mr-2 h-4 w-4' />
                Try Again
              </Button>
            )}
            {onGoHome && (
              <Button variant='outline' onClick={onGoHome} className='w-full'>
                <Home className='mr-2 h-4 w-4' />
                Go Home
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
      <AlertTriangle className='mb-4 h-12 w-12 text-destructive' />
      <h3 className='mb-2 text-xl font-semibold text-foreground'>{title}</h3>
      <p className='mb-6 max-w-md text-muted-foreground'>
        {errorMessage || description}
      </p>
      <div className='flex gap-3'>
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className='mr-2 h-4 w-4' />
            Try Again
          </Button>
        )}
        {onGoHome && (
          <Button variant='outline' onClick={onGoHome}>
            <Home className='mr-2 h-4 w-4' />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
}
