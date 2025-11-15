'use client';

import { useState } from 'react';
import { Navigation } from '@components/layout';
import { HomePage } from '@components/features/home';
import { SuppliersPage } from '@components/features/suppliers/SuppliersPage';
import { SupplierProfileView } from '@components/features/suppliers/SupplierProfileView';
import { SupplierDashboard } from '@components/features/suppliers/supplier-dashboard/SupplierDashboard';
import { ProductPage } from '@components/features/products';
import { CartPage } from '@components/features/cart';
import { OrdersPage } from '@components/features/orders';
import {
  LoginPage,
  FavoritesPage,
  MessagesPage,
  ProfilePage,
  SettingsPage,
  RestaurantProfileView,
} from '@components/features/user';
import { Toaster } from '@components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'supplier' | 'restaurant' | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(3);

  const handleLogin = (type: 'supplier' | 'restaurant') => {
    setUserType(type);
    setIsAuthenticated(true);
    toast.success('Welcome!', {
      description: `Logged in as ${type}`,
      duration: 3000,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentPage('home');
    setCartCount(0);
    toast.success('Logged out successfully', {
      duration: 3000,
    });
  };

  const handleNavigate = (page: string, profileId?: string) => {
    setCurrentPage(page);
    setCurrentProfileId(profileId || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    toast.success('Added to cart', {
      description: 'Item has been added to your cart',
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    toast.success('Order placed!', {
      description: 'Your order has been confirmed',
      duration: 3000,
    });
    setCartCount(0);
    handleNavigate('orders');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster position='bottom-right' />
      </>
    );
  }

  // Show supplier dashboard if logged in as supplier
  if (userType === 'supplier') {
    return (
      <>
        <SupplierDashboard onLogout={handleLogout} />
        <Toaster position='bottom-right' />
      </>
    );
  }

  // Show restaurant marketplace if logged in as restaurant
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigateToProduct={() => handleNavigate('product')}
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'suppliers':
        return (
          <SuppliersPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'product':
        return <ProductPage onAddToCart={handleAddToCart} />;
      case 'cart':
        return <CartPage onCheckout={handleCheckout} />;
      case 'favorites':
        return (
          <FavoritesPage
            onNavigateToProduct={() => handleNavigate('product')}
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'orders':
        return (
          <OrdersPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'messages':
        return (
          <MessagesPage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
      case 'settings':
        return <SettingsPage />;
      case 'supplier-profile':
        return (
          <SupplierProfileView
            supplierId={currentProfileId || '1'}
            onBack={() => handleNavigate('suppliers')}
          />
        );
      default:
        return (
          <HomePage
            onNavigateToProduct={() => handleNavigate('product')}
            onViewSupplier={id => handleNavigate('supplier-profile', id)}
          />
        );
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onLogout={handleLogout}
        unreadMessages={unreadMessages}
      />
      <main>{renderPage()}</main>
      <Toaster position='bottom-right' />
    </div>
  );
}
