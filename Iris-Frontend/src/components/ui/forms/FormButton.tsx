'use client';

import { forwardRef } from 'react';
import { Button } from '@components/ui/button';
import { cn } from '@/utils/utils';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn(className)}
        variant={variant}
        size={size}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

FormButton.displayName = 'FormButton';
