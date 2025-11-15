'use client';

import { Card } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CoverHeader } from './CoverHeader';
import { RestaurantInfoSection } from './RestaurantInfoSection';
import { MenuTab } from './MenuTab';
import { SupplyNeedsTab } from './SupplyNeedsTab';
import { OrderingInfoTab } from './OrderingInfoTab';
import { SupplierAnalyticsCard } from './SupplierAnalyticsCard';
import { OrderHistoryCard } from './OrderHistoryCard';
import { PrivateNotesCard } from './PrivateNotesCard';
import { useRestaurantProfileView } from '@/hooks/user/use-restaurant-profile-view';

export interface RestaurantProfileViewProps {
  restaurantId: string;
  onBack: () => void;
  isSupplierView?: boolean;
}

export function RestaurantProfileView({
  restaurantId,
  onBack,
  isSupplierView,
}: RestaurantProfileViewProps) {
  const {
    notes,
    setNotes,
    isFavorite,
    handleContact,
    handleProposal,
    handleFavorite,
    handleSaveNotes,
  } = useRestaurantProfileView({ restaurantId });

  // Mock restaurant data - in real app, fetch based on restaurantId
  const restaurant = {
    id: restaurantId,
    name: 'La Bella Cucina',
    type: 'Italian Fine Dining',
    cuisine: ['Italian', 'Mediterranean'],
    location: '123 Gastronomy Street, Culinary District',
    rating: 4.7,
    totalReviews: 342,
    memberSince: 'January 2024',
    description:
      'An authentic Italian fine dining experience bringing traditional recipes from Tuscany with a modern twist. We pride ourselves on using locally sourced, organic ingredients to create unforgettable culinary experiences.',
    coverImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    avatar: 'LC',
    stats: {
      seatingCapacity: 85,
      avgMonthlyOrders: 47,
      established: '2020',
      orderVolume: '€12,500/month',
    },
    menu: [
      {
        category: 'Antipasti',
        items: [
          {
            name: 'Bruschetta al Pomodoro',
            description:
              'Grilled bread topped with fresh tomatoes, basil, and extra virgin olive oil',
            price: '€12',
            image:
              'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
          },
          {
            name: 'Burrata con Prosciutto',
            description: 'Creamy burrata with aged prosciutto and arugula',
            price: '€18',
            image:
              'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400',
          },
        ],
      },
      {
        category: 'Primi Piatti',
        items: [
          {
            name: 'Tagliatelle al Tartufo',
            description: 'Fresh pasta with black truffle and parmesan',
            price: '€28',
            image:
              'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
          },
          {
            name: 'Risotto ai Funghi',
            description: 'Creamy risotto with wild mushrooms',
            price: '€24',
            image:
              'https://images.unsplash.com/photo-1476124369491-c7addf8a3b52?w=400',
          },
        ],
      },
      {
        category: 'Secondi',
        items: [
          {
            name: 'Osso Buco alla Milanese',
            description: 'Braised veal shanks with saffron risotto',
            price: '€38',
            image:
              'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
          },
          {
            name: 'Branzino al Forno',
            description: 'Oven-roasted sea bass with herbs and lemon',
            price: '€35',
            image:
              'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400',
          },
        ],
      },
    ],
    supplierNeeds: [
      {
        category: 'Vegetables',
        frequency: 'Twice weekly',
        averageOrder: '€250',
        preferences: 'Organic, locally sourced',
      },
      {
        category: 'Seafood',
        frequency: 'Daily',
        averageOrder: '€450',
        preferences: 'Fresh, sustainable sources',
      },
      {
        category: 'Dairy',
        frequency: 'Weekly',
        averageOrder: '€180',
        preferences: 'Premium Italian cheeses',
      },
      {
        category: 'Herbs & Spices',
        frequency: 'Weekly',
        averageOrder: '€120',
        preferences: 'Fresh herbs, specialty spices',
      },
    ],
    contact: {
      email: 'orders@labellacucina.com',
      phone: '+1 (555) 987-6543',
      website: 'www.labellacucina.com',
    },
    orderingPreferences: {
      leadTime: '48 hours',
      deliveryWindow: '6:00 AM - 9:00 AM',
      paymentTerms: 'Net 30',
      minimumOrder: '€100',
    },
  };

  const supplierAnalytics = {
    totalRevenue: '€12,543',
    totalOrders: 47,
    avgOrderValue: '€267',
    lastOrderDate: '2 days ago',
    orderFrequency: 'Weekly',
    topProducts: ['Tomatoes', 'Fresh Herbs', 'Mozzarella'],
  };

  const orderHistory = [
    {
      id: 'ORD-1234',
      date: '2024-10-20',
      items: ['Tomatoes', 'Basil', 'Mozzarella'],
      total: '€265.50',
      status: 'Delivered',
    },
    {
      id: 'ORD-1198',
      date: '2024-10-13',
      items: ['Olive Oil', 'Parmesan', 'Fresh Herbs'],
      total: '€189.30',
      status: 'Delivered',
    },
    {
      id: 'ORD-1167',
      date: '2024-10-06',
      items: ['Tomatoes', 'Arugula', 'Burrata'],
      total: '€245.00',
      status: 'Delivered',
    },
  ];

  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='mx-auto max-w-[1440px] px-8'>
        <CoverHeader
          name={restaurant.name}
          type={restaurant.type}
          coverImage={restaurant.coverImage}
          avatarCode={restaurant.avatar}
          onBack={onBack}
          onContact={handleContact}
          onProposal={handleProposal}
          onToggleFavorite={handleFavorite}
          isFavorite={isFavorite}
        />

        <Card className='mb-8 overflow-hidden rounded-3xl border-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
          <RestaurantInfoSection
            display={{
              rating: restaurant.rating,
              totalReviews: restaurant.totalReviews,
              location: restaurant.location,
              memberSince: restaurant.memberSince,
            }}
            content={{
              description: restaurant.description,
              cuisine: restaurant.cuisine,
            }}
            stats={restaurant.stats}
          />
        </Card>

        <Tabs defaultValue='menu' className='w-full'>
          <TabsList className='mb-6 inline-flex h-12 rounded-2xl bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)]'>
            <TabsTrigger value='menu' className='rounded-xl'>
              Menu
            </TabsTrigger>
            <TabsTrigger value='needs' className='rounded-xl'>
              Supply Needs
            </TabsTrigger>
            <TabsTrigger value='ordering' className='rounded-xl'>
              Ordering Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value='menu' className='mt-0'>
            <MenuTab menu={restaurant.menu} />
          </TabsContent>

          <TabsContent value='needs' className='mt-0'>
            <SupplyNeedsTab supplierNeeds={restaurant.supplierNeeds} />
          </TabsContent>

          <TabsContent value='ordering' className='mt-0'>
            <OrderingInfoTab
              contact={restaurant.contact}
              orderingPreferences={restaurant.orderingPreferences}
            />
          </TabsContent>
        </Tabs>

        {isSupplierView && (
          <div className='mt-8 space-y-6'>
            <div className='grid gap-6 lg:grid-cols-3'>
              <SupplierAnalyticsCard analytics={supplierAnalytics} />
              <OrderHistoryCard orders={orderHistory} />
            </div>
            <PrivateNotesCard
              notes={notes}
              onNotesChange={setNotes}
              onSave={handleSaveNotes}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantProfileView;
