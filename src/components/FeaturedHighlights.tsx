import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, MenuItemPortion } from '../data/menuData';
import { Plus, Check, Sparkles, Flame } from 'lucide-react';

export const FeaturedHighlights: React.FC = () => {
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  // Filter 4 featured items
  const featured = [
    MENU_ITEMS.find((i) => i.id === 'shawaya-rice-combo')!,
    MENU_ITEMS.find((i) => i.id === 'shawaya-kubus')!,
    MENU_ITEMS.find((i) => i.id === 'bishavari-rice-only')!,
    MENU_ITEMS.find((i) => i.id === 'bene-tibi-passion-fruit')!,
  ].filter(Boolean);

  // Local size selection state for each item card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'shawaya-rice-combo': 'Full',
    'shawaya-kubus': 'Full',
    'bishavari-rice-only': 'Full',
    'bene-tibi-passion-fruit': 'Standard',
  });

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAdd = (item: typeof featured[0]) => {
    const chosenSize = (selectedSizes[item.id] || item.portions[0].size) as MenuItemPortion['size'];
    addToCart(item, chosenSize);

    setAddedItemId(`${item.id}_${chosenSize}`);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  return (
    <section id="featured" className="py-12 lg:py-16 bg-[#130d09] border-y border-[#291b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Customer Favorites & Combos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Signature Yamama Picks
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-neutral-400 max-w-md">
            Prepared fresh to order with original Kerala marinade, Arabian coals and chilled ingredients.
          </p>
        </div>

        {/* Grid of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => {
            const currentSize = selectedSizes[item.id] || item.portions[0].size;
            const currentPortion = item.portions.find((p) => p.size === currentSize) || item.portions[0];
            const isJustAdded = addedItemId === `${item.id}_${currentSize}`;

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#1c130d] border border-[#342217] hover:border-orange-500/50 shadow-lg hover:shadow-orange-950/40 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image & badge */}
                <div className="relative h-48 w-full overflow-hidden bg-[#261912]">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c130d] via-transparent to-black/30" />

                  {item.isPopular && (
                    <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-white" />
                      <span>Best Seller</span>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                    <span className="font-semibold text-amber-300/90">{item.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white leading-snug group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#2e1d14]">
                    {/* Portion selector if multiple options */}
                    {item.portions.length > 1 && (
                      <div className="mb-3.5">
                        <div className="text-[11px] uppercase font-bold text-neutral-400 mb-1.5">
                          Select Portion:
                        </div>
                        <div className="grid grid-cols-3 gap-1 bg-[#120a06] p-1 rounded-lg border border-[#2d1c13]">
                          {item.portions.map((portion) => (
                            <button
                              key={portion.size}
                              type="button"
                              onClick={() => handleSizeSelect(item.id, portion.size)}
                              className={`py-1 text-xs font-bold rounded transition-all cursor-pointer ${
                                currentSize === portion.size
                                  ? 'bg-orange-600 text-white shadow-sm'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {portion.size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and Add button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-neutral-400">
                          {currentPortion.size !== 'Standard' ? `${currentPortion.size} Price` : 'Price'}
                        </div>
                        <div className="font-display text-2xl font-black text-amber-400">
                          ₹{currentPortion.price}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white scale-105'
                            : 'bg-orange-600 hover:bg-orange-500 text-white hover:shadow-orange-800/40 active:scale-95'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>ADD TO ORDER</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
