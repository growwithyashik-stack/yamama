import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, MenuItem, MenuItemPortion } from '../data/menuData';
import { Search, Plus, Check, Utensils, GlassWater, Flame, Sparkles } from 'lucide-react';

export const FullMenu: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Track selected portion for multi-portion items
  const [selectedPortions, setSelectedPortions] = useState<Record<string, MenuItemPortion['size']>>({
    'shawaya-rice-combo': 'Full',
    'shawaya-kubus': 'Full',
    'bishavari-rice-only': 'Full',
  });

  // Track item add animation feedback
  const [justAddedKey, setJustAddedKey] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Items', icon: Utensils },
    { id: 'SHAWAYA & RICE', label: 'Shawaya & Rice', icon: Flame },
    { id: 'MOJITOS (BENE TIBI)', label: 'Mojitos (Bene Tibi)', icon: Sparkles },
    { id: 'MOJITOS', label: 'Classic Mojitos', icon: GlassWater },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectSize = (itemId: string, size: MenuItemPortion['size']) => {
    setSelectedPortions((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAddToCart = (item: MenuItem, directSize?: MenuItemPortion['size']) => {
    const sizeToUse = directSize || selectedPortions[item.id] || item.portions[0].size;
    addToCart(item, sizeToUse);

    const feedbackKey = `${item.id}_${sizeToUse}`;
    setJustAddedKey(feedbackKey);
    setTimeout(() => {
      setJustAddedKey(null);
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#0e0906] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>ORIGINAL RESTAURANT MENU</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore Our Menu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            Authentic recipes, exact prices as per menu, freshly prepared for takeaway & delivery in Perinthalmanna & Angadippuram.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#170f0b] rounded-2xl border border-[#2d1c13] w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/50'
                      : 'text-neutral-400 hover:text-white hover:bg-[#251711]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dishes or mojitos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#170f0b] border border-[#2d1c13] text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Grouped Category Display or Flat List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#140c08] rounded-2xl border border-[#2a1a11]">
            <p className="text-lg font-bold text-neutral-300">No menu items found</p>
            <p className="text-xs text-neutral-500 mt-1">Try searching for something else or clear filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            
            {/* 1. SHAWAYA & RICE CATEGORY */}
            {(selectedCategory === 'ALL' || selectedCategory === 'SHAWAYA & RICE') && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2d1b12]">
                  <div className="p-2 rounded-lg bg-red-950/80 border border-red-800/40 text-orange-400">
                    <Flame className="w-5 h-5 fill-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                      Category 1: SHAWAYA & RICE
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Signature charcoal-roasted chicken & authentic aromatic Bishavari spiced rice
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems
                    .filter((i) => i.category === 'SHAWAYA & RICE')
                    .map((item) => {
                      const activeSize = selectedPortions[item.id] || item.portions[0].size;
                      const activePortion =
                        item.portions.find((p) => p.size === activeSize) || item.portions[0];
                      const isAdded = justAddedKey === `${item.id}_${activeSize}`;

                      return (
                        <div
                          key={item.id}
                          className="bg-[#18100b] rounded-2xl border border-[#311f15] hover:border-orange-500/40 transition-all p-5 flex flex-col justify-between shadow-lg"
                        >
                          <div>
                            {/* Card Top / Image Preview */}
                            {item.image && (
                              <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-[#23150d] relative group">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {item.isPopular && (
                                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider shadow">
                                    Popular
                                  </span>
                                )}
                              </div>
                            )}

                            <h4 className="font-display text-lg font-bold text-white uppercase leading-snug">
                              {item.name}
                            </h4>

                            {item.description && (
                              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Portion selection & pricing */}
                          <div className="mt-5 pt-4 border-t border-[#291910]">
                            <div className="text-[11px] uppercase font-bold text-neutral-400 mb-2 flex items-center justify-between">
                              <span>Choose Size / Portion:</span>
                              <span className="text-orange-400 font-bold">{activeSize}</span>
                            </div>

                            {/* Size buttons */}
                            <div className="grid grid-cols-3 gap-1.5 bg-[#0f0906] p-1.5 rounded-xl border border-[#2b1910] mb-4">
                              {item.portions.map((portion) => {
                                const isCurrent = activeSize === portion.size;
                                return (
                                  <button
                                    key={portion.size}
                                    onClick={() => handleSelectSize(item.id, portion.size)}
                                    className={`py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                                      isCurrent
                                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow'
                                        : 'text-neutral-400 hover:text-white hover:bg-[#20120b]'
                                    }`}
                                  >
                                    <div>{portion.size}</div>
                                    <div className="text-[11px] font-black text-amber-300">
                                      ₹{portion.price}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Action Row */}
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                                  Selected Price
                                </span>
                                <span className="font-display text-2xl font-black text-amber-400">
                                  ₹{activePortion.price}
                                </span>
                              </div>

                              <button
                                onClick={() => handleAddToCart(item)}
                                className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                                  isAdded
                                    ? 'bg-emerald-600 text-white scale-105'
                                    : 'bg-orange-600 hover:bg-orange-500 text-white active:scale-95'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-4 h-4 text-white" />
                                    <span>ADDED!</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4" />
                                    <span>ADD TO ORDER</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Quick add all sizes breakdown preview */}
                            <div className="mt-3 pt-2 text-[11px] text-neutral-500 flex justify-between border-t border-[#23140d]">
                              {item.portions.map((p) => (
                                <span key={p.size}>
                                  {p.size}: <strong className="text-neutral-300">₹{p.price}</strong>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 2. MOJITOS (BENE TIBI) */}
            {(selectedCategory === 'ALL' || selectedCategory === 'MOJITOS (BENE TIBI)') && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2d1b12]">
                  <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800/40 text-amber-400">
                    <Sparkles className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                      Category 2: MOJITOS (BENE TIBI)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Gourmet crushed mocktails crafted with premium infusions, herbs and ice
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems
                    .filter((i) => i.category === 'MOJITOS (BENE TIBI)')
                    .map((item) => {
                      const portion = item.portions[0];
                      const isAdded = justAddedKey === `${item.id}_${portion.size}`;

                      return (
                        <div
                          key={item.id}
                          className="bg-[#18100b] rounded-2xl border border-[#311f15] hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between shadow-md group"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                                {item.name}
                              </h4>
                              {item.isSpecial ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/40 shrink-0">
                                  Special
                                </span>
                              ) : item.isPopular ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-600/30 text-orange-300 border border-orange-500/40 shrink-0">
                                  Popular
                                </span>
                              ) : null}
                            </div>

                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#291910] flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                                Bene Tibi
                              </span>
                              <span className="font-display text-xl font-black text-amber-400">
                                ₹{portion.price}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddToCart(item)}
                              className={`px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#291710] hover:bg-orange-600 text-amber-200 hover:text-white border border-amber-600/30 active:scale-95'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white" />
                                  <span>ADDED</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>ADD ₹{portion.price}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* 3. MOJITOS (CLASSIC) */}
            {(selectedCategory === 'ALL' || selectedCategory === 'MOJITOS') && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[#2d1b12]">
                  <div className="p-2 rounded-lg bg-teal-950/80 border border-teal-800/40 text-teal-400">
                    <GlassWater className="w-5 h-5 fill-teal-500/20" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                      Category 3: MOJITOS
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Refreshing iced fruit coolers with mint sprigs and lime soda (All ₹80)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredItems
                    .filter((i) => i.category === 'MOJITOS')
                    .map((item) => {
                      const portion = item.portions[0];
                      const isAdded = justAddedKey === `${item.id}_${portion.size}`;

                      return (
                        <div
                          key={item.id}
                          className="bg-[#18100b] rounded-2xl border border-[#311f15] hover:border-teal-500/40 transition-all p-4 flex flex-col justify-between shadow-md group"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-bold text-base text-white group-hover:text-teal-300 transition-colors">
                                {item.name}
                              </h4>
                              {item.isPopular && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-teal-600/30 text-teal-300 border border-teal-500/40 shrink-0">
                                  Favorite
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#291910] flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 uppercase block font-semibold">
                                Iced Mojito
                              </span>
                              <span className="font-display text-xl font-black text-teal-300">
                                ₹{portion.price}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddToCart(item)}
                              className={`px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#1b2621] hover:bg-teal-600 text-teal-200 hover:text-white border border-teal-600/30 active:scale-95'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white" />
                                  <span>ADDED</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>ADD ₹{portion.price}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
