import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from './ProductCard';
import { Tag, Sparkles, Percent, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export const OffersView: React.FC = () => {
  const { setActiveView, addToast } = useShop();

  // Filter products that have at least 30% discount
  const offerProducts = PRODUCTS_DATA.filter((p) => p.discountPercentage >= 30).sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  );

  const demoCoupons = [
    { code: 'WELCOME10', discount: '10% OFF', desc: 'Valid on your first DUFFLEHUB order' },
    { code: 'DUFFLE20', discount: '20% OFF', desc: 'Weekend getaway travel collection' },
    { code: 'TRAVEL15', discount: '15% OFF', desc: 'Orders above ₹2,500' },
    { code: 'FESTIVE25', discount: '25% OFF', desc: 'Festival seasonal campaign special' },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    addToast(`Coupon code ${code} copied to clipboard!`, 'success');
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Offers Hero Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 rounded-2xl p-8 sm:p-10 text-white mb-8 border border-neutral-800 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Verified Direct Markdowns</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Current Offers & Discount Archive
            </h1>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Every duffle bag below features real discounted pricing up to 50% off original MRP.
              Combine markdown discounts with verified coupon codes during checkout.
            </p>
          </div>

          {/* Configurable Coupons Preview */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Demo Checkout Coupons (Click to Copy):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {demoCoupons.map((c) => (
                <div
                  key={c.code}
                  onClick={() => handleCopyCode(c.code)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-xl p-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-400 group-hover:text-amber-300">
                      {c.code}
                    </span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded font-bold">
                      {c.discount}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-neutral-900">
            All Discounted Bags ({offerProducts.length})
          </h2>
          <span className="text-xs text-neutral-500">
            Sorted by highest discount percentage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
