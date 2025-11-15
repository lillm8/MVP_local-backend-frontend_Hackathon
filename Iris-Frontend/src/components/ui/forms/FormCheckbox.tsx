'use client';

import { forwardRef } from 'react';
import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@/utils/utils';

interface FormCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  label?: string;
  error?: boolean;
  className?: string;
}

export const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <Checkbox
          ref={ref}
          className={cn(
            error && 'border-red-500 data-[state=checked]:bg-red-500',
            className
          )}
          {...props}
        />
        {label && (
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {label}
          </label>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';
