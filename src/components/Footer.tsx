import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Flame, Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090503] text-neutral-400 border-t border-[#22130b] pt-14 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#21120a]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-white shadow-md">
                <Flame className="w-6 h-6 fill-amber-300" />
              </div>
              <div>
                <span className="font-display text-xl font-black text-white uppercase tracking-wider block">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-amber-400 uppercase -mt-1 block">
                  “{RESTAURANT_INFO.tagline}”
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Serving the finest authentic coal-roasted Shawaya chicken, fragrant Bishavari basmati rice combos and hand-crafted mojitos in Perinthalmanna / Angadippuram, Kerala.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Perinthalmanna / Angadippuram, Kerala</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-orange-400 transition-colors cursor-pointer font-semibold text-orange-400"
                >
                  Order Now (Cart)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('broast-soon')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Broast Chicken</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-red-600/40 text-red-300 font-bold uppercase">
                    Soon 🔥
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Location & Timing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and WhatsApp Links */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              Direct Ordering Numbers
            </span>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#140b07] border border-[#2b170e]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-white">{RESTAURANT_INFO.phones[0].display}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${RESTAURANT_INFO.phones[0].raw}`}
                    className="text-xs text-orange-400 hover:text-white font-bold"
                  >
                    Call
                  </a>
                  <span className="text-neutral-600">·</span>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.phones[0].raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-white font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#140b07] border border-[#2b170e]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-white">{RESTAURANT_INFO.phones[1].display}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${RESTAURANT_INFO.phones[1].raw}`}
                    className="text-xs text-orange-400 hover:text-white font-bold"
                  >
                    Call
                  </a>
                  <span className="text-neutral-600">·</span>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.phones[1].raw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-white font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 pt-1">
              Exact items and prices from our official restaurant menu. Delivery charges applicable by distance.
            </p>
          </div>

        </div>

        {/* Clean Copyright Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()}</span>
            <strong className="text-neutral-300">YAMAMA SHAWAYA</strong>
            <span>· All Rights Reserved.</span>
          </div>
          <div>
            Perinthalmanna / Angadippuram, Kerala, India
          </div>
        </div>

      </div>
    </footer>
  );
};
