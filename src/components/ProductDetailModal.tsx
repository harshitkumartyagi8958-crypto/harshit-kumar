import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ColorType } from '../types/product';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Maximize,
  Layers,
  Laptop,
  Droplets,
  Package,
  Weight
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    closeProductModal,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setActiveView
  } = useShop();

  const product = selectedProductForModal;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorType>(
    product?.availableColors[0]?.name || 'Black'
  );
  const [selectedSize, setSelectedSize] = useState<string>('Standard');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    closeProductModal();
    setActiveView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeProductModal}
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-auto max-h-[92vh] flex flex-col">
        {/* Top Close Button Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-150 bg-neutral-50/80">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>{product.brand}</span>
            <span>·</span>
            <span>{product.category}</span>
          </div>
          <button
            onClick={closeProductModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Gallery + Right Purchase Module */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 bg-amber-500 text-neutral-950 font-extrabold text-xs px-2.5 py-1 rounded shadow-xs">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail selector if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-neutral-900 ring-2 ring-neutral-900/20'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Quick Specs Badges */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
              <div className="flex items-center gap-2 text-neutral-700">
                <Maximize className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Dimensions: <strong>{product.dimensionsCm}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Weight className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Weight: <strong>{product.weightKg} kg</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Layers className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Compartments: <strong>{product.compartmentsCount} pockets</strong></span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <Droplets className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Waterproof: <strong>{product.isWaterproof ? 'Yes (IPX7)' : 'Water-repellent'}</strong></span>
              </div>
              {product.hasLaptopCompartment && (
                <div className="col-span-2 flex items-center gap-2 text-neutral-700 pt-1 border-t border-neutral-200/60">
                  <Laptop className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Laptop Compartment: <strong>Up to {product.laptopSizeLimit || '15.6 inch'}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pricing, Variants, Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand and Stock */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-amber-600">
                  {product.brand}
                </span>
                <span className={`font-semibold ${
                  product.availability === 'In Stock'
                    ? 'text-emerald-700'
                    : 'text-amber-700'
                }`}>
                  ● {product.availability}
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 mt-1.5 leading-snug">
                {product.name}
              </h2>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2.5 mt-2 text-xs">
                <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                </div>
                <span className="text-neutral-500">{product.reviewsCount} customer reviews</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-500 font-medium">Gender: {product.gender}</span>
              </div>

              {/* Price Banner */}
              <div className="mt-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-baseline gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900 tabular-nums">
                  {formatINR(product.discountedPrice)}
                </span>
                {product.originalPrice > product.discountedPrice && (
                  <span className="font-mono text-sm text-neutral-400 line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 ml-auto bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  Save {formatINR(product.originalPrice - product.discountedPrice)} ({product.discountPercentage}% OFF)
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Colour Selection */}
              <div className="mt-5">
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Select Colour: <span className="text-neutral-500 font-normal">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.availableColors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                        selectedColor === c.name
                          ? 'ring-2 ring-neutral-900 bg-neutral-100 font-semibold border-neutral-900'
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-neutral-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Select Size / Edition:
                </span>
                <div className="flex items-center gap-2">
                  {['Standard', 'Expedition Carry'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-900">Quantity:</span>
                <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-200"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 text-xs font-bold font-mono text-neutral-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Shipping and Return Policy */}
              <div className="mt-5 space-y-2 text-xs text-neutral-500 pt-4 border-t border-neutral-150">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.shippingInfo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{product.returnPolicy}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Buy Now, Add to Wishlist */}
            <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors shadow-xs"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl border text-xs font-medium transition-colors ${
                  isSaved
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
