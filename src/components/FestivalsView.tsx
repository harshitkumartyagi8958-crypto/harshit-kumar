import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Calendar, Tag, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { CategoryType } from '../types/product';

const FESTIVAL_CAMPAIGNS = [
  {
    id: 'diwali',
    title: 'Diwali Grand Festival Sale',
    discount: 'Up to 50% OFF + Extra ₹500 off',
    validity: 'Configured for Oct 15 – Nov 5',
    status: 'Upcoming / Configured',
    eligibleCategory: 'Leather Duffle Bags' as CategoryType,
    couponCode: 'FESTIVE25',
    description: 'Special handcrafted edition duffle bags with brass hardware and gift-ready luxury packaging.',
    bgGradient: 'from-amber-900 to-amber-950',
    accentColor: 'text-amber-400'
  },
  {
    id: 'holi',
    title: 'Holi Colorful Weekend Escapes',
    discount: 'Flat 30% OFF on Waterproof Gear',
    validity: 'Configured for March 10 – March 25',
    status: 'Seasonal',
    eligibleCategory: 'Waterproof Duffle Bags' as CategoryType,
    couponCode: 'HOLI30',
    description: 'Submersible, mud-resistant and easy-wash TPU ballistic nylon bags for long holiday weekends.',
    bgGradient: 'from-rose-900 to-purple-950',
    accentColor: 'text-rose-400'
  },
  {
    id: 'independence',
    title: 'Independence Day Freedom Sale',
    discount: 'Flat 25% OFF Pan-India',
    validity: 'Configured for August 10 – August 20',
    status: 'Upcoming / Configured',
    eligibleCategory: 'Travel Duffle Bags' as CategoryType,
    couponCode: 'FREEDOM25',
    description: 'Celebrate national freedom with homegrown heritage travel gear and waxed canvas weekenders.',
    bgGradient: 'from-emerald-900 to-teal-950',
    accentColor: 'text-emerald-400'
  },
  {
    id: 'republic',
    title: 'Republic Day Expedition Offer',
    discount: 'Up to 35% OFF on Heavy Load Duffels',
    validity: 'Configured for January 20 – January 30',
    status: 'Seasonal',
    eligibleCategory: 'Large-Capacity Duffle Bags' as CategoryType,
    couponCode: 'REPUBLIC35',
    description: 'Massive 60L to 85L expedition bags for winter mountaineering and multi-state travel.',
    bgGradient: 'from-blue-900 to-indigo-950',
    accentColor: 'text-blue-400'
  },
  {
    id: 'christmas',
    title: 'Christmas Holiday Gifting Sale',
    discount: 'Buy 1 Get 20% on 2nd Bag',
    validity: 'Configured for December 15 – December 26',
    status: 'Upcoming / Configured',
    eligibleCategory: 'Weekend Duffle Bags' as CategoryType,
    couponCode: 'XMAS20',
    description: 'Curated luxury luggage sets ideal for holiday family gifting with personalized initials.',
    bgGradient: 'from-red-900 to-neutral-950',
    accentColor: 'text-red-400'
  },
  {
    id: 'newyear',
    title: 'New Year Resolution Fitness Drop',
    discount: 'Flat 40% OFF on Gym & Training',
    validity: 'Configured for December 28 – January 10',
    status: 'Seasonal',
    eligibleCategory: 'Gym Duffle Bags' as CategoryType,
    couponCode: 'NEWYEAR40',
    description: 'Start your fitness journey with ventilated shoe compartment gym duffle bags and shaker sleeves.',
    bgGradient: 'from-neutral-900 to-zinc-950',
    accentColor: 'text-amber-400'
  },
  {
    id: 'summer',
    title: 'Summer Vacation Travel Sale',
    discount: 'Up to 45% OFF on Flight Cabin Bags',
    validity: 'Configured for May 1 – June 15',
    status: 'Seasonal',
    eligibleCategory: 'Cabin Duffle Bags' as CategoryType,
    couponCode: 'SUMMER45',
    description: 'Lightweight, overhead compartment-ready duffels designed for stress-free domestic flights.',
    bgGradient: 'from-orange-950 to-neutral-950',
    accentColor: 'text-orange-400'
  },
  {
    id: 'monsoon',
    title: 'Monsoon Waterproof Trail Sale',
    discount: 'Flat 35% OFF on IPX7 Rain Duffels',
    validity: 'Configured for July 1 – August 15',
    status: 'Seasonal',
    eligibleCategory: 'Waterproof Duffle Bags' as CategoryType,
    couponCode: 'MONSOON35',
    description: 'Welded seam airtight zippers and quick-drain technology for downpours and Western Ghats treks.',
    bgGradient: 'from-cyan-950 to-neutral-950',
    accentColor: 'text-cyan-400'
  }
];

export const FestivalsView: React.FC = () => {
  const { setSelectedCategory, setActiveView, addToast } = useShop();

  const handleShopCampaign = (category: CategoryType, coupon: string) => {
    setSelectedCategory(category);
    setActiveView('shop');
    addToast(`Viewing ${category}. Use coupon code ${coupon} at checkout!`, 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-neutral-900 rounded-2xl p-8 sm:p-12 text-white border border-neutral-800 shadow-xl mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promotional Campaigns Calendar</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Festival Offers & Seasonal Sales
            </h1>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Explore configured seasonal festival promotions for DUFFLEHUB. Discover exclusive campaign discounts, eligible bags, and promo codes.
            </p>

            {/* Disclaimer from item 11 */}
            <div className="mt-6 flex items-center gap-2 text-xs text-neutral-400 bg-neutral-800/80 p-3 rounded-lg border border-neutral-700">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Campaign dates are configured per schedule. Demo coupons can be applied at checkout.</span>
            </div>
          </div>
        </div>

        {/* 8 Festival Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FESTIVAL_CAMPAIGNS.map((camp) => (
            <div
              key={camp.id}
              className={`rounded-2xl p-6 sm:p-7 text-white bg-gradient-to-br ${camp.bgGradient} border border-neutral-800 shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className={`font-bold uppercase tracking-wider ${camp.accentColor}`}>
                    {camp.status}
                  </span>
                  <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded text-neutral-200 font-mono text-xs">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>Coupon: <strong>{camp.couponCode}</strong></span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white">
                  {camp.title}
                </h3>

                <div className="mt-2 text-base font-extrabold text-amber-400">
                  {camp.discount}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {camp.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{camp.validity}</span>
                  </div>
                  <div>
                    Target: <strong className="text-white">{camp.eligibleCategory}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleShopCampaign(camp.eligibleCategory, camp.couponCode)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-colors"
                >
                  <span>Shop Eligible Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] text-neutral-400 font-mono">
                  {camp.eligibleCategory}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
