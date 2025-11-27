export type Category = 'Books' | 'Stationery' | 'Sets' | 'Art';

export interface Product {
  id: string;
  title: string;
  author?: string; // Only for books
  price: number;
  oldPrice?: number;
  category: Category;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  tags: string[];
  isNew?: boolean;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

export enum SortOption {
  POPULAR = 'popular',
  NEWEST = 'newest',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
}