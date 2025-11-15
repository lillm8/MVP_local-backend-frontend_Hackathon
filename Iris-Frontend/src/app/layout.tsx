import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Iris Marketplace - B2B Food Supply Platform',
  description:
    'Connect restaurants with suppliers in a transparent, efficient B2B marketplace',
  keywords: [
    'B2B',
    'marketplace',
    'restaurants',
    'suppliers',
    'food',
    'supply chain',
  ],
  authors: [{ name: 'Iris Marketplace Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
