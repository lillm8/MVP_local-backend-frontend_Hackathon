'use client';

import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { cn } from '@/utils/utils';

interface FormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormLayout({
  title,
  description,
  children,
  className,
}: FormLayoutProps) {
  return (
    <Card className={cn('mx-auto w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='space-y-6'>{children}</CardContent>
    </Card>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h3 className='text-lg font-medium'>{title}</h3>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      <div className='space-y-4'>{children}</div>
    </div>
  );
}

interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn('flex justify-end space-x-2 border-t pt-6', className)}>
      {children}
    </div>
  );
}
