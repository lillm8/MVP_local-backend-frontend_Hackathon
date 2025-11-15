import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footer,
}: AuthLayoutProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5'>
      <div className='flex min-h-screen items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          {/* Logo */}
          <div className='mb-8 text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_4px_16px_rgba(45,77,49,0.3)]'>
              <span className='text-3xl text-primary-foreground'>🌿</span>
            </div>
            <h1 className='mb-2 text-4xl tracking-tight text-primary'>
              {title}
            </h1>
            <p className='text-muted-foreground'>{subtitle}</p>
          </div>

          {/* Main Content */}
          <div className='overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]'>
            <div className='bg-gradient-to-br from-primary/5 to-accent/5 p-6'>
              <h2 className='text-center text-2xl text-primary'>
                Welcome Back
              </h2>
            </div>
            {children}
          </div>

          {/* Footer */}
          {footer && <div className='mt-8'>{footer}</div>}
        </div>
      </div>
    </div>
  );
}
