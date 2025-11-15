'use client';

import { ReactNode } from 'react';
import { Label } from '@components/ui/label';
import { cn } from '@/utils/utils';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  children,
  error,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className='text-sm font-medium'>
        {label}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </Label>
      {children}
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
