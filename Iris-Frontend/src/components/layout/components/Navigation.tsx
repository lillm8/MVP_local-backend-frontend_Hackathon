'use client';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, MessageCircle, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount?: number;
  unreadMessages?: number;
  onLogout?: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  cartCount = 0,
  unreadMessages = 0,
  onLogout,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Marketplace' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'shadow-[0_1px_4px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className='mx-auto max-w-[1440px] px-8'>
        <div className='flex h-20 items-center justify-between'>
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className='duration-250 flex items-center gap-2 transition-opacity hover:opacity-70'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary'>
              <span className='text-xl text-primary-foreground'>🌿</span>
            </div>
            <span className='text-2xl tracking-tight text-primary'>Iris</span>
          </button>

          {/* Center Navigation */}
          <div className='flex items-center gap-2'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`duration-250 relative rounded-xl px-6 py-2 transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-4'>
            <button
              onClick={() => onNavigate('messages')}
              className={`duration-250 relative rounded-xl p-2.5 transition-all ${
                currentPage === 'messages'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/5'
              }`}
            >
              <MessageCircle className='h-5 w-5' />
              {unreadMessages > 0 && (
                <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground'>
                  {unreadMessages}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className='duration-250 relative rounded-xl p-2.5 transition-all hover:bg-primary/5'
            >
              <ShoppingCart className='h-5 w-5 text-foreground' />
              {cartCount > 0 && (
                <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground'>
                  {cartCount}
                </span>
              )}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`duration-250 rounded-xl p-2.5 transition-all ${
                  currentPage === 'profile'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/5'
                }`}
              >
                <User className='h-5 w-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuItem onClick={() => onNavigate('profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => onNavigate('settings')}
              className={`duration-250 rounded-xl p-2.5 transition-all ${
                currentPage === 'settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/5'
              }`}
            >
              <Settings className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
