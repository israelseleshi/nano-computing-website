export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  image: string;
  images?: string[];
  features: string[];
  inStock: boolean;
  shippingTime: string;
  warranty: string;
  description: string;
  detailedDescription?: string;
  quickSpecs?: Record<string, { icon: any; value: string }>;
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}
