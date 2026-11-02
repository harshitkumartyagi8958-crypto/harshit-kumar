import React from 'react';
import { useShop } from '../context/ShopContext';
import { CategoryType } from '../types/product';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useShop();

  const handleCategoryClick = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-neutral-950 flex items-center justify-center font-display font-extrabold text-lg">
                D
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                DUFFLEHUB
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Engineered duffle bags for every journey. Specializing in high-durability travel, athletic gym, handcrafted leather, and flight cabin luggage.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <span className="font-mono bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 text-amber-400 font-bold">
                INR (₹) Indian Rupee
              </span>
              <span>·</span>
              <span>Pan-India Delivery</span>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300">
              Bag Categories
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Travel Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Travel Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Gym Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Gym Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Leather Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Leather Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Waterproof Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Waterproof Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Cabin Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Cabin Duffle Bags
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Convertible Duffle Bags')}
                  className="hover:text-white transition-colors"
                >
                  Convertible Duffle Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Sections */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => setActiveView('men')} className="hover:text-white transition-colors">
                  Men's Duffle Bags
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('women')} className="hover:text-white transition-colors">
                  Women's Duffle Bags
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('offers')} className="hover:text-white transition-colors">
                  Current Discount Offers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('festivals')} className="hover:text-white transition-colors">
                  Festival Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('orders')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('wallet')} className="hover:text-white transition-colors">
                  DUFFLEHUB Wallet
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & MBA Project Info */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Genuine Materials</span>
              </li>
              <li>7-Day Hassle-Free Returns</li>
              <li>Free Shipping above ₹1,499</li>
              <li>Secure 256-Bit SSL Checkout</li>
              <li className="pt-2 text-[11px] text-neutral-500">
                MBA E-Commerce Project Application. Live Demo Mode.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © 2026 DUFFLEHUB Luggage Co. All rights reserved. Built with precision.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Warranty Details</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
