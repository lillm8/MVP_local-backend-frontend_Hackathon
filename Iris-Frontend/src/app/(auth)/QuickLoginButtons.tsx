import { Store, UtensilsCrossed } from 'lucide-react';
import { useLogin } from 'hooks/auth/use-login';
import { UserRole } from '@/types';

export function QuickLoginButtons() {
  const { quickLogin } = useLogin();

  return (
    <div className='mt-8'>
      <p className='mb-4 text-center text-sm text-muted-foreground'>
        Quick login for demo
      </p>
      <div className='grid gap-3 sm:grid-cols-2'>
        <button
          onClick={() => quickLogin(UserRole.RESTAURANT)}
          className='duration-250 group rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
        >
          <div className='mb-2 flex items-center justify-center'>
            <div className='rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20'>
              <UtensilsCrossed className='h-6 w-6 text-primary' />
            </div>
          </div>
          <h3 className='mb-1 text-center'>Restaurant</h3>
          <p className='text-center text-xs text-muted-foreground'>
            Browse & order products
          </p>
        </button>

        <button
          onClick={() => quickLogin(UserRole.SUPPLIER)}
          className='duration-250 group rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
        >
          <div className='mb-2 flex items-center justify-center'>
            <div className='rounded-full bg-accent/10 p-3 transition-colors group-hover:bg-accent/20'>
              <Store className='h-6 w-6 text-accent' />
            </div>
          </div>
          <h3 className='mb-1 text-center'>Supplier</h3>
          <p className='text-center text-xs text-muted-foreground'>
            Manage your store
          </p>
        </button>
      </div>
    </div>
  );
}
