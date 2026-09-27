/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedHighlights } from './components/FeaturedHighlights';
import { FullMenu } from './components/FullMenu';
import { BroastSection } from './components/BroastSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StickyMobileBar } from './components/StickyMobileBar';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0d0806] text-[#f7f2ed] flex flex-col font-sans selection:bg-orange-600 selection:text-white">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Featured Items */}
          <FeaturedHighlights />

          {/* 3. Full Categorized Menu with exact items and ₹ prices */}
          <FullMenu />

          {/* 4. Broast Coming Soon Section */}
          <BroastSection />

          {/* 5. Contact / Location Info */}
          <ContactLocation />
        </main>

        {/* 6. Footer */}
        <Footer />

        {/* 7. Slide-over Cart & WhatsApp Checkout Drawer */}
        <CartDrawer />

        {/* 8. Sticky Mobile Order Action Bar */}
        <StickyMobileBar />
      </div>
    </CartProvider>
  );
}
