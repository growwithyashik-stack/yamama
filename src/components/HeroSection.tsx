import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import heroImg from '@/src/assets/images/shawaya_hero_dish_1790495348191.jpg';
import { Flame, ArrowRight, UtensilsCrossed, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background radial ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-red-700/25 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-950/80 to-red-950/80 border border-orange-500/30 text-orange-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-500 animate-pulse" />
              <span>YAMAMA SHAWAYA</span>
              <span className="text-orange-500">·</span>
              <span className="text-amber-300 tracking-wider">“REFILL YOUR ENERGY”</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Authentic Shawaya. <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-red-500 bg-clip-text text-transparent">
                Bold Flavours.
              </span> <br />
              Full Energy.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Fresh coal-roasted Shawaya chicken spiced to perfection, steaming aromatic Bishavari basmati rice, tender kubus flatbread, and handcrafted signature Mojitos. Prepared fresh daily in Perinthalmanna & Angadippuram.
            </p>

            {/* Value bullets */}
            <div className="pt-1 flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-5 text-xs sm:text-sm text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Original Kerala & Arabian Spices
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Fragrant Bishavari Rice Combos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                Hand-Crafted Mojito Bar
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  scrollToMenu();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-orange-950/60 hover:shadow-orange-700/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer border border-orange-400/40"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#201510] hover:bg-[#2c1d16] text-neutral-200 hover:text-white font-bold text-base border border-[#442c20] hover:border-orange-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                <span>VIEW MENU (₹)</span>
              </button>
            </div>

            {/* Location strip */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Perinthalmanna / Angadippuram, Kerala, India</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-amber-400/90 font-semibold hidden sm:inline">Open Today: 12:00 PM – 11:30 PM</span>
            </div>

          </div>

          {/* Right Column: Hero Dish Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative back glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-600 via-red-600 to-amber-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1a120c] border border-orange-500/30 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Yamama Shawaya Roasted Chicken with Bishavari Spiced Rice"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0906] via-[#0e0906]/30 to-transparent" />

                {/* Floating Dish Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#140e0abf] backdrop-blur-md p-4 rounded-xl border border-orange-500/30 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Signature House Combo</span>
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">
                      Shawaya Chicken + Bishavari Rice
                    </div>
                    <div className="text-neutral-400 text-xs mt-0.5">
                      Quarter ₹180 · Half ₹340 · Full ₹660
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('menu');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-black text-xs transition-colors shrink-0"
                  >
                    Select Size
                  </button>
                </div>
              </div>

              {/* Energy Badge floating */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-500 to-orange-600 text-neutral-950 font-black text-xs uppercase px-3 py-1.5 rounded-full shadow-lg border-2 border-[#0e0906] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
                <span>100% Fresh Charcoal Grilled</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
