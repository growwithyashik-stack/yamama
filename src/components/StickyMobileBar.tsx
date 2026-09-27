import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { ShoppingBag, Phone, MessageCircle, ArrowRight } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Quick mobile order bar" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#120a06]/95 backdrop-blur-lg border-t border-[#311f15] p-3 shadow-2xl">
      <div className="flex items-center gap-2">
        
        {/* Quick Call */}
        <a
          href={`tel:${RESTAURANT_INFO.phones[0].raw}`}
          className="w-12 h-12 rounded-xl bg-[#21140c] border border-[#3b2518] flex items-center justify-center text-orange-400 active:scale-95 transition-transform shrink-0"
          aria-label="Call Yamama Shawaya"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Quick WhatsApp */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.phones[0].raw}?text=${encodeURIComponent(
            'Hi Yamama Shawaya, I want to inquire or place an order!'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-[#0c2415] border border-[#1b4329] flex items-center justify-center text-emerald-400 active:scale-95 transition-transform shrink-0"
          aria-label="WhatsApp Yamama Shawaya"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Main CTA: Cart if items exist, or Order Now if empty */}
        {totalItems > 0 ? (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-between px-4 shadow-lg shadow-orange-950/60 active:scale-98 transition-transform border border-orange-400/40 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center">
                {totalItems}
              </div>
              <span>VIEW ORDER</span>
            </div>
            <div className="font-display font-black text-base text-amber-200">
              ₹{subtotal}
            </div>
          </button>
        ) : (
          <button
            onClick={scrollToMenu}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 active:scale-98 transition-transform border border-orange-400/40 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ORDER NOW (MENU)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </aside>
  );
};
