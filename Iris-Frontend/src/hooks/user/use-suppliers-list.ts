import { toast } from 'sonner';

export interface SupplierListItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  totalOrders: number;
  monthlySpend: string;
  lastOrder: string;
  relationship: string;
  contactEmail: string;
  contactPhone: string;
  hasContract: boolean;
  image: string;
}

export function useSuppliersList() {
  const suppliersList: SupplierListItem[] = [
    {
      id: 1,
      name: 'Green Valley Farm',
      category: 'Organic Vegetables',
      rating: 4.8,
      totalOrders: 28,
      monthlySpend: '€1,247',
      lastOrder: '2 days ago',
      relationship: 'Premium Partner',
      contactEmail: 'orders@greenvalley.com',
      contactPhone: '+1 (555) 123-4567',
      hasContract: true,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    },
    {
      id: 2,
      name: 'Mountain Dairy Co.',
      category: 'Dairy Products',
      rating: 4.6,
      totalOrders: 19,
      monthlySpend: '€892',
      lastOrder: '1 week ago',
      relationship: 'Regular Supplier',
      contactEmail: 'sales@mountaindairy.com',
      contactPhone: '+1 (555) 234-5678',
      hasContract: true,
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    },
    {
      id: 3,
      name: 'Heritage Bakery',
      category: 'Artisan Bread & Pastries',
      rating: 4.9,
      totalOrders: 15,
      monthlySpend: '€675',
      lastOrder: '3 days ago',
      relationship: 'Preferred Vendor',
      contactEmail: 'contact@heritagebakery.com',
      contactPhone: '+1 (555) 345-6789',
      hasContract: false,
      image:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    },
  ];

  const handleReorder = (orderId: string, supplier: string) => {
    toast.success(`Reordering from ${supplier}`, {
      description: `Order ${orderId} has been added to your cart.`,
    });
  };

  const handleContactSupplier = (supplier: string) => {
    toast.success(`Opening message to ${supplier}`);
  };

  return {
    suppliersList,
    handleReorder,
    handleContactSupplier,
  };
}
