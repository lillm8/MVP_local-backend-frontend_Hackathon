'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@contexts/ThemeContext';
import { CartProvider } from '@contexts/CartContext';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const isClerkConfigured =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !==
      'pk_test_mock_key_for_build';

  const AppContent = (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );

  if (!isClerkConfigured) {
    return AppContent;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {AppContent}
    </ClerkProvider>
  );
}
