import { useMemo, useState } from 'react';

type SupplierIdentity = { id: string; name: string; avatar: string };
type SupplierCategoryInfo = { category: string; categoryTypes: string[] };
type SupplierLocationInfo = { location: string; distance: number };
type SupplierReputationInfo = {
  rating: number;
  totalReviews: number;
  verified: boolean;
  certifications: string[];
};
type SupplierMediaInfo = { image: string };
type SupplierBusinessStats = {
  totalProducts: number;
  responseTime: string;
  memberSince: string;
};
type SupplierDescription = { description: string };
export type Supplier = SupplierIdentity &
  SupplierCategoryInfo &
  SupplierLocationInfo &
  SupplierReputationInfo &
  SupplierMediaInfo &
  SupplierBusinessStats &
  SupplierDescription;

export function useSuppliersPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [certOpen, setCertOpen] = useState(true);
  const [sortBy, setSortBy] = useState<string>('rating');

  const suppliers: Supplier[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Green Valley Farm',
        category: 'Organic Vegetables & Herbs',
        categoryTypes: ['Vegetables', 'Herbs'],
        location: 'Valley Ridge',
        distance: 12,
        rating: 4.8,
        totalReviews: 127,
        verified: true,
        certifications: ['Organic Certified', 'Local Producer', 'Traceable'],
        image:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
        avatar: 'GV',
        totalProducts: 24,
        responseTime: '< 2 hours',
        memberSince: 'March 2022',
        description:
          'Family-run organic farm specializing in heritage vegetables and sustainable farming practices.',
      },
    ],
    []
  );

  const categories = [
    'Vegetables',
    'Dairy',
    'Seafood',
    'Bakery',
    'Poultry',
    'Herbs',
    'Specialty',
    'Oils',
  ];
  const certifications = [
    'Organic Certified',
    'Local Producer',
    'Traceable',
    'Sustainable',
    'Free-Range',
  ];

  const toggleCategory = (category: string) =>
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  const toggleCert = (cert: string) =>
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );

  const filteredSuppliers = useMemo(() => {
    let filtered = suppliers;
    if (searchQuery) {
      filtered = filtered.filter(
        s =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategories.length > 0)
      filtered = filtered.filter(s =>
        s.categoryTypes.some(type => selectedCategories.includes(type))
      );
    if (selectedCerts.length > 0)
      filtered = filtered.filter(s =>
        selectedCerts.every(cert => s.certifications.includes(cert))
      );
    if (selectedDistance !== 'all') {
      const maxDistance = parseInt(selectedDistance);
      filtered = filtered.filter(s => s.distance <= maxDistance);
    }
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'products':
          return b.totalProducts - a.totalProducts;
        default:
          return 0;
      }
    });
    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    selectedCerts,
    selectedDistance,
    sortBy,
    suppliers,
  ]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCerts([]);
    setSelectedDistance('all');
    setSearchQuery('');
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedCerts.length +
    (selectedDistance !== 'all' ? 1 : 0);

  return {
    // state
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    selectedCerts,
    setSelectedCerts,
    toggleCert,
    selectedDistance,
    setSelectedDistance,
    showFilters,
    setShowFilters,
    categoryOpen,
    setCategoryOpen,
    certOpen,
    setCertOpen,
    sortBy,
    setSortBy,
    // data
    suppliers,
    categories,
    certifications,
    filteredSuppliers,
    activeFiltersCount,
    // actions
    clearAllFilters,
  };
}
