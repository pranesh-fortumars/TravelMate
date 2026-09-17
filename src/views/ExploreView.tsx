import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS, CURATED_CIRCUITS } from '../data/mockData';
import { DestinationCard } from '../types';

export const ExploreView: React.FC = () => {
  const { setActiveTab, showToast, savedDestinationIds, toggleSaveDestination } = useTrip();

  const [budgetCap, setBudgetCap] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeDetailDest, setActiveDetailDest] = useState<DestinationCard | null>(null);

  const categories = [
    'All',
    'Mountains & Ghats',
    'Coastal & Beaches',
    'Heritage & Palaces',
    'High Altitude',
    'Spiritual',
  ];

  const filtered = DESTINATIONS.filter(d => {
    if (budgetCap && d.dailyBudget > budgetCap) return false;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Mountains & Ghats' && !d.tags.includes('Mountains') && !d.tags.includes('Tea Estates')) return false;
      if (selectedCategory === 'Coastal & Beaches' && !d.tags.includes('Beaches')) return false;
      if (selectedCategory === 'Heritage & Palaces' && !d.tags.includes('Heritage')) return false;
      if (selectedCategory === 'High Altitude' && !d.tags.includes('High Altitude')) return false;
      if (selectedCategory === 'Spiritual' && !d.tags.includes('Spiritual')) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchState = d.state.toLowerCase().includes(q);
      const matchTag = d.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchState && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd]">
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] font-bold text-[#ffb95f] uppercase tracking-widest">
          BUDGET-FIRST DISCOVERY RADAR
        </span>
        <h1 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight mt-0.5">Explore India</h1>
        <p className="text-xs text-[#c2c6d6] mt-0.5">Authentic cultural escapes, scenic circuits & responsible travel</p>
      </div>

      {/* Search Bar */}
      <div className="px-5 mt-3">
        <div className="flex items-center bg-[#161f33] rounded-xl px-3.5 py-2.5 border border-white/10 shadow-md">
          <span className="material-symbols-outlined text-[#adc6ff] text-[20px] mr-2.5">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search state, trek, beach, ruins, or ghats..."
            className="bg-transparent text-[#d9e2fd] text-sm placeholder-[#8c909f] outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-[#c2c6d6] text-xs ml-2">✕</button>
          )}
        </div>
      </div>

      {/* Category Chips */}
      <div className="px-5 mt-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff] font-bold'
                  : 'bg-[#121b2f] text-[#c2c6d6] border-white/5 hover:bg-[#1a253c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Filter Buttons */}
      <div className="px-5 mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#c2c6d6] font-bold uppercase tracking-wider">
            Daily Budget Cap
          </span>
          {budgetCap && (
            <button onClick={() => setBudgetCap(null)} className="text-[10px] text-[#adc6ff] hover:underline">
              Reset filter
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setBudgetCap(null)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 border transition-all ${
              budgetCap === null
                ? 'bg-[#202a3e] text-[#4edea3] border-[#4edea3]/40'
                : 'bg-[#121b2f] text-[#c2c6d6] border-white/5'
            }`}
          >
            All Budgets
          </button>
          {[1500, 2000, 2500].map(val => (
            <button
              key={val}
              onClick={() => setBudgetCap(val)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 border transition-all ${
                budgetCap === val
                  ? 'bg-[#202a3e] text-[#4edea3] border-[#4edea3]/40 font-bold'
                  : 'bg-[#121b2f] text-[#c2c6d6] border-white/5'
              }`}
            >
              ≤ ₹{val.toLocaleString('en-IN')}/day
            </button>
          ))}
        </div>
      </div>

      {/* Curated Circuit Odysseys Carousel */}
      <div className="mt-5">
        <div className="px-5 flex items-baseline justify-between mb-2.5">
          <div>
            <h3 className="text-sm font-bold text-[#d9e2fd]">Curated Multi-Stop Circuits</h3>
            <p className="text-[11px] text-[#c2c6d6]">Pre-engineered road and rail loops</p>
          </div>
          <span className="text-[10px] text-[#ffb95f] font-bold uppercase tracking-wider">Verified Routes</span>
        </div>

        <div className="flex gap-3.5 overflow-x-auto px-5 pb-2 no-scrollbar">
          {CURATED_CIRCUITS.map(circ => (
            <div
              key={circ.id}
              className="w-72 shrink-0 rounded-2xl bg-[#161f33] border border-white/10 overflow-hidden shadow-xl flex flex-col"
            >
              <div
                className="h-36 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${circ.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] via-[#161f33]/40 to-transparent"></div>
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#ee9800] text-[#5b3800] text-[9px] font-extrabold uppercase">
                  {circ.badge}
                </span>
                <span className="absolute bottom-2 left-3 text-[10px] font-bold text-[#adc6ff]">
                  {circ.duration}
                </span>
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                <div>
                  <h4 className="text-sm font-bold text-[#d9e2fd]">{circ.title}</h4>
                  <p className="text-xs text-[#ffb95f] mt-0.5">{circ.route}</p>
                  <p className="text-[11px] text-[#c2c6d6] mt-1 line-clamp-2">{circ.highlight}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <span className="text-xs font-bold text-[#4edea3]">{circ.groupCost}</span>
                    <span className="text-[10px] text-[#c2c6d6] block">{circ.perPerson}</span>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Loaded ${circ.title} into Trip Planner!`);
                      setActiveTab('plan');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#4d8eff] text-[#00285d] text-xs font-bold active:scale-95 shadow-md"
                  >
                    Plan This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-[#d9e2fd]">Verified Destinations ({filtered.length})</h3>
            <span className="text-xs text-[#c2c6d6]">Tap for detailed guides & safety notes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(dest => {
            const isSaved = savedDestinationIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="rounded-2xl bg-[#161f33] border border-white/10 overflow-hidden shadow-lg flex flex-col group cursor-pointer"
                onClick={() => setActiveDetailDest(dest)}
              >
                <div
                  className="h-44 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${dest.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] via-transparent to-black/30"></div>

                  {/* Top bar */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="px-2.5 py-0.5 rounded-full bg-[#091326]/80 backdrop-blur-md text-[#ffb95f] text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{dest.rating}</span>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleSaveDestination(dest.id);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        isSaved
                          ? 'bg-[#ffb4ab] text-[#93000a]'
                          : 'bg-[#091326]/80 text-[#d9e2fd] hover:bg-[#202a3e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isSaved ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                  </div>

                  {dest.isMonsoonPick && (
                    <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-[#00a572] text-[#00311f] text-[10px] font-bold">
                      Monsoon Window Clear
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-[#d9e2fd] group-hover:text-[#adc6ff] transition-colors">
                        {dest.title}
                      </h4>
                      <span className="text-xs text-[#ffb95f] font-semibold shrink-0">{dest.state}</span>
                    </div>
                    <p className="text-xs text-[#c2c6d6] mt-0.5 line-clamp-1">{dest.subtitle}</p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-2">
                      {dest.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-[#202a3e] text-[#adc6ff]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#c2c6d6]">Avg Budget</span>
                      <span className="text-sm font-bold text-[#4edea3]">
                        ₹{dest.dailyBudget.toLocaleString('en-IN')}/day
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setActiveDetailDest(dest);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#adc6ff]"
                      >
                        Explore Guide
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          showToast(`Planning trip to ${dest.title}...`);
                          setActiveTab('plan');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#4d8eff] text-[#00285d] text-xs font-bold active:scale-95 shadow-md"
                      >
                        Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Destination Detail Modal Sheet */}
      {activeDetailDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#161f33] border border-white/10 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#ffb95f] font-bold uppercase tracking-widest">
                  {activeDetailDest.state} • {activeDetailDest.bestSeason}
                </span>
                <h3 className="text-xl font-black text-[#d9e2fd]">{activeDetailDest.title}</h3>
              </div>
              <button
                onClick={() => setActiveDetailDest(null)}
                className="w-8 h-8 rounded-full bg-[#202a3e] flex items-center justify-center text-[#c2c6d6] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div
              className="h-44 w-full rounded-xl bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url('${activeDetailDest.image}')` }}
            >
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#091326]/80 backdrop-blur-md">
                <span className="text-xs text-[#d9e2fd] font-bold">{activeDetailDest.weather}</span>
                <span className="text-xs text-[#4edea3] font-bold">₹{activeDetailDest.dailyBudget}/day</span>
              </div>
            </div>

            {/* Overview */}
            {activeDetailDest.overview && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#adc6ff]">Overview</h4>
                <p className="text-xs text-[#d9e2fd] mt-1 leading-relaxed">{activeDetailDest.overview}</p>
              </div>
            )}

            {/* Top Attractions */}
            {activeDetailDest.topAttractions && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffb95f]">Top Verified Attractions</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {activeDetailDest.topAttractions.map((att, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#121b2f] text-[#d9e2fd] border border-white/5">
                      📍 {att}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Local Food Specialties */}
            {activeDetailDest.localFoodSpecialties && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4edea3]">Authentic Regional Specialties</h4>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {activeDetailDest.localFoodSpecialties.map((food, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#00a572]/15 text-[#4edea3] border border-[#4edea3]/20">
                      🍛 {food}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural Etiquette & Safety */}
            {activeDetailDest.culturalEtiquette && (
              <div className="p-3 rounded-xl bg-[#121b2f] border border-white/5 space-y-1.5">
                <h4 className="text-xs font-bold text-[#ffb4ab] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">shield</span>
                  Cultural Etiquette & Safety Notes
                </h4>
                {activeDetailDest.culturalEtiquette.map((tip, i) => (
                  <p key={i} className="text-[11px] text-[#c2c6d6] leading-snug">• {tip}</p>
                ))}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  toggleSaveDestination(activeDetailDest.id);
                }}
                className="px-3 py-2 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#d9e2fd] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {savedDestinationIds.includes(activeDetailDest.id) ? 'bookmark_added' : 'bookmark_add'}
                </span>
                <span>{savedDestinationIds.includes(activeDetailDest.id) ? 'Saved' : 'Wishlist'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveDetailDest(null);
                  setActiveTab('map3d');
                }}
                className="px-3 py-2 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#adc6ff] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">3d_rotation</span>
                <span>3D Terrain</span>
              </button>

              <button
                onClick={() => {
                  setActiveDetailDest(null);
                  showToast(`Planning AI itinerary for ${activeDetailDest.title}...`);
                  setActiveTab('plan');
                }}
                className="flex-1 py-2 rounded-xl bg-[#4d8eff] text-[#00285d] text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Plan Trip with AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
