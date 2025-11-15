'use client';

import { forwardRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { cn } from '@/utils/utils';

interface FormSelectProps {
  placeholder?: string;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  ({ className, error, placeholder, children, ...props }, ref) => {
    return (
      <Select {...props}>
        <SelectTrigger
          className={cn(
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    );
  }
);

FormSelect.displayName = 'FormSelect';

// Helper component for select items
export function FormSelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <SelectItem value={value}>{children}</SelectItem>;
}
