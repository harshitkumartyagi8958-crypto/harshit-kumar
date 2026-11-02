import React from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types/product';
import { CATEGORIES_LIST } from '../data/products';
import {
  Plane,
  Dumbbell,
  Trophy,
  Compass,
  Briefcase,
  Shield,
  Laptop,
  RefreshCw,
  Luggage,
  Maximize2,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Plane,
  Dumbbell,
  Trophy,
  Compass,
  Briefcase,
  Shield,
  Laptop,
  RefreshCw,
  Luggage,
  Maximize2
};

export const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  const handleCategorySelect = (categoryId: CategoryType) => {
    setSelectedCategory(categoryId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">
              Engineered Collections
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Shop by Bag Category
            </h2>
            <p className="text-sm text-neutral-500 mt-1 max-w-xl">
              Precision architectures tailored for specific travel modes, athletics, executive commutes, and heavy expeditions.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveView('shop');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-amber-600 transition-colors uppercase tracking-wider"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 10 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES_LIST.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Compass;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id as CategoryType)}
                className="group relative cursor-pointer bg-neutral-50 hover:bg-neutral-900 border border-neutral-200 hover:border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
              >
                {/* Background image preview on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white group-hover:bg-neutral-800 text-neutral-800 group-hover:text-amber-400 flex items-center justify-center shadow-xs border border-neutral-200 group-hover:border-neutral-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-400 group-hover:text-amber-400">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 group-hover:text-white transition-colors leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-neutral-500 group-hover:text-neutral-400 line-clamp-2 mt-1.5 transition-colors">
                    {cat.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-3 border-t border-neutral-200/80 group-hover:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-amber-400 transition-colors">
                  <span>Browse Gear</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
