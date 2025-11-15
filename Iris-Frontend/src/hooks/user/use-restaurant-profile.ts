import { useState } from 'react';
import { toast } from 'sonner';

export interface RestaurantMenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface RestaurantMenuCategory {
  category: string;
  items: RestaurantMenuItem[];
}

export interface SupplierNeed {
  category: string;
  frequency: string;
  averageOrder: string;
  preferences: string;
}

interface RestaurantIdentityInfo {
  name: string;
  type: string;
  cuisine: string[];
  location: string;
  description: string;
  coverImage: string;
}

interface RestaurantOperationsInfo {
  seatingCapacity: string;
  established: string;
  orderVolume: string;
  leadTime: string;
  deliveryWindow: string;
  paymentTerms: string;
  minimumOrder: string;
}

interface RestaurantContactInfo {
  email: string;
  phone: string;
  website: string;
}

interface RestaurantRelationsInfo {
  menu: RestaurantMenuCategory[];
  supplierNeeds: SupplierNeed[];
}

export type RestaurantProfile = RestaurantIdentityInfo &
  RestaurantOperationsInfo &
  RestaurantContactInfo &
  RestaurantRelationsInfo;

export interface TopSupplierSummary {
  name: string;
  orders: number;
  spend: string;
}

export function useRestaurantProfile() {
  const [restaurantProfile, setRestaurantProfile] = useState<RestaurantProfile>(
    {
      name: 'La Bella Cucina',
      type: 'Italian Fine Dining',
      cuisine: ['Italian', 'Mediterranean'],
      location: '123 Gastronomy Street, Culinary District',
      description:
        'An authentic Italian fine dining experience bringing traditional recipes from Tuscany with a modern twist. We pride ourselves on using locally sourced, organic ingredients to create unforgettable culinary experiences.',
      coverImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
      seatingCapacity: '85',
      established: '2020',
      orderVolume: '€12,500/month',
      email: 'orders@labellacucina.com',
      phone: '+1 (555) 987-6543',
      website: 'www.labellacucina.com',
      leadTime: '48 hours',
      deliveryWindow: '6:00 AM - 9:00 AM',
      paymentTerms: 'Net 30',
      minimumOrder: '€100',
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
      ],
    }
  );

  const restaurantInfo = {
    name: restaurantProfile.name,
    type: restaurantProfile.type,
    address: restaurantProfile.location,
    memberSince: 'January 2024',
  };

  const metrics = [
    {
      label: 'Monthly Orders',
      value: '47',
      change: '+12%',
      trend: 'up' as const,
    },
    {
      label: 'Reorder Rate',
      value: '87%',
      change: '+5%',
      trend: 'up' as const,
    },
    {
      label: 'Waste Reduction',
      value: '23%',
      change: '+8%',
      trend: 'up' as const,
    },
  ];

  const topSuppliers: TopSupplierSummary[] = [
    { name: 'Green Valley Farm', orders: 28, spend: '€1,247' },
    { name: 'Mountain Dairy Co.', orders: 19, spend: '€892' },
    { name: 'Heritage Bakery', orders: 15, spend: '€675' },
  ];

  const sustainabilityScore = 82;

  const handleSaveProfile = (updatedProfile: RestaurantProfile) => {
    setRestaurantProfile(updatedProfile);
    toast.success('Restaurant profile updated successfully!');
  };

  return {
    restaurantProfile,
    setRestaurantProfile,
    restaurantInfo,
    metrics,
    topSuppliers,
    sustainabilityScore,
    handleSaveProfile,
  };
}
