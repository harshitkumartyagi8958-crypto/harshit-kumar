import React, { useState } from 'react';
import { useShop, ViewType } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { DuffleBagIcon } from './DuffleBagIcon';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Wallet,
  Package,
  Menu,
  X,
  Bell,
  LogOut,
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlistCount,
    resetDemoData,
    setSelectedCategory
  } = useShop();

  const {
    currentUser,
    isAuthenticated,
    openAuthScreen,
    setLogoutModalOpen,
    requireAuth
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [topBannerDismissed, setTopBannerDismissed] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleNavClick = (view: ViewType) => {
    // Check if view requires authentication (Prompt Item 9)
    if (['orders', 'wallet', 'account', 'wishlist'].includes(view)) {
      const allowed = requireAuth(`access ${view}`, () => {
        setActiveView(view);
      });
      if (!allowed) {
        setMobileMenuOpen(false);
        return;
      }
    }

    setActiveView(view);
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
    if (view === 'shop') {
      setSelectedCategory('All');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeView === 'home') {
      setActiveView('shop');
    }
    setShowSearchModal(false);
  };

  const publicNavLinks: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Men', view: 'men' },
    { label: 'Women', view: 'women' },
    { label: 'Offers', view: 'offers' },
    { label: 'Festivals', view: 'festivals' }
  ];

  // Customer first name for greeting: "Hi, Harshit"
  const firstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Guest';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top Announcement Bar */}
      {!topBannerDismissed && (
        <div className="bg-neutral-900 text-neutral-200 text-xs px-4 py-1.5 flex items-center justify-between transition-all">
          <div className="mx-auto flex items-center gap-2 font-medium tracking-wide text-center">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
              Special Offer:
            </span>
            <span className="hidden sm:inline">
              Use code <strong className="text-white underline decoration-amber-400">DUFFLE20</strong> for 20% off. Free express delivery across India.
            </span>
            <span className="sm:hidden text-[11px]">
              Use code DUFFLE20 for 20% off luggage.
            </span>
            <button
              onClick={() => handleNavClick('offers')}
              className="hidden md:inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 ml-2 font-semibold text-[11px]"
            >
              Explore Deals <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => setTopBannerDismissed(true)}
            className="text-neutral-400 hover:text-white p-0.5 ml-2"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: DUFFLEHUB Logo + Bespoke Duffle Bag Icon (Prompt Item 1 & 11) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-900 text-amber-400 flex items-center justify-center shadow-xs border border-neutral-800 group-hover:bg-neutral-800 transition-colors">
                <DuffleBagIcon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-amber-600 transition-colors leading-none">
                  DUFFLEHUB
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-600 font-bold mt-0.5">
                  Carry More. Travel Better.
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Home, Shop, Men, Women, Offers, Festivals) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
            {publicNavLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative py-1 text-sm tracking-tight transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-neutral-900 font-bold'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Search + User Actions (Pre-login vs Post-login) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Functional Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden md:block w-36 lg:w-52 focus-within:w-60 transition-all duration-200"
            >
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search bags, leather..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView === 'home' && e.target.value.trim().length > 0) {
                    setActiveView('shop');
                  }
                }}
                className="w-full bg-neutral-100 focus:bg-white text-xs pl-9 pr-7 py-2 rounded-full border border-transparent focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900/10 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 md:hidden"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* IF AUTHENTICATED: Display Wishlist, Orders, Wallet, Notification, Profile (Prompt Item 11) */}
            {isAuthenticated ? (
              <>
                {/* Wishlist */}
                <button
                  onClick={() => handleNavClick('wishlist')}
                  className={`relative p-2 rounded-lg transition-colors ${
                    activeView === 'wishlist'
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  title="My Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center tabular-nums">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Orders Icon */}
                <button
                  onClick={() => handleNavClick('orders')}
                  className={`hidden sm:inline-flex p-2 rounded-lg transition-colors ${
                    activeView === 'orders'
                      ? 'text-neutral-900 bg-neutral-100'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  title="My Orders & Tracking"
                  aria-label="Orders"
                >
                  <Package className="w-5 h-5" />
                </button>

                {/* Wallet Icon */}
                <button
                  onClick={() => handleNavClick('wallet')}
                  className={`hidden sm:inline-flex p-2 rounded-lg transition-colors ${
                    activeView === 'wallet'
                      ? 'text-neutral-900 bg-neutral-100'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  title="DUFFLEHUB Wallet"
                  aria-label="Wallet"
                >
                  <Wallet className="w-5 h-5" />
                </button>

                {/* Notification Bell */}
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                    title="Notifications"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
                  </button>

                  {/* Notification Dropdown */}
                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 p-3 text-xs z-50 animate-in fade-in">
                      <div className="font-bold text-neutral-900 pb-2 border-b border-neutral-100 flex items-center justify-between">
                        <span>Notifications</span>
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold">1 New</span>
                      </div>
                      <div className="py-2.5 border-b border-neutral-100">
                        <strong className="text-neutral-900 block font-semibold">Festive Coupon Activated</strong>
                        <p className="text-neutral-500 mt-0.5">Use code FESTIVE25 for 25% off leather weekenders.</p>
                      </div>
                      <div className="py-2.5">
                        <strong className="text-neutral-900 block font-semibold">Order #DHORD-781923</strong>
                        <p className="text-neutral-500 mt-0.5">Your Executive Leather Weekender has been shipped.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cart Icon */}
                <button
                  onClick={() => handleNavClick('cart')}
                  className={`relative flex items-center gap-1.5 p-2 rounded-lg transition-colors ${
                    activeView === 'cart'
                      ? 'text-neutral-900 bg-neutral-100 font-bold'
                      : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                  title="Cart"
                  aria-label="Shopping Cart"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-neutral-950 text-[10px] font-extrabold rounded-full min-w-4 h-4 px-1 flex items-center justify-center tabular-nums shadow-xs">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden xl:inline text-xs font-semibold">Cart</span>
                </button>

                {/* Profile Badge with "Hi, [Name]" (Prompt Item 11) */}
                <div className="relative">
                  <button
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                    className="flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-amber-400 font-bold text-[11px] flex items-center justify-center">
                      {firstName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-neutral-800 hidden sm:inline whitespace-nowrap">
                      Hi, {firstName}
                    </span>
                    <ChevronDown className="w-3 h-3 text-neutral-500" />
                  </button>

                  {/* Profile Menu Dropdown */}
                  {accountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 text-xs z-50 animate-in fade-in">
                      <div className="px-4 py-2 border-b border-neutral-100">
                        <strong className="block font-bold text-neutral-900">{currentUser?.name}</strong>
                        <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">
                          {currentUser?.id}
                        </span>
                      </div>

                      <button
                        onClick={() => handleNavClick('account')}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>My Account</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('orders')}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 flex items-center gap-2"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>My Orders</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('wallet')}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 flex items-center gap-2"
                      >
                        <Wallet className="w-3.5 h-3.5" />
                        <span>Wallet</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-neutral-100">
                        <button
                          onClick={() => {
                            setAccountDropdownOpen(false);
                            setLogoutModalOpen(true);
                          }}
                          className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* IF NOT LOGGED IN: Prominent LOGIN Button + Cart (Prompt Item 12) */
              <>
                <button
                  onClick={() => openAuthScreen('login')}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>LOGIN</span>
                </button>

                {/* Cart Icon */}
                <button
                  onClick={() => handleNavClick('cart')}
                  className="relative flex items-center gap-1 p-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors"
                  title="Cart"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 text-[10px] font-extrabold rounded-full min-w-4 h-4 px-1 flex items-center justify-center tabular-nums">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Expanded */}
        {showSearchModal && (
          <div className="py-2 pb-3 md:hidden border-t border-neutral-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search bags, leather, gym, travel..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView === 'home' && e.target.value.trim().length > 0) {
                    setActiveView('shop');
                  }
                }}
                className="w-full bg-neutral-100 text-xs pl-9 pr-8 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white shadow-xl animate-in slide-in-from-top-2">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {/* User status in mobile drawer */}
            {isAuthenticated ? (
              <div className="p-3 mb-2 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <strong className="block font-bold text-xs text-neutral-900">{currentUser?.name}</strong>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">
                    {currentUser?.id}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLogoutModalOpen(true);
                  }}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="p-3 mb-2 bg-neutral-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-300 block">Browsing as Guest</span>
                  <strong className="text-xs font-bold text-amber-400">Sign in for saved luggage</strong>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthScreen('login');
                  }}
                  className="px-3 py-1.5 bg-amber-500 text-neutral-950 font-bold text-xs rounded-lg uppercase"
                >
                  LOGIN
                </button>
              </div>
            )}

            {publicNavLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeView === link.view
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{link.label}</span>
              </button>
            ))}

            {/* Authenticated user links in mobile drawer */}
            {isAuthenticated && (
              <>
                <div className="pt-2 mt-2 border-t border-neutral-150">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 block mb-1">
                    My Account
                  </span>
                  {[
                    { label: 'My Account', view: 'account' as ViewType },
                    { label: 'My Orders', view: 'orders' as ViewType },
                    { label: 'DUFFLEHUB Wallet', view: 'wallet' as ViewType },
                    { label: 'Saved Wishlist', view: 'wishlist' as ViewType }
                  ].map((item) => (
                    <button
                      key={item.view}
                      onClick={() => handleNavClick(item.view)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-md"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 px-3">
              <span>DUFFLEHUB · Carry More. Travel Better.</span>
              <button
                onClick={resetDemoData}
                className="text-rose-600 hover:underline font-medium"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
