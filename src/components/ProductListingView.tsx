import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { SortOption, CategoryType } from '../types/product';
import { CATEGORIES_LIST } from '../data/products';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw,
  Sparkles,
  Info,
  X,
  Layers
} from 'lucide-react';

export const ProductListingView: React.FC = () => {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    activeView,
    setActiveView,
    clearAllFilters,
    filterState,
    setFilterState
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active category details
  const activeCategoryMeta = CATEGORIES_LIST.find((c) => c.id === selectedCategory);

  const getPageTitle = () => {
    if (searchQuery.trim()) {
      return `Search results for "${searchQuery}"`;
    }
    if (activeView === 'men') {
      return "Men's Duffle Collection";
    }
    if (activeView === 'women') {
      return "Women's Duffle Collection";
    }
    if (activeView === 'offers') {
      return 'Exclusive Offers & Flash Deals';
    }
    if (activeView === 'wishlist') {
      return 'Your Saved Wishlist';
    }
    if (selectedCategory !== 'All') {
      return selectedCategory;
    }
    return 'All Duffle Bags';
  };

  const getPageSubtitle = () => {
    if (searchQuery.trim()) {
      return `Showing matching duffle bags across materials, colors, and types.`;
    }
    if (activeCategoryMeta) {
      return activeCategoryMeta.description;
    }
    if (activeView === 'men') {
      return 'High-durability gym, leather weekender, and tactical bags engineered for men.';
    }
    if (activeView === 'women') {
      return 'Ergonomic studio bags, compact flight cabin bags, and elegant weekend carryalls for women.';
    }
    if (activeView === 'offers') {
      return 'Handpicked duffle models on special limited-time promotional pricing.';
    }
    if (activeView === 'wishlist') {
      return 'Your curated favorites saved for future getaways and workouts.';
    }
    return 'Explore the complete archive of engineered travel, gym, and leather duffle bags.';
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Section Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('home')}
              className="hover:text-neutral-900 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveView('shop');
                setSelectedCategory('All');
              }}
              className="hover:text-neutral-900 transition-colors"
            >
              Shop
            </button>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-neutral-900 font-semibold">{selectedCategory}</span>
              </>
            )}
            {activeView === 'men' && (
              <>
                <span>/</span>
                <span className="text-neutral-900 font-semibold">Men</span>
              </>
            )}
            {activeView === 'women' && (
              <>
                <span>/</span>
                <span className="text-neutral-900 font-semibold">Women</span>
              </>
            )}
          </div>

          {/* Demo Catalog Badge (Prompt Item 4) */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>DUFFLEHUB Live Demo Catalog</span>
          </div>
        </div>

        {/* Page Header Banner */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 mb-6 shadow-xs">
          <div className="max-w-3xl">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
              {getPageSubtitle()}
            </p>
          </div>

          {/* Quick Category Pill-Selector (for easy switching) */}
          <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Types
            </button>
            {CATEGORIES_LIST.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as CategoryType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Top Controls: Active Count, Mobile Filter Trigger, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-white p-3.5 sm:px-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-800">
              Showing <strong className="text-neutral-950 font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'bag' : 'bags'}
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-semibold text-neutral-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              Sort By:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="discount_desc">Highest Discount</option>
              <option value="rating_desc">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Active Filters Row */}
        {(filterState.priceRanges.length > 0 ||
          filterState.categories.length > 0 ||
          filterState.genders.length > 0 ||
          filterState.colors.length > 0 ||
          filterState.materials.length > 0 ||
          filterState.minDiscount !== null ||
          filterState.minRating !== null ||
          searchQuery.trim().length > 0 ||
          selectedCategory !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-neutral-500 font-medium">Applied:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-200 text-neutral-800 font-medium">
                Keyword: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-neutral-950">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-200 text-neutral-800 font-medium">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-neutral-950">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filterState.minDiscount && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-medium">
                {filterState.minDiscount}%+ Off
                <button
                  onClick={() => setFilterState((prev) => ({ ...prev, minDiscount: null }))}
                  className="hover:text-amber-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filterState.genders.map((g) => (
              <span key={g} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-200 text-neutral-800 font-medium">
                {g}
                <button
                  onClick={() =>
                    setFilterState((prev) => ({
                      ...prev,
                      genders: prev.genders.filter((x) => x !== g)
                    }))
                  }
                  className="hover:text-neutral-950"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              onClick={clearAllFilters}
              className="text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2 ml-1"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Main Grid Layout: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-20">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State (Prompt Item 8) */
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-neutral-900">
                  No products found. Try another search.
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  We couldn't find any duffle bags matching your current filters or search term. Try expanding price bounds or resetting filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl overflow-y-auto p-4 flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="font-display font-bold text-base text-neutral-900">Filter Gear</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">
              <FilterSidebar isMobileDrawer onCloseMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
