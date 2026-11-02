import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Tag, Plane, Clock, Flame, ArrowUpRight } from 'lucide-react';
import { TRAVEL_CANVAS_IMG, GYM_WATERPROOF_IMG, LEATHER_DUFFLE_IMG } from '../data/products';

export const PromoBanners: React.FC = () => {
  const { setActiveView, setSelectedCategory, setFilterState } = useShop();

  const handleBannerClick = (type: string) => {
    if (type === 'new') {
      setSelectedCategory('All');
      setActiveView('shop');
      setFilterState((prev) => ({ ...prev, minDiscount: null }));
    } else if (type === 'weekend') {
      setSelectedCategory('Weekend Duffle Bags');
      setActiveView('shop');
    } else if (type === 'festivals') {
      setActiveView('festivals');
    } else if (type === 'travel') {
      setSelectedCategory('Travel Duffle Bags');
      setActiveView('shop');
    } else if (type === 'discounts') {
      setActiveView('offers');
    }
  };

  return (
    <section className="py-8 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-neutral-500">
              Featured Promotions & Campaigns
            </h2>
            <p className="text-lg font-bold text-neutral-900 font-display">
              Curated Opportunities & Limited Offers
            </p>
          </div>
          <button
            onClick={() => setActiveView('offers')}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            View All Offers <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Grid of Promotional Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Banner 1: New Arrivals */}
          <div
            onClick={() => handleBannerClick('new')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                New Arrivals
              </span>
              <span className="text-[10px] text-neutral-400">2026 Drop</span>
            </div>
            <div className="my-3">
              <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                The Heritage 2026 Drop
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                Waxed canvas weekender with bridle leather accents.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white pt-2 border-t border-neutral-700/60">
              <span>Explore New</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Banner 2: Weekend Sale */}
          <div
            onClick={() => handleBannerClick('weekend')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-white p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-amber-200 font-semibold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Weekend Sale
              </span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold">20% OFF</span>
            </div>
            <div className="my-3">
              <h3 className="font-display font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                48-Hour Weekend Getaways
              </h3>
              <p className="text-xs text-amber-100 mt-1 line-clamp-2">
                Use code DUFFLE20 at checkout for instant savings.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-amber-200 group-hover:text-white pt-2 border-t border-white/20">
              <span>Claim Deal</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Banner 3: Festival Offers */}
          <div
            onClick={() => handleBannerClick('festivals')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-rose-900 to-rose-950 text-white p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Festival Offers
              </span>
              <span className="text-[10px] text-rose-200">Diwali & Holi</span>
            </div>
            <div className="my-3">
              <h3 className="font-display font-bold text-base text-white group-hover:text-rose-200 transition-colors">
                Festive Celebration Deals
              </h3>
              <p className="text-xs text-rose-200 mt-1 line-clamp-2">
                Up to 50% discount on executive handcrafted leather.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-rose-300 group-hover:text-white pt-2 border-t border-white/20">
              <span>View Campaigns</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Banner 4: Travel Essentials */}
          <div
            onClick={() => handleBannerClick('travel')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" />
                Travel Essentials
              </span>
              <span className="text-[10px] text-emerald-200">TSA Cabin</span>
            </div>
            <div className="my-3">
              <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-200 transition-colors">
                Airport & Luggage Sets
              </h3>
              <p className="text-xs text-emerald-200 mt-1 line-clamp-2">
                Trolley pass-through and overhead compartment fit.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300 group-hover:text-white pt-2 border-t border-white/20">
              <span>Pack Ready</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Banner 5: Limited-Time Discounts */}
          <div
            onClick={() => handleBannerClick('discounts')}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950 to-neutral-900 text-white p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Limited Discounts
              </span>
              <span className="text-[10px] text-indigo-200">Up to 45%</span>
            </div>
            <div className="my-3">
              <h3 className="font-display font-bold text-base text-white group-hover:text-indigo-200 transition-colors">
                Clearance & Best Deals
              </h3>
              <p className="text-xs text-indigo-200 mt-1 line-clamp-2">
                High-performance sports and gym bags priced under ₹1,999.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 group-hover:text-white pt-2 border-t border-white/20">
              <span>Grab Bargain</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
