import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA, FESTIVAL_OFFERS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight, Flame, Sparkles, Compass, Tag, Calendar, Gift } from 'lucide-react';

export const SectionsShowcase: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  const trendingProducts = PRODUCTS_DATA.filter((p) => p.isTrending).slice(0, 3);
  const bestDealProducts = PRODUCTS_DATA.filter((p) => p.isBestDeal).slice(0, 3);
  const travelEssentialProducts = PRODUCTS_DATA.filter((p) => p.isTravelEssential).slice(0, 3);
  const newArrivalProducts = PRODUCTS_DATA.filter((p) => p.isNewArrival).slice(0, 3);

  return (
    <div className="space-y-16 py-12">
      {/* 1. Trending Bags Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Community Favorites</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Trending Bags
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Most requested by travelers and fitness enthusiasts this season.
            </p>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 2. Best Deals Section */}
      <section className="bg-neutral-100 py-12 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 uppercase tracking-widest">
                <Tag className="w-3.5 h-3.5 text-rose-600" />
                <span>Heavy Discounts</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
                Best Deals
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Verified high-value markdowns up to 50% off original retail.
              </p>
            </div>
            <button
              onClick={() => setActiveView('offers')}
              className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestDealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Festival Offers Section (Item 11 / 24) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 rounded-full mb-4">
              <Gift className="w-3.5 h-3.5" />
              <span>Current Configured Festival Campaigns</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Diwali, Holi & National Holiday Travel Sales
            </h2>
            <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
              Curated discounts on handcrafted leather and water-resistant bags. Use code <span className="font-mono font-bold text-amber-400">FESTIVE25</span> or <span className="font-mono font-bold text-amber-400">DUFFLE20</span> at checkout.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setActiveView('festivals')}
                className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors"
              >
                View Festival Campaigns
              </button>
              <button
                onClick={() => setActiveView('offers')}
                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                See All Offers
              </button>
            </div>
          </div>

          {/* Cards preview of campaigns */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 pt-6 border-t border-white/10">
            {FESTIVAL_OFFERS_DATA.map((fest) => (
              <div
                key={fest.id}
                onClick={() => setActiveView('festivals')}
                className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>{fest.badge}</span>
                  <span className="font-mono text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                    {fest.couponCode}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white">{fest.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">{fest.discount}</p>
                <span className="text-[10px] text-neutral-500 mt-2 block">{fest.validity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Travel Essentials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>IATA Overhead & Road Trips</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              Travel Essentials
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Recommended luggage solutions with trolley sleeves and weatherproof armor.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Travel Duffle Bags');
              setActiveView('shop');
            }}
            className="text-xs font-bold text-neutral-900 hover:text-emerald-700 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Travel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelEssentialProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Fresh Off The Workshop</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mt-1">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Latest 2026 designs featuring hybrid convertible backpacks and waxed canvas.
            </p>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-neutral-900 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
