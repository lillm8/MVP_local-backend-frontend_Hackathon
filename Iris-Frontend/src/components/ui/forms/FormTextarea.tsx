'use client';

import { forwardRef } from 'react';
import { Textarea } from '@components/ui/textarea';
import { cn } from '@/utils/utils';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Textarea
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

FormTextarea.displayName = 'FormTextarea';
