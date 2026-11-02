import React from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_IMAGE } from '../data/products';
import { ArrowRight, ShieldCheck, Compass, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  const handleShopNow = () => {
    setSelectedCategory('All');
    setActiveView('shop');
  };

  const handleExploreOffers = () => {
    setActiveView('offers');
  };

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white">
      {/* Subtle background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-neutral-950/70 z-10" />

      {/* Main hero background image with fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="DUFFLEHUB Luxury and Adventure Duffle Bag Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          onError={(e) => {
            // Fallback gradient if file fails to load
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Quiet unboxed kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
            <span>Engineered for Motion</span>
            <span aria-hidden="true">·</span>
            <span>Artisanal Craftsmanship</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
            Premium Duffle Bags for Every Journey
          </h1>

          <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
            From quick gym sessions and 48-hour weekend escapes to cross-continental expeditions.
            Hand-stitched full-grain leathers, IPX7 waterproof ballistic weaves, and TSA flight-compliant dimensions.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleShopNow}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExploreOffers}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm tracking-wide backdrop-blur-sm transition-all duration-150"
            >
              <span>Explore Offers</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Key Trust Specs */}
          <div className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-3 gap-4 sm:gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-neutral-200 font-semibold text-xs sm:text-sm">Lifetime Warranty</strong>
                <span className="hidden sm:inline text-[11px]">On zippers & brass hardware</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-neutral-200 font-semibold text-xs sm:text-sm">IATA Cabin Ready</strong>
                <span className="hidden sm:inline text-[11px]">Overhead fit guaranteed</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-neutral-200 font-semibold text-xs sm:text-sm">Express Dispatch</strong>
                <span className="hidden sm:inline text-[11px]">Within 24 hours across India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
