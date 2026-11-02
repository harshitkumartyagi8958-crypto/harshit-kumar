import React, { useState } from 'react';
import { Product, ColorType } from '../types/product';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, openProductModal, setActiveView } = useShop();
  const [selectedColor, setSelectedColor] = useState<ColorType>(
    product.availableColors[0]?.name || 'Black'
  );
  const [imageError, setImageError] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 'Standard', 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 'Standard', 1);
    setActiveView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Format currency in INR
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative cursor-pointer bg-white rounded-xl border border-neutral-200 hover:border-neutral-400/80 transition-all duration-200 flex flex-col justify-between overflow-hidden hover:shadow-md"
    >
      {/* Top Image Section (65-70% visual focus) */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600">
            <ShoppingBag className="w-10 h-10 text-neutral-400 mb-2" />
            <span className="text-xs font-semibold text-center">{product.name}</span>
          </div>
        )}

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs transition-colors ${
            isSaved
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-rose-600 border border-neutral-200/50'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Availability & Discount Ribbon */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-amber-500 text-neutral-950 font-bold text-[11px] px-2 py-0.5 rounded shadow-xs tracking-tight">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.availability === 'Low Stock' && (
            <span className="bg-rose-900 text-rose-100 text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
              Low Stock
            </span>
          )}
        </div>

        {/* Quick View Hover Peek */}
        <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 text-white text-xs font-semibold rounded-lg backdrop-blur-xs shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Product Content Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.gender}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.capacityCategory}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 group-hover:text-amber-600 transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2 mt-1.5 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
              <span className="font-bold text-neutral-900">{product.rating}</span>
            </div>
            <span className="text-neutral-400 font-normal">
              ({product.reviewsCount} reviews)
            </span>
            <span className="text-neutral-300">·</span>
            <span className={`text-[11px] font-semibold ${
              product.availability === 'In Stock'
                ? 'text-emerald-700'
                : product.availability === 'Low Stock'
                ? 'text-amber-700'
                : 'text-neutral-400'
            }`}>
              {product.availability}
            </span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className="text-[11px] text-neutral-400 mr-1 font-medium">Colour:</span>
            {product.availableColors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    isSelected
                      ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110'
                      : 'border-neutral-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Pricing & Interactive Action Buttons */}
        <div className="pt-3 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-neutral-900 tabular-nums">
              {formatINR(product.discountedPrice)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
            <span className="text-[11px] font-bold text-emerald-700 ml-auto">
              Save {formatINR(product.originalPrice - product.discountedPrice)}
            </span>
          </div>

          {/* Two Action Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-colors active:scale-[0.98]"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
