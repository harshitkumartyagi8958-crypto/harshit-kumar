/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanners } from './components/PromoBanners';
import { CategoryGrid } from './components/CategoryGrid';
import { SectionsShowcase } from './components/SectionsShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductListingView } from './components/ProductListingView';
import { OffersView } from './components/OffersView';
import { FestivalsView } from './components/FestivalsView';
import { CartView } from './components/CartView';
import {
  WalletPreviewView,
  OrdersPreviewView,
  AccountPreviewView
} from './components/OtherViews';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import {
  SplashScreen,
  AuthModalOrScreen,
  LoginRequiredPromptModal,
  LogoutConfirmModal
} from './components/AuthScreens';

const AppContent: React.FC = () => {
  const { activeView } = useShop();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <Hero />
            <PromoBanners />
            <CategoryGrid />
            <SectionsShowcase />
            <WhyChooseUs />
          </>
        );

      case 'shop':
      case 'men':
      case 'women':
      case 'wishlist':
        return <ProductListingView />;

      case 'offers':
        return <OffersView />;

      case 'festivals':
        return <FestivalsView />;

      case 'cart':
        return <CartView />;

      case 'wallet':
        return <WalletPreviewView />;

      case 'orders':
        return <OrdersPreviewView />;

      case 'account':
        return <AccountPreviewView />;

      default:
        return <ProductListingView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-amber-500 selection:text-white">
      {/* Short professional splash screen */}
      <SplashScreen />

      {/* Main Navigation */}
      <Navbar />

      <main className="flex-grow">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Auth Modals & Prompts */}
      <AuthModalOrScreen />
      <LoginRequiredPromptModal />
      <LogoutConfirmModal />

      {/* Global Product Detail Modal */}
      <ProductDetailModal />

      {/* Real-time Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </AuthProvider>
  );
}
