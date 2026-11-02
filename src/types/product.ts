export type CategoryType =
  | 'Travel Duffle Bags'
  | 'Gym Duffle Bags'
  | 'Sports Duffle Bags'
  | 'Weekend Duffle Bags'
  | 'Leather Duffle Bags'
  | 'Waterproof Duffle Bags'
  | 'Laptop Duffle Bags'
  | 'Convertible Duffle Bags'
  | 'Cabin Duffle Bags'
  | 'Large-Capacity Duffle Bags';

export type GenderType = 'Men' | 'Women' | 'Unisex';

export type MaterialType = 'Polyester' | 'Nylon' | 'Canvas' | 'Leather' | 'Synthetic';

export type ColorType = 'Black' | 'Blue' | 'Brown' | 'Grey' | 'Green' | 'Red' | 'Beige';

export type CapacityCategory = 'Under 20L' | '20–30L' | '30–40L' | '40–50L' | '50L+';

export type SortOption =
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'discount_desc'
  | 'rating_desc'
  | 'newest';

export interface ProductColorOption {
  name: ColorType;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  gender: GenderType;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  availableColors: ProductColorOption[];
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  images: string[];
  capacityLiters: number;
  capacityCategory: CapacityCategory;
  material: MaterialType;
  weightKg: number;
  dimensionsCm: string; // e.g., "52 x 28 x 26 cm"
  compartmentsCount: number;
  isWaterproof: boolean;
  hasLaptopCompartment: boolean;
  laptopSizeLimit?: string; // e.g. "15.6 inch"
  description: string;
  shippingInfo: string;
  returnPolicy: string;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBestDeal?: boolean;
  isTravelEssential?: boolean;
  brand: string;
}

export interface FilterState {
  priceRanges: string[]; // e.g. ['under_999', '1000_1999', etc]
  minPrice: number;
  maxPrice: number;
  categories: CategoryType[];
  genders: GenderType[];
  minDiscount: number | null; // e.g. 10, 20, 30, 40, 50
  colors: ColorType[];
  materials: MaterialType[];
  capacities: CapacityCategory[];
  minRating: number | null; // 4, 3
  availability: ('In Stock' | 'Out of Stock')[];
  brands: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorType;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}
