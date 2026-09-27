import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Phone, MessageCircle, MapPin, Navigation, Clock, Utensils, ShieldCheck, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactLocation: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const handleWhatsAppChat = (phoneRaw: string) => {
    const text = encodeURIComponent(
      `Hello Yamama Shawaya, I would like to place an inquiry / order from Perinthalmanna / Angadippuram.`
    );
    window.open(`https://wa.me/${phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-16 lg:py-24 bg-[#120a06] border-t border-[#29180f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT & CONNECT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Find Us in Perinthalmanna
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Perinthalmanna / Angadippuram, Malappuram District, Kerala. Serving hot charcoal Shawaya, Bishavari rice & icy mojitos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Info Card */}
          <div className="lg:col-span-7 bg-[#1a100a] p-6 sm:p-8 rounded-3xl border border-[#311f14] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-white shadow-lg">
                  <Flame className="w-6 h-6 fill-amber-300" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                    “{RESTAURANT_INFO.tagline}”
                  </p>
                </div>
              </div>

              {/* Location details */}
              <div className="space-y-4 text-sm text-neutral-300 mb-8">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#23150d] border border-[#362114]">
                  <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Location</span>
                    <span className="text-neutral-300 text-xs sm:text-sm">
                      Perinthalmanna / Angadippuram, Kerala, India
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      Malappuram District · Kerala Food Destination
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#23150d] border border-[#362114]">
                  <Clock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Operating Hours</span>
                    <span className="text-neutral-300 text-xs sm:text-sm">
                      {RESTAURANT_INFO.openingHours}
                    </span>
                    <span className="block text-[11px] text-amber-400 font-semibold mt-0.5">
                      Dine-in, Takeaway Parcels & Doorstep Delivery
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#23150d] border border-[#362114]">
                  <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Our Promise</span>
                    <span className="text-neutral-400 text-xs">
                      100% fresh chicken, hygienic coal grilling, premium spices with zero shortcuts.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#2d1b11]">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#29170f] hover:bg-[#382015] border border-orange-500/30 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>Open in Google Maps</span>
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Order Takeaway / Delivery</span>
              </button>
            </div>
          </div>

          {/* Direct Phone & WhatsApp Connections Card */}
          <div className="lg:col-span-5 bg-[#1a100a] p-6 sm:p-8 rounded-3xl border border-[#311f14] shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
                Direct Contact Lines
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-2">
                Call Or WhatsApp
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Official contact numbers as printed on our restaurant menu. Tap to call or chat instantly.
              </p>

              {/* Phone cards */}
              <div className="space-y-4">
                {RESTAURANT_INFO.phones.map((phone, idx) => (
                  <div
                    key={phone.raw}
                    className="p-4 rounded-2xl bg-[#21130b] border border-[#392114] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-600/30 text-orange-400 font-bold text-xs flex items-center justify-center border border-orange-500/40">
                          {idx + 1}
                        </span>
                        <span className="font-display text-lg font-black text-white tracking-wide">
                          {phone.display}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${phone.raw}`}
                        className="py-2.5 px-3 rounded-xl bg-[#2e1a0f] hover:bg-orange-600 text-neutral-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#442718]"
                      >
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                        <span>Call Now</span>
                      </a>
                      <button
                        onClick={() => handleWhatsAppChat(phone.raw)}
                        className="py-2.5 px-3 rounded-xl bg-[#0f2416] hover:bg-emerald-600 text-emerald-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-900/50 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="mt-6 pt-4 border-t border-[#29170e] text-center">
              <p className="text-xs text-neutral-400">
                Craving food right now? Send us your order on WhatsApp for fast response and delivery confirmation.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
