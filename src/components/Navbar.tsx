import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { ShoppingBag, Phone, Menu as MenuIcon, X, Flame, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0e0906]/95 backdrop-blur-md border-b border-[#2d1e16] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#991b1b] via-[#c2410c] to-[#991b1b] px-4 py-1.5 text-center text-xs font-medium text-white flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
        <span>Perinthalmanna & Angadippuram, Kerala</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">Dine-in, Takeaway & Home Delivery</span>
        <span className="hidden md:inline">·</span>
        <span className="hidden md:inline font-bold">Call: {RESTAURANT_INFO.phones[0].display}</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ea580c] via-[#dc2626] to-[#7f1d1d] flex items-center justify-center shadow-lg shadow-orange-950/50 border border-orange-500/30 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-7 h-7 text-amber-200 fill-amber-300/40" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
              YAMAMA <span className="text-orange-500">SHAWAYA</span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-amber-400/90 uppercase -mt-0.5">
              “REFILL YOUR ENERGY”
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-neutral-300">
          <button
            onClick={() => scrollTo('hero')}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('featured')}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            Specials
          </button>
          <button
            onClick={() => scrollTo('menu')}
            className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Menu</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-600/30 text-orange-300 font-bold border border-orange-500/40">
              ₹ Menu
            </span>
          </button>
          <button
            onClick={() => scrollTo('broast-soon')}
            className="hover:text-amber-400 text-amber-400/90 font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Broast</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-600/40 text-red-200 uppercase font-black tracking-wider border border-red-500/40 animate-pulse">
              Soon 🔥
            </span>
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>Location</span>
          </button>
        </div>

        {/* Actions (Phone & Cart) */}
        <div className="flex items-center gap-3">
          {/* Quick Call Button (Desktop) */}
          <a
            href={`tel:${RESTAURANT_INFO.phones[0].raw}`}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#241711] hover:bg-[#342218] border border-[#442c20] text-amber-200 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20" />
            <span>{RESTAURANT_INFO.phones[0].display}</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping cart"
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-900/30 transition-all active:scale-95 cursor-pointer border border-orange-400/30"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center border-2 border-[#0e0906] shadow animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">
              {totalItems === 0 ? 'Your Order' : `₹${subtotal}`}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#20150f] text-neutral-300 hover:text-white border border-[#3c271c]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#160e0a] border-b border-[#3c271c] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => scrollTo('hero')}
              className="p-3 text-left rounded-lg bg-[#231711] text-white hover:bg-orange-950/60 border border-[#3b271d]"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('featured')}
              className="p-3 text-left rounded-lg bg-[#231711] text-white hover:bg-orange-950/60 border border-[#3b271d]"
            >
              Popular Specials
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="p-3 text-left rounded-lg bg-[#231711] text-white hover:bg-orange-950/60 border border-[#3b271d] flex items-center justify-between"
            >
              <span>Full Menu</span>
              <span className="text-xs text-orange-400 font-bold">Original ₹</span>
            </button>
            <button
              onClick={() => scrollTo('broast-soon')}
              className="p-3 text-left rounded-lg bg-[#2d140e] text-amber-300 hover:bg-red-950/60 border border-red-900/60 flex items-center justify-between"
            >
              <span>Broast</span>
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                SOON
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#311f16] flex flex-col gap-2">
            <button
              onClick={() => scrollTo('location')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-[#1f130e] text-neutral-300 text-xs font-medium"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>Perinthalmanna / Angadippuram, Kerala</span>
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${RESTAURANT_INFO.phones[0].raw}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#281b13] hover:bg-[#38261b] text-orange-300 text-xs font-bold border border-orange-500/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 01</span>
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phones[1].raw}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#281b13] hover:bg-[#38261b] text-orange-300 text-xs font-bold border border-orange-500/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 02</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
