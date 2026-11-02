import React from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    setActiveView,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const { requireAuth } = useAuth();

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const deliveryCharge = cartSubtotal > 1499 || cartSubtotal === 0 ? 0 : 99;
  const finalTotal = cartSubtotal + deliveryCharge;

  const handleCheckout = () => {
    const allowed = requireAuth('proceed to checkout and place your order', () => {
      setActiveView('orders');
    });
    if (allowed) {
      setActiveView('orders');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-neutral-50 min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-2xl text-neutral-900">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500">
            Looks like you haven't added any premium duffle bags to your cart yet.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Explore Bags</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
            Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Review your selected luggage items before proceeding to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemTotal = item.product.discountedPrice * item.quantity;
              const isSaved = isInWishlist(item.product.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                    />

                    <div>
                      <div className="text-xs text-neutral-400 font-medium">
                        {item.product.brand} · {item.product.category}
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 mt-0.5">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                        <span>Color: <strong className="text-neutral-800">{item.selectedColor}</strong></span>
                        <span>·</span>
                        <span>Size: <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="font-mono text-sm font-bold text-neutral-900 tabular-nums">
                          {formatINR(item.product.discountedPrice)}
                        </span>
                        {item.product.originalPrice > item.product.discountedPrice && (
                          <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                            {formatINR(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 gap-3">
                    <div className="font-mono text-base font-bold text-neutral-900 tabular-nums">
                      {formatINR(itemTotal)}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-neutral-900 min-w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleWishlist(item.product.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'text-rose-600 border-rose-200 bg-rose-50'
                            : 'text-neutral-400 hover:text-neutral-700 border-neutral-200'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-rose-600 hover:border-rose-200 transition-colors"
                        title="Remove from Cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setActiveView('shop')}
                className="text-xs font-bold text-neutral-800 hover:text-neutral-950 flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>← Continue Shopping</span>
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-neutral-900 pb-3 border-b border-neutral-150">
              Cart Summary
            </h3>

            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono font-bold text-neutral-900 tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Delivery:</span>
                <span className="font-mono tabular-nums">
                  {deliveryCharge === 0 ? (
                    <strong className="text-emerald-700 uppercase font-semibold">FREE</strong>
                  ) : (
                    formatINR(deliveryCharge)
                  )}
                </span>
              </div>

              {cartSubtotal < 1499 && (
                <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                  Add <strong>{formatINR(1499 - cartSubtotal)}</strong> more for Free Express Delivery!
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-150 flex justify-between items-baseline">
              <span className="font-display font-bold text-sm text-neutral-900">Total Amount:</span>
              <span className="font-mono text-xl font-bold text-neutral-900 tabular-nums">
                {formatINR(finalTotal)}
              </span>
            </div>

            {/* Note on Upcoming Stages */}
            <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
              ⚡ STAGE 1 Active: Cart items and quantities are fully functional & stored in your browser. Complete checkout, coupon codes, and payment gateways arrive in Stage 4 & 5.
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
