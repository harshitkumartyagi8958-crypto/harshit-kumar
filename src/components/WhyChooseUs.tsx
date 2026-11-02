import React from 'react';
import {
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Truck,
  Sparkles,
  Headphones
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Quality Products',
      description: 'Crafted from 1680D ballistic nylon, full-grain vegetable-tanned leather, and indestructible YKK metal hardware.',
      icon: ShieldCheck
    },
    {
      title: 'Secure Payments',
      description: 'Encrypted end-to-end checkout with instant UPI, debit/credit cards, net banking, DUFFLEHUB Wallet, and COD options.',
      icon: CreditCard
    },
    {
      title: 'Easy Returns',
      description: '7-day hassle-free returns and instant replacement guarantee with complimentary doorstep pickup across India.',
      icon: RotateCcw
    },
    {
      title: 'Fast Delivery',
      description: 'Express dispatches within 24 hours from regional fulfillment hubs, reaching major metros in 2–3 business days.',
      icon: Truck
    },
    {
      title: 'Exclusive Offers',
      description: 'Configurable seasonal promotions, festive vouchers, and loyalty cashback rewards credited straight to your wallet.',
      icon: Sparkles
    },
    {
      title: 'Customer Support',
      description: 'Dedicated travel gear concierge team available 7 days a week for sizing recommendations, warranty, and order assistance.',
      icon: Headphones
    }
  ];

  return (
    <section className="py-16 bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            The DUFFLEHUB Standard
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Why Choose DUFFLEHUB?
          </h2>
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Every stitch, rivet, and zipper is stress-tested to endure rough baggage handling, alpine weather, and relentless daily commutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-neutral-800/60 rounded-xl p-6 border border-neutral-700/60 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
