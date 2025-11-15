import { SupplierCard } from './SupplierCard';

type SupplierGridItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  avatar: string;
  verified: boolean;
  rating: number;
  totalReviews: number;
  distance: number;
  certifications: string[];
  totalProducts: number;
  responseTime: string;
  description: string;
};

interface SuppliersGridProps {
  items: SupplierGridItem[];
  onClick: (id: string) => void;
}

export function SuppliersGrid({ items, onClick }: SuppliersGridProps) {
  if (items.length === 0) return null;
  return (
    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
      {items.map(supplier => (
        <SupplierCard key={supplier.id} {...supplier} onClick={onClick} />
      ))}
    </div>
  );
}
