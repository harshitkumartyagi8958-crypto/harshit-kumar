import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  CategoryType,
  GenderType,
  ColorType,
  MaterialType,
  CapacityCategory
} from '../types/product';
import { CATEGORIES_LIST, BRANDS_LIST } from '../data/products';
import { RotateCcw, ChevronDown, ChevronUp, Star, Check } from 'lucide-react';

const PRICE_TIERS = [
  { id: 'under_999', label: 'Under ₹999' },
  { id: '1000_1999', label: '₹1,000 – ₹1,999' },
  { id: '2000_2999', label: '₹2,000 – ₹2,999' },
  { id: '3000_4999', label: '₹3,000 – ₹4,999' },
  { id: '5000_plus', label: '₹5,000+' }
];

const GENDERS: GenderType[] = ['Men', 'Women', 'Unisex'];
const DISCOUNTS = [10, 20, 30, 40, 50];
const COLORS: { name: ColorType; hex: string }[] = [
  { name: 'Black', hex: '#171717' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Brown', hex: '#78350F' },
  { name: 'Grey', hex: '#64748B' },
  { name: 'Green', hex: '#166534' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Beige', hex: '#D2B48C' }
];

const MATERIALS: MaterialType[] = ['Polyester', 'Nylon', 'Canvas', 'Leather', 'Synthetic'];
const CAPACITIES: CapacityCategory[] = ['Under 20L', '20–30L', '30–40L', '40–50L', '50L+'];

export const FilterSidebar: React.FC<{ isMobileDrawer?: boolean; onCloseMobile?: () => void }> = ({
  isMobileDrawer,
  onCloseMobile
}) => {
  const { filterState, setFilterState, clearAllFilters, selectedCategory, setSelectedCategory } = useShop();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    categories: true,
    gender: true,
    discount: true,
    colors: true,
    material: true,
    capacity: true,
    rating: true,
    availability: true,
    brand: true
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePriceTierToggle = (tierId: string) => {
    setFilterState((prev) => {
      const exists = prev.priceRanges.includes(tierId);
      return {
        ...prev,
        priceRanges: exists
          ? prev.priceRanges.filter((r) => r !== tierId)
          : [...prev.priceRanges, tierId]
      };
    });
  };

  const handleCategoryToggle = (cat: CategoryType) => {
    // If the category is the primary top-level selectedCategory, reset it
    if (selectedCategory === cat) {
      setSelectedCategory('All');
    }
    setFilterState((prev) => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat]
      };
    });
  };

  const handleGenderToggle = (gen: GenderType) => {
    setFilterState((prev) => {
      const exists = prev.genders.includes(gen);
      return {
        ...prev,
        genders: exists ? prev.genders.filter((g) => g !== gen) : [...prev.genders, gen]
      };
    });
  };

  const handleDiscountToggle = (disc: number) => {
    setFilterState((prev) => ({
      ...prev,
      minDiscount: prev.minDiscount === disc ? null : disc
    }));
  };

  const handleColorToggle = (colorName: ColorType) => {
    setFilterState((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== colorName) : [...prev.colors, colorName]
      };
    });
  };

  const handleMaterialToggle = (mat: MaterialType) => {
    setFilterState((prev) => {
      const exists = prev.materials.includes(mat);
      return {
        ...prev,
        materials: exists ? prev.materials.filter((m) => m !== mat) : [...prev.materials, mat]
      };
    });
  };

  const handleCapacityToggle = (cap: CapacityCategory) => {
    setFilterState((prev) => {
      const exists = prev.capacities.includes(cap);
      return {
        ...prev,
        capacities: exists ? prev.capacities.filter((c) => c !== cap) : [...prev.capacities, cap]
      };
    });
  };

  const handleRatingToggle = (rate: number) => {
    setFilterState((prev) => ({
      ...prev,
      minRating: prev.minRating === rate ? null : rate
    }));
  };

  const handleAvailabilityToggle = (status: 'In Stock' | 'Out of Stock') => {
    setFilterState((prev) => {
      const exists = prev.availability.includes(status);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((s) => s !== status)
          : [...prev.availability, status]
      };
    });
  };

  const handleBrandToggle = (brand: string) => {
    setFilterState((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand]
      };
    });
  };

  const activeFilterCount =
    filterState.priceRanges.length +
    filterState.categories.length +
    filterState.genders.length +
    (filterState.minDiscount ? 1 : 0) +
    filterState.colors.length +
    filterState.materials.length +
    filterState.capacities.length +
    (filterState.minRating ? 1 : 0) +
    filterState.availability.length +
    filterState.brands.length +
    (selectedCategory !== 'All' ? 1 : 0);

  return (
    <aside className="w-full bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 flex flex-col gap-5 text-sm select-none">
      {/* Header & Clear All Filters */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-900 font-display text-base">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* 1. Price Filter (Preset Tiers + Custom Slider) */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Price (INR ₹)</span>
          {expandedSections.price ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.price && (
          <div className="mt-3 space-y-2.5">
            {/* Quick Price Ranges */}
            <div className="space-y-1.5">
              {PRICE_TIERS.map((tier) => {
                const checked = filterState.priceRanges.includes(tier.id);
                return (
                  <label
                    key={tier.id}
                    className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handlePriceTierToggle(tier.id)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                    />
                    <span className="tabular-nums">{tier.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Custom Price Range Slider */}
            <div className="pt-3 mt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                <span>Custom Max Price:</span>
                <span className="font-mono font-bold text-neutral-900 tabular-nums">
                  ₹{filterState.maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value)
                  }))
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                <span>₹500</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Gender Section */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('gender')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Gender</span>
          {expandedSections.gender ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.gender && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {GENDERS.map((gen) => {
              const active = filterState.genders.includes(gen);
              return (
                <button
                  key={gen}
                  onClick={() => handleGenderToggle(gen)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {gen}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Categories Filter (All 10 Duffle Bag Categories) */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Category</span>
          {expandedSections.categories ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.categories && (
          <div className="mt-2.5 space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {CATEGORIES_LIST.map((cat) => {
              const checked =
                filterState.categories.includes(cat.id as CategoryType) ||
                selectedCategory === cat.id;

              return (
                <label
                  key={cat.id}
                  className="flex items-center justify-between text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryToggle(cat.id as CategoryType)}
                      className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                    />
                    <span className="truncate">{cat.title}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {cat.count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Discount Filter (10%+, 20%+, 30%+, 40%+, 50%+) */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Discount</span>
          {expandedSections.discount ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.discount && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {DISCOUNTS.map((disc) => {
              const active = filterState.minDiscount === disc;
              return (
                <button
                  key={disc}
                  onClick={() => handleDiscountToggle(disc)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-amber-500 text-neutral-950 border-amber-600 font-bold shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {disc}%+
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Colour Filter */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Colour</span>
          {expandedSections.colors ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.colors && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {COLORS.map((c) => {
              const selected = filterState.colors.includes(c.name);
              return (
                <button
                  key={c.name}
                  onClick={() => handleColorToggle(c.name)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
                    selected
                      ? 'ring-2 ring-neutral-900 bg-neutral-100 font-semibold'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                  title={c.name}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-neutral-300"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Material Filter */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('material')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Material</span>
          {expandedSections.material ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.material && (
          <div className="mt-2.5 space-y-1.5">
            {MATERIALS.map((mat) => {
              const checked = filterState.materials.includes(mat);
              return (
                <label
                  key={mat}
                  className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleMaterialToggle(mat)}
                    className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                  />
                  <span>{mat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Capacity Filter */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('capacity')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Capacity Volume</span>
          {expandedSections.capacity ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.capacity && (
          <div className="mt-2.5 space-y-1.5">
            {CAPACITIES.map((cap) => {
              const checked = filterState.capacities.includes(cap);
              return (
                <label
                  key={cap}
                  className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCapacityToggle(cap)}
                    className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                  />
                  <span>{cap}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. Rating Filter */}
      <div className="pb-4 border-b border-neutral-150">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Customer Rating</span>
          {expandedSections.rating ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.rating && (
          <div className="mt-2.5 space-y-2">
            {[4, 3].map((r) => {
              const active = filterState.minRating === r;
              return (
                <button
                  key={r}
                  onClick={() => handleRatingToggle(r)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    active
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{r}★ & above</span>
                  </div>
                  {active && <Check className="w-3 h-3 text-amber-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 9. Availability Filter */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between font-semibold text-neutral-900 py-1"
        >
          <span>Availability</span>
          {expandedSections.availability ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {expandedSections.availability && (
          <div className="mt-2.5 space-y-1.5">
            {(['In Stock', 'Out of Stock'] as const).map((status) => {
              const checked = filterState.availability.includes(status);
              return (
                <label
                  key={status}
                  className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleAvailabilityToggle(status)}
                    className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                  />
                  <span>{status}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Drawer Close CTA */}
      {isMobileDrawer && onCloseMobile && (
        <div className="pt-4 border-t border-neutral-200">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-neutral-900 text-white font-semibold rounded-lg text-xs"
          >
            Apply Filters & View Results
          </button>
        </div>
      )}
    </aside>
  );
};
