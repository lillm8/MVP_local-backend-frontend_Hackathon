import { useMemo, useState } from 'react';

export interface Producer {
  id: number;
  name: string;
  image: string;
  distance: string;
  distanceKm: number;
  rating: number;
  verified: boolean;
  category: string;
  categoryType: string[];
  certifications: string[];
  isSeasonal?: boolean;
}

export interface ProductItem {
  id: number;
  name: string;
  producer: string;
  image: string;
  price: string;
  categoryType: string[];
  certifications: string[];
}

export function useHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [regionOpen, setRegionOpen] = useState(true);
  const [certOpen, setCertOpen] = useState(true);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'meat', label: 'Meat' },
    { id: 'organic', label: 'Organic' },
    { id: 'seasonal', label: 'Seasonal' },
  ];

  const regions = ['Within 10km', '10-20km', '20-50km'];
  const certifications = ['Organic', 'Local', 'Traceable'];

  const allProducers: Producer[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Green Valley Farm',
        image:
          'https://images.unsplash.com/photo-1573481078935-b9605167e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtZXJ8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: '12 km',
        distanceKm: 12,
        rating: 4.8,
        verified: true,
        category: 'Organic Vegetables',
        categoryType: ['vegetables', 'organic'],
        certifications: ['Organic', 'Local', 'Traceable'],
        isSeasonal: true,
      },
      {
        id: 2,
        name: 'Mountain Dairy Co.',
        image:
          'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzYxMzA3MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        distance: '8 km',
        distanceKm: 8,
        rating: 4.9,
        verified: true,
        category: 'Artisan Dairy',
        categoryType: ['dairy'],
        certifications: ['Local', 'Traceable'],
      },
    ],
    []
  );

  const allProducts: ProductItem[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Heirloom Tomatoes',
        producer: 'Green Valley Farm',
        image:
          'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
        price: '€4.50/kg',
        categoryType: ['vegetables', 'organic', 'seasonal'],
        certifications: ['Organic', 'Local'],
      },
      {
        id: 2,
        name: 'Free-Range Eggs',
        producer: 'Free Range Poultry',
        image:
          'https://images.unsplash.com/photo-1669669420238-7a4be2e3eac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZWdncyUyMGZhcm18ZW58MXx8fHwxNzYxMjcyMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        price: '€5.20/dozen',
        categoryType: ['organic'],
        certifications: ['Organic', 'Local'],
      },
    ],
    []
  );

  const filteredProducers = useMemo(() => {
    return allProducers.filter(producer => {
      const categoryMatch =
        selectedCategory === 'all' ||
        producer.categoryType.includes(selectedCategory) ||
        (selectedCategory === 'seasonal' && producer.isSeasonal);
      const regionMatch =
        selectedRegions.length === 0 ||
        selectedRegions.some(region => {
          if (region === 'Within 10km') return producer.distanceKm <= 10;
          if (region === '10-20km')
            return producer.distanceKm > 10 && producer.distanceKm <= 20;
          if (region === '20-50km')
            return producer.distanceKm > 20 && producer.distanceKm <= 50;
          return false;
        });
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every(cert => producer.certifications.includes(cert));
      return categoryMatch && regionMatch && certMatch;
    });
  }, [selectedCategory, selectedRegions, selectedCerts, allProducers]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch =
        selectedCategory === 'all' ||
        product.categoryType.includes(selectedCategory);
      const certMatch =
        selectedCerts.length === 0 ||
        selectedCerts.every(cert => product.certifications.includes(cert));
      return categoryMatch && certMatch;
    });
  }, [selectedCategory, selectedCerts, allProducts]);

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedRegions([]);
    setSelectedCerts([]);
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedRegions.length +
    selectedCerts.length;

  return {
    // state
    selectedCategory,
    setSelectedCategory,
    selectedRegions,
    setSelectedRegions,
    selectedCerts,
    setSelectedCerts,
    showFilters,
    setShowFilters,
    categoryOpen,
    setCategoryOpen,
    regionOpen,
    setRegionOpen,
    certOpen,
    setCertOpen,
    // data
    categories,
    regions,
    certifications,
    allProducers,
    allProducts,
    filteredProducers,
    filteredProducts,
    // actions
    toggleRegion,
    toggleCert,
    clearAllFilters,
    activeFilterCount,
  };
}
