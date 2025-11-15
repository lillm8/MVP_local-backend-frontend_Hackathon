import { useState } from 'react';
import { Leaf, MapPin, Award } from 'lucide-react';

export interface ProductBadgeDef {
  icon: any;
  label: string;
  color: string;
}

type ProductIdentity = {
  name: string;
  producer: string;
  image: string;
};

type ProductPricing = {
  price: number;
  unit: string;
};

type ProductMeta = {
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  delivery: string;
  badges: ProductBadgeDef[];
  description: string;
  producerInfo: string;
};

export type ProductData = ProductIdentity & ProductPricing & ProductMeta;

export type SimilarProductItem = {
  id: number;
  name: string;
  producer: string;
  price: string;
  priceValue: number;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  deliveryTime: string;
  stockAvailable: string;
  badges: string[];
  verified: boolean;
  isBestPrice: boolean;
  isBestRating: boolean;
  isBestDelivery: boolean;
};

export type ReviewItem = {
  id: number;
  author: string;
  restaurant: string;
  rating: number;
  comment: string;
  date: string;
};

export function useProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [showCompare, setShowCompare] = useState(false);
  const [highlightBest, setHighlightBest] = useState(false);

  const product: ProductData = {
    name: 'Heirloom Tomatoes',
    producer: 'Green Valley Farm',
    price: 4.5,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMGZyZXNoJTIwbWFya2V0fGVufDF8fHx8MTc2MTMwNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 127,
    location: '12 km away',
    verified: true,
    delivery: 'Thursday 8 AM',
    badges: [
      { icon: Leaf, label: 'Organic', color: 'text-primary' },
      { icon: MapPin, label: 'Local', color: 'text-accent' },
      { icon: Award, label: 'Traceable', color: 'text-primary' },
    ],
    description:
      'Our heirloom tomatoes are grown using traditional methods passed down through generations. Each variety is carefully selected for its unique flavor profile, vibrant color, and nutritional value. Hand-picked at peak ripeness to ensure maximum taste and quality.',
    producerInfo:
      'Green Valley Farm has been a family-run organic farm for over 40 years. Located in the heart of the countryside, we practice sustainable farming methods and take pride in delivering the freshest produce to local restaurants.',
  };

  const similarProducts: SimilarProductItem[] = [
    {
      id: 1,
      name: 'Heirloom Tomatoes',
      producer: 'Green Valley Farm',
      price: '€4.50/kg',
      priceValue: 4.5,
      image: product.image,
      rating: 4.8,
      reviews: 127,
      location: '12 km away',
      deliveryTime: '24 hours',
      stockAvailable: 'In Stock',
      badges: ['Organic', 'Local', 'Traceable'],
      verified: true,
      isBestPrice: false,
      isBestRating: true,
      isBestDelivery: false,
    },
    {
      id: 2,
      name: 'Cherry Tomatoes',
      producer: 'Sunrise Organic',
      price: '€3.80/kg',
      priceValue: 3.8,
      image: product.image,
      rating: 4.6,
      reviews: 89,
      location: '18 km away',
      deliveryTime: '12 hours',
      stockAvailable: 'In Stock',
      badges: ['Organic', 'Local'],
      verified: true,
      isBestPrice: false,
      isBestRating: false,
      isBestDelivery: true,
    },
    {
      id: 3,
      name: 'Roma Tomatoes',
      producer: 'Heritage Produce',
      price: '€3.20/kg',
      priceValue: 3.2,
      image: product.image,
      rating: 4.7,
      reviews: 95,
      location: '25 km away',
      deliveryTime: '48 hours',
      stockAvailable: 'Limited Stock',
      badges: ['Organic', 'Traceable'],
      verified: false,
      isBestPrice: true,
      isBestRating: false,
      isBestDelivery: false,
    },
  ];

  const reviews: ReviewItem[] = [
    {
      id: 1,
      author: 'Chef Marco',
      restaurant: 'La Cucina',
      rating: 5,
      comment:
        'Exceptional quality! The flavor is outstanding and our customers love them.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      author: 'Chef Sarah',
      restaurant: 'Green Table',
      rating: 5,
      comment: "Best tomatoes we've sourced. Perfect for our summer menu.",
      date: '3 weeks ago',
    },
  ];

  return {
    // state
    quantity,
    setQuantity,
    imageScale,
    setImageScale,
    showCompare,
    setShowCompare,
    highlightBest,
    setHighlightBest,
    // data
    product,
    similarProducts,
    reviews,
  };
}
