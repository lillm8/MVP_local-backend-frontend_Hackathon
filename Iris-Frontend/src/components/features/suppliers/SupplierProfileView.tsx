'use client';

import { Card } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CoverHeader } from './supplier-profile/CoverHeader';
import { SupplierInfoSection } from './supplier-profile/SupplierInfoSection';
import { ProductsTab } from './supplier-profile/ProductsTab';
import { ReviewsTab } from './supplier-profile/ReviewsTab';
import { AboutTab } from './supplier-profile/AboutTab';
import { useSupplierProfileView } from '@/hooks/suppliers/use-supplier-profile-view';

export interface SupplierProfileViewProps {
  supplierId: string;
  onBack: () => void;
}

export function SupplierProfileView({
  supplierId,
  onBack,
}: SupplierProfileViewProps) {
  const { isFavorite, handleAddToCart, handleToggleFavorite, handleContact } =
    useSupplierProfileView({ supplierId });

  // Mock supplier data - in real app, fetch based on supplierId
  const supplier = {
    id: supplierId,
    name: 'Green Valley Farm',
    category: 'Organic Vegetables & Herbs',
    location: 'Valley Ridge, 12 km from city center',
    verified: true,
    rating: 4.8,
    totalReviews: 127,
    memberSince: 'March 2022',
    description:
      'Family-run organic farm specializing in heritage vegetables and sustainable farming practices. We use traditional methods passed down through generations, ensuring the highest quality produce while respecting the environment.',
    certifications: [
      'Organic Certified',
      'Local Producer',
      'Traceable',
      'Carbon Neutral',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200',
    avatar: 'GV',
    stats: {
      totalProducts: 24,
      totalOrders: 1247,
      responseTime: '< 2 hours',
      deliveryRate: '98%',
    },
    products: [
      {
        id: 1,
        name: 'Heirloom Tomatoes',
        price: 4.5,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?w=400',
        inStock: true,
        description: 'Organic heritage variety tomatoes',
      },
      {
        id: 2,
        name: 'Organic Carrots',
        price: 3.2,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
        inStock: true,
        description: 'Fresh organic carrots',
      },
      {
        id: 3,
        name: 'Seasonal Greens Mix',
        price: 3.8,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        inStock: true,
        description: 'Variety of seasonal greens',
      },
      {
        id: 4,
        name: 'Heritage Beets',
        price: 4.2,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400',
        inStock: true,
        description: 'Multi-colored heritage beets',
      },
      {
        id: 5,
        name: 'Fresh Herbs Bundle',
        price: 5.5,
        unit: 'bundle',
        image:
          'https://images.unsplash.com/photo-1583163651581-0b9ed2c9c78f?w=400',
        inStock: true,
        description: 'Basil, thyme, rosemary mix',
      },
      {
        id: 6,
        name: 'Baby Potatoes',
        price: 2.9,
        unit: 'kg',
        image:
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
        inStock: false,
        description: 'Small organic potatoes',
      },
    ],
    reviews: [
      {
        id: 1,
        restaurant: 'La Cucina',
        rating: 5,
        comment:
          'Exceptional quality and freshness. The heirloom tomatoes are amazing!',
        date: '2024-10-20',
        verified: true,
      },
      {
        id: 2,
        restaurant: 'Green Table Bistro',
        rating: 5,
        comment:
          'Consistent quality and always on time. Best organic supplier in the region.',
        date: '2024-10-15',
        verified: true,
      },
      {
        id: 3,
        restaurant: 'Farm to Fork',
        rating: 4,
        comment:
          'Great products, though sometimes limited variety in winter months.',
        date: '2024-10-10',
        verified: true,
      },
    ],
    contact: {
      email: 'orders@greenvalley.com',
      phone: '+1 (555) 123-4567',
      website: 'www.greenvalleyfarm.com',
    },
  };

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <CoverHeader
          name={supplier.name}
          verified={supplier.verified}
          location={supplier.location}
          coverImage={supplier.coverImage}
          avatarCode={supplier.avatar}
          onBack={onBack}
          onToggleFavorite={handleToggleFavorite}
          onContact={handleContact}
          isFavorite={isFavorite}
        />

        <Card className='mb-8 overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
          <SupplierInfoSection
            display={{
              rating: supplier.rating,
              totalReviews: supplier.totalReviews,
              memberSince: supplier.memberSince,
            }}
            content={{
              description: supplier.description,
              certifications: supplier.certifications,
            }}
            stats={supplier.stats}
          />
        </Card>

        <Tabs defaultValue='products' className='w-full'>
          <TabsList className='mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='products' className='rounded-xl'>
              Products ({supplier.products.length})
            </TabsTrigger>
            <TabsTrigger value='reviews' className='rounded-xl'>
              Reviews ({supplier.reviews.length})
            </TabsTrigger>
            <TabsTrigger value='about' className='rounded-xl'>
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value='products' className='mt-0'>
            <ProductsTab
              products={supplier.products}
              onAddToCart={handleAddToCart}
            />
          </TabsContent>

          <TabsContent value='reviews' className='mt-0'>
            <ReviewsTab
              rating={supplier.rating}
              totalReviews={supplier.totalReviews}
              reviews={supplier.reviews}
            />
          </TabsContent>

          <TabsContent value='about' className='mt-0'>
            <AboutTab
              contact={supplier.contact}
              location={supplier.location}
              category={supplier.category}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
