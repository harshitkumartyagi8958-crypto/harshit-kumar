import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CategoryType,
  GenderType,
  SortOption,
  FilterState,
  CartItem,
  ColorType
} from '../types/product';
import { PRODUCTS_DATA } from '../data/products';
import { useAuth } from './AuthContext';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export type ViewType =
  | 'home'
  | 'shop'
  | 'men'
  | 'women'
  | 'offers'
  | 'festivals'
  | 'orders'
  | 'wallet'
  | 'account'
  | 'cart'
  | 'wishlist';

interface ShopContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  clearAllFilters: () => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  
  // Cart & Wishlist (Customer-Specific via AuthContext)
  cart: CartItem[];
  addToCart: (product: Product, color?: ColorType, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  cartCount: number;
  cartSubtotal: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Product Quick Detail Modal
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Filtered & Sorted Products
  filteredProducts: Product[];
  
  // Toasts
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset
  resetDemoData: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  priceRanges: [],
  minPrice: 500,
  maxPrice: 10000,
  categories: [],
  genders: [],
  minDiscount: null,
  colors: [],
  materials: [],
  capacities: [],
  minRating: null,
  availability: [],
  brands: []
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { customerData, updateCustomerData, requireAuth, isAuthenticated, openAuthScreen } = useAuth();

  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Customer-specific cart & wishlist from AuthContext
  const cart = customerData.cart || [];
  const wishlist = customerData.wishlist || [];

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAllFilters = () => {
    setFilterState(DEFAULT_FILTERS);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const addToCart = (
    product: Product,
    color?: ColorType,
    size: string = 'Standard',
    quantity: number = 1
  ) => {
    const selectedColor = color || product.availableColors[0]?.name || 'Black';
    
    updateCustomerData((prev) => {
      const currentCart = prev.cart || [];
      const existingIndex = currentCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...currentCart];
        updated[existingIndex].quantity += quantity;
        return { ...prev, cart: updated };
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${selectedColor}-${size}-${Date.now()}`,
          product,
          selectedColor,
          selectedSize: size,
          quantity,
          addedAt: Date.now()
        };
        return { ...prev, cart: [newItem, ...currentCart] };
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    updateCustomerData((prev) => ({
      ...prev,
      cart: (prev.cart || []).filter((item) => item.id !== cartItemId)
    }));
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    updateCustomerData((prev) => ({
      ...prev,
      cart: (prev.cart || []).map((item) =>
        item.id === cartItemId ? { ...item, quantity: qty } : item
      )
    }));
  };

  const toggleWishlist = (productId: string) => {
    // Protected action: visitors must login to save to wishlist
    const allowed = requireAuth('save products to your personal Wishlist', () => {
      toggleWishlist(productId);
    });
    if (!allowed) {
      return;
    }

    const isSaved = wishlist.includes(productId);
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    const title = product ? product.name : 'Product';

    if (isSaved) {
      updateCustomerData((prev) => ({
        ...prev,
        wishlist: (prev.wishlist || []).filter((id) => id !== productId)
      }));
      addToast(`Removed "${title}" from Wishlist`, 'info');
    } else {
      updateCustomerData((prev) => ({
        ...prev,
        wishlist: [...(prev.wishlist || []), productId]
      }));
      addToast(`Saved "${title}" to Wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const resetDemoData = () => {
    if (window.confirm('Reset demo cart, wishlist, and session data to initial state?')) {
      localStorage.removeItem('dufflehub_cart');
      localStorage.removeItem('dufflehub_wishlist');
      clearAllFilters();
      setActiveView('home');
      addToast('Demo data reset successfully', 'info');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.discountedPrice * item.quantity,
    0
  );
  const wishlistCount = wishlist.length;

  // Filter and sort products
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    // View-based filtering
    if (activeView === 'men') {
      if (product.gender !== 'Men' && product.gender !== 'Unisex') return false;
    } else if (activeView === 'women') {
      if (product.gender !== 'Women' && product.gender !== 'Unisex') return false;
    } else if (activeView === 'offers') {
      if (product.discountPercentage < 30) return false;
    } else if (activeView === 'wishlist') {
      if (!wishlist.includes(product.id)) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    if (filterState.categories.length > 0 && !filterState.categories.includes(product.category)) {
      return false;
    }

    // Gender filter in shop view
    if (filterState.genders.length > 0 && !filterState.genders.includes(product.gender)) {
      return false;
    }

    // Search query: Product name, Category, Material, Colour, Gender, Product type / description
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchMaterial = product.material.toLowerCase().includes(q);
      const matchGender = product.gender.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchColors = product.availableColors.some((c) =>
        c.name.toLowerCase().includes(q)
      );

      if (
        !matchName &&
        !matchCategory &&
        !matchMaterial &&
        !matchGender &&
        !matchBrand &&
        !matchDesc &&
        !matchColors
      ) {
        return false;
      }
    }

    // Price range buttons
    if (filterState.priceRanges.length > 0) {
      const inRange = filterState.priceRanges.some((range) => {
        if (range === 'under_999') return product.discountedPrice < 1000;
        if (range === '1000_1999') return product.discountedPrice >= 1000 && product.discountedPrice <= 1999;
        if (range === '2000_2999') return product.discountedPrice >= 2000 && product.discountedPrice <= 2999;
        if (range === '3000_4999') return product.discountedPrice >= 3000 && product.discountedPrice <= 4999;
        if (range === '5000_plus') return product.discountedPrice >= 5000;
        return true;
      });
      if (!inRange) return false;
    }

    // Custom price slider
    if (product.discountedPrice < filterState.minPrice || product.discountedPrice > filterState.maxPrice) {
      return false;
    }

    // Discount percentage filter
    if (filterState.minDiscount !== null && product.discountPercentage < filterState.minDiscount) {
      return false;
    }

    // Colors filter
    if (filterState.colors.length > 0) {
      const hasColor = product.availableColors.some((c) =>
        filterState.colors.includes(c.name)
      );
      if (!hasColor) return false;
    }

    // Material filter
    if (filterState.materials.length > 0 && !filterState.materials.includes(product.material)) {
      return false;
    }

    // Capacity filter
    if (filterState.capacities.length > 0 && !filterState.capacities.includes(product.capacityCategory)) {
      return false;
    }

    // Rating filter
    if (filterState.minRating !== null && product.rating < filterState.minRating) {
      return false;
    }

    // Availability filter
    if (filterState.availability.length > 0) {
      const isAvailableMatch = filterState.availability.some((status) => {
        if (status === 'In Stock') return product.availability === 'In Stock' || product.availability === 'Low Stock';
        if (status === 'Out of Stock') return product.availability === 'Out of Stock';
        return true;
      });
      if (!isAvailableMatch) return false;
    }

    // Brand filter
    if (filterState.brands.length > 0 && !filterState.brands.includes(product.brand)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.discountedPrice - b.discountedPrice;
      case 'price_desc':
        return b.discountedPrice - a.discountedPrice;
      case 'discount_desc':
        return b.discountPercentage - a.discountPercentage;
      case 'rating_desc':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      case 'recommended':
      default:
        // Prioritize trending and high rating
        const scoreA = (a.isTrending ? 2 : 0) + a.rating;
        const scoreB = (b.isTrending ? 2 : 0) + b.rating;
        return scoreB - scoreA;
    }
  });

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filterState,
        setFilterState,
        clearAllFilters,
        sortOption,
        setSortOption,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        selectedProductForModal,
        openProductModal,
        closeProductModal,
        filteredProducts,
        toasts,
        addToast,
        removeToast,
        resetDemoData
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

