import React from 'react';
import broastImg from '@/src/assets/images/crispy_broast_banner_1790495367319.jpg';
import { Flame, Bell, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const BroastSection: React.FC = () => {
  const handleNotify = () => {
    const text = encodeURIComponent(
      `Hi Yamama Shawaya, I want to be notified when BROAST is launched at Perinthalmanna / Angadippuram! 🔥🍗`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phones[0].raw}?text=${text}`, '_blank');
  };

  return (
    <section id="broast-soon" className="py-16 lg:py-24 relative overflow-hidden bg-[#0c0705]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="relative rounded-3xl overflow-hidden border border-red-900/60 shadow-2xl bg-gradient-to-br from-[#1c0d08] via-[#140905] to-[#260e06]">
          
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0">
            <img
              src={broastImg}
              alt="Crispy Golden Fried Broast Chicken Yamama Shawaya"
              className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 opacity-60"
            />
            {/* Multi-layered dark and fiery gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0705] via-[#0d0705]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0705] via-transparent to-[#0d0705]/60" />
            {/* Fiery ember glow */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/30 border border-red-500/60 text-red-200 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6 shadow-lg shadow-red-950/50">
              <Flame className="w-4 h-4 text-red-400 fill-red-500 animate-pulse" />
              <span>COMING SOON 🔥</span>
            </div>

            {/* Big Prominent Title */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-3">
              BROAST
            </h2>

            <div className="text-2xl sm:text-3xl font-display font-black text-amber-400 mb-4 flex items-center gap-2">
              <span>COMING SOON 🔥</span>
            </div>

            {/* Slogan */}
            <p className="text-xl sm:text-2xl font-bold text-orange-200/95 tracking-wide mb-3">
              “Something crispy is coming your way!”
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-lg">
              Get ready for ultra-crispy, deeply seasoned, tender and juicy broasted chicken crafted to perfection. The ultimate crunch is preparing to land at Yamama Shawaya, Perinthalmanna & Angadippuram!
            </p>

            {/* Features preview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs font-semibold text-neutral-300">
              <div className="flex items-center gap-2 bg-[#1b100ab3] backdrop-blur-sm p-2.5 rounded-xl border border-red-900/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Secret Spice Crust</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1b100ab3] backdrop-blur-sm p-2.5 rounded-xl border border-red-900/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Max Crunch Texture</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1b100ab3] backdrop-blur-sm p-2.5 rounded-xl border border-red-900/40 col-span-2 sm:col-span-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Special Dips & Fries</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleNotify}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-red-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-red-400/40"
              >
                <Bell className="w-4 h-4" />
                <span>Notify Me On WhatsApp</span>
              </button>

              <div className="text-xs text-neutral-400 italic">
                *Launching soon at Yamama Shawaya Perinthalmanna
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
