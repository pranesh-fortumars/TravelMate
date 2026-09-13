import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS } from '../data/mockData';

export const ExploreView: React.FC = () => {
  const { setActiveTab, showToast } = useTrip();

  const [budgetCap, setBudgetCap] = useState<number | null>(2000);
  const [selectedCategory, setSelectedCategory] = useState('Mountains & Ghats');
  const [search, setSearch] = useState('');

  const filtered = DESTINATIONS.filter(d => {
    if (budgetCap && d.dailyBudget > budgetCap) return false;
    if (search && !d.title.toLowerCase().includes(search.toLowerCase()) && !d.state.toLowerCase().includes(search.toLowerCase())) {
      return false;
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
        <p className="text-xs text-[#c2c6d6] mt-0.5">Curated escapes within your exact financial threshold</p>
      </div>

      {/* Search Bar */}
      <div className="px-5 mt-3">
        <div className="flex items-center bg-[#161f33] rounded-xl px-3.5 py-2.5 border border-white/10 shadow-md">
          <span className="material-symbols-outlined text-[#adc6ff] text-[20px] mr-2.5">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search state, trek, beach, or ruins..."
            className="bg-transparent text-[#d9e2fd] text-sm placeholder-[#8c909f] outline-none w-full"
          />
        </div>
      </div>

      {/* Budget Filter Buttons */}
      <div className="px-5 mt-4">
        <span className="text-[11px] text-[#c2c6d6] font-bold uppercase tracking-wider block mb-2">
          Set Maximum Daily Budget
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setBudgetCap(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
              budgetCap === null
                ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                : 'bg-[#161f33] text-[#c2c6d6] border-white/5'
            }`}
          >
            Any Budget
          </button>
          {[1500, 2000, 3000].map(val => (
            <button
              key={val}
              onClick={() => setBudgetCap(val)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                budgetCap === val
                  ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                  : 'bg-[#161f33] text-[#c2c6d6] border-white/5'
              }`}
            >
              &lt; ₹{val.toLocaleString('en-IN')}/day
            </button>
          ))}
        </div>
      </div>

      {/* Category Chips */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['Mountains & Ghats', 'Coastal & Beaches', 'Heritage & Palaces', 'Wildlife', 'Backpacking'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#202a3e] text-[#ffb95f] border-[#ffb95f]/40 font-bold'
                  : 'bg-[#121b2f] text-[#c2c6d6] border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Epic Circuit Odyssey Hero Showcase */}
      <div className="px-5 mt-5">
        <div className="relative rounded-2xl overflow-hidden bg-[#161f33] border border-white/10 shadow-xl">
          <div
            className="h-44 w-full bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDC-4L1Xp_S8d_m5zO56_gQ_6Hw0k16sX6wJ2Y1kY-N3S64n51kHlQxG6u6yXvX4lDqX2y0kGk8hYv5f-tL1M0Q5j2kX4z')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] via-[#161f33]/60 to-transparent"></div>
            
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ee9800] text-[#5b3800] text-[10px] font-extrabold uppercase">
              EPIC MONSOON ODYSSEY
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-[10px] text-[#adc6ff] uppercase font-bold tracking-wider">
                7 Days • 4 Destinations
              </span>
              <h3 className="text-xl font-extrabold text-[#d9e2fd]">Western Ghats Monsoon Circuit</h3>
              <p className="text-xs text-[#c2c6d6] mt-0.5">Munnar → Wayanad → Coorg → Chikmagalur</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between bg-[#121b2f] border-t border-white/5">
            <div>
              <span className="text-xs text-[#c2c6d6] block">Est. Group Cost</span>
              <span className="text-base font-extrabold text-[#4edea3]">₹14,500 Total</span>
            </div>

            <button
              onClick={() => {
                showToast('Selected Western Ghats Circuit!');
                setActiveTab('plan');
              }}
              className="px-4 py-2 rounded-xl bg-[#4d8eff] text-[#002e6a] text-xs font-bold shadow-md active:scale-95"
            >
              Plan This Circuit
            </button>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[#d9e2fd]">Verified Destinations ({filtered.length})</h3>
          <span className="text-xs text-[#c2c6d6]">Lowest price guaranteed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(dest => (
            <div
              key={dest.id}
              className="rounded-2xl bg-[#161f33] border border-white/10 overflow-hidden shadow-lg flex flex-col"
            >
              <div
                className="h-40 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${dest.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] to-transparent"></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#091326]/80 backdrop-blur-md text-[#ffb95f] text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{dest.rating}</span>
                </div>
                {dest.isEcoCertified && (
                  <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-[#00a572] text-[#00311f] text-[10px] font-bold">
                    Shola Eco-Certified
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div>
                  <h4 className="text-base font-bold text-[#d9e2fd]">{dest.title}</h4>
                  <span className="text-xs text-[#c2c6d6]">{dest.subtitle}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {dest.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#202a3e] text-[#adc6ff]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#c2c6d6]">Avg Budget</span>
                    <span className="text-sm font-bold text-[#4edea3]">₹{dest.dailyBudget}/day</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('3dmap')}
                      className="p-2 rounded-xl bg-[#202a3e] text-[#adc6ff] hover:text-[#d9e2fd]"
                      title="3D Terrain View"
                    >
                      <span className="material-symbols-outlined text-[18px]">3d_rotation</span>
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Selected ${dest.title} for trip planning!`);
                        setActiveTab('plan');
                      }}
                      className="px-3 py-2 rounded-xl bg-[#4d8eff] text-[#00285d] text-xs font-bold active:scale-95"
                    >
                      Plan Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
