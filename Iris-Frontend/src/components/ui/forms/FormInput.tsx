'use client';

import { forwardRef } from 'react';
import { Input } from '@components/ui/input';
import { cn } from '@/utils/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Input
        className={cn(
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

FormInput.displayName = 'FormInput';
