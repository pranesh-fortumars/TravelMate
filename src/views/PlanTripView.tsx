import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const PlanTripView: React.FC = () => {
  const { setActiveTab, updateBudget, showToast } = useTrip();

  const [budget, setBudget] = useState(12000);
  const [travellers, setTravellers] = useState(6);
  const [groupType, setGroupType] = useState('Friends');
  const [styleMode, setStyleMode] = useState('Best Value');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Nature', 'Trekking', 'Local Food']);
  const [isGenerating, setIsGenerating] = useState(false);

  const perPerson = Math.round(budget / travellers);

  // Allocations breakdown
  const transportCost = Math.round(budget * 0.27);
  const staysCost = Math.round(budget * 0.32);
  const foodCost = Math.round(budget * 0.20);
  const expCost = Math.round(budget * 0.12);
  const bufferCost = budget - (transportCost + staysCost + foodCost + expCost);

  const handleBudgetChange = (val: number) => {
    setBudget(val);
    updateBudget(val);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('Generated Intelligent Itinerary for Munnar!');
      setActiveTab('itinerary');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-5 pt-4 pb-28 text-[#d9e2fd]">
      {/* Wizard Tracker */}
      <div className="flex flex-col gap-2.5 bg-[#121b2f] p-4 rounded-2xl border border-white/5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00a572] text-[#00311f] font-bold text-[10px]">
              ✓
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wider">01 Dest</span>
          </div>
          <div className="h-0.5 w-4 bg-[#4edea3]/40 rounded-full"></div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00a572] text-[#00311f] font-bold text-[10px]">
              ✓
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wider">02 Group</span>
          </div>
          <div className="h-0.5 w-4 bg-[#4d8eff] rounded-full"></div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4d8eff] text-[#00285d] font-extrabold text-[10px] shadow-sm">
              03
            </span>
            <span className="text-[10px] text-[#adc6ff] font-bold uppercase tracking-wider">Budget</span>
          </div>
          <div className="h-0.5 w-4 bg-[#2b3549] rounded-full"></div>

          <div className="flex items-center gap-1.5 opacity-50">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2b3549] text-[#c2c6d6] text-[10px]">
              04
            </span>
            <span className="text-[10px] text-[#c2c6d6] font-bold uppercase tracking-wider">AI Gen</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-xs text-[#c2c6d6]">Live Neural Trip Engine · Munnar, Kerala</span>
          </div>
          <span className="text-xs text-[#ffb95f] font-bold">Step 3 of 4</span>
        </div>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1 mt-5">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#ee9800]/15 text-[#ffb95f] border border-[#ffb95f]/20">
          <span className="material-symbols-outlined text-[14px]">psychology</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Algorithmic Treasury</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight mt-1">
          Your Budget is the Brain of Your Trip
        </h2>
        <p className="text-xs text-[#c2c6d6] leading-relaxed">
          Tell TRAVELMATE your total cap. We optimize transport, stays, food, and permits in real-time.
        </p>
      </div>

      {/* Total Expedition Cap Card */}
      <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4 mt-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c2c6d6]">Total Expedition Cap</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-[#adc6ff]">₹</span>
              <span className="text-3xl font-extrabold text-[#d9e2fd] tracking-tight">
                {budget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="px-3 py-1 rounded-full bg-[#00a572]/20 text-[#4edea3] text-xs flex items-center gap-1 font-bold border border-[#4edea3]/30">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Optimized</span>
            </div>
            <span className="text-[11px] text-[#c2c6d6] mt-1">Tatkal sync on</span>
          </div>
        </div>

        {/* Calculation Strip */}
        <div className="bg-[#202a3e] px-4 py-2.5 rounded-xl flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">payments</span>
            <span className="text-sm font-bold text-[#d9e2fd]">₹{perPerson.toLocaleString('en-IN')}</span>
            <span className="text-xs text-[#c2c6d6]">/ person</span>
          </div>
          <span className="text-xs text-[#c2c6d6]">
            <strong className="text-[#d9e2fd] font-semibold">{travellers} Travellers</strong> · 3 Days
          </span>
        </div>

        {/* Range Slider */}
        <div className="flex flex-col gap-1.5">
          <input
            type="range"
            min={6000}
            max={36000}
            step={1000}
            value={budget}
            onChange={e => handleBudgetChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#2b3549] rounded-lg appearance-none cursor-pointer accent-[#4d8eff]"
          />
          <div className="flex justify-between text-[11px] text-[#c2c6d6]">
            <span>₹6,000 (Backpacker)</span>
            <span>₹20,000</span>
            <span>₹36,000 (Luxe)</span>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => handleBudgetChange(Math.min(36000, budget + 1000))}
            className="px-3.5 py-1.5 rounded-full bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#d9e2fd] shrink-0 border border-white/5 active:scale-95"
          >
            + ₹1,000
          </button>
          {[15000, 20000, 25000].map(val => (
            <button
              key={val}
              onClick={() => handleBudgetChange(val)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border active:scale-95 ${
                budget === val
                  ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                  : 'bg-[#202a3e] text-[#c2c6d6] border-white/5 hover:bg-[#2b3549]'
              }`}
            >
              ₹{val.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        {/* Dynamic Allocation Stack */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#d9e2fd] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#4d8eff]">pie_chart</span>
              Dynamic Machine Allocation
            </span>
            <span className="text-[11px] text-[#4edea3] font-semibold">5 buckets balanced</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#121b2f] flex flex-col gap-1 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[#d9e2fd] font-semibold">🚆 Transport <span className="text-[#c2c6d6] font-normal text-[11px]">· Sleeper Train + Shared Jeep</span></span>
                <span className="font-bold text-[#d9e2fd]">₹{transportCost.toLocaleString('en-IN')} <span className="text-[#c2c6d6] font-normal">(27%)</span></span>
              </div>
              <div className="w-full bg-[#2b3549] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4d8eff] h-full rounded-full transition-all duration-300" style={{ width: '27%' }}></div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121b2f] flex flex-col gap-1 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[#d9e2fd] font-semibold">🏡 Stays <span className="text-[#c2c6d6] font-normal text-[11px]">· Homestay with tea estate view</span></span>
                <span className="font-bold text-[#d9e2fd]">₹{staysCost.toLocaleString('en-IN')} <span className="text-[#c2c6d6] font-normal">(32%)</span></span>
              </div>
              <div className="w-full bg-[#2b3549] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#ffb95f] h-full rounded-full transition-all duration-300" style={{ width: '32%' }}></div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121b2f] flex flex-col gap-1 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[#d9e2fd] font-semibold">🍛 Food & Dining <span className="text-[#c2c6d6] font-normal text-[11px]">· Kerala Sadya & Local cafes</span></span>
                <span className="font-bold text-[#d9e2fd]">₹{foodCost.toLocaleString('en-IN')} <span className="text-[#c2c6d6] font-normal">(20%)</span></span>
              </div>
              <div className="w-full bg-[#2b3549] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4edea3] h-full rounded-full transition-all duration-300" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121b2f] flex flex-col gap-1 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[#d9e2fd] font-semibold">🎟️ Experiences <span className="text-[#c2c6d6] font-normal text-[11px]">· Eravikulam permit & Boating</span></span>
                <span className="font-bold text-[#d9e2fd]">₹{expCost.toLocaleString('en-IN')} <span className="text-[#c2c6d6] font-normal">(12%)</span></span>
              </div>
              <div className="w-full bg-[#2b3549] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#adc6ff] h-full rounded-full transition-all duration-300" style={{ width: '12%' }}></div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#121b2f] flex flex-col gap-1 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[#d9e2fd] font-semibold">🛡️ Safety Buffer <span className="text-[#c2c6d6] font-normal text-[11px]">· Rerouting & medical backup</span></span>
                <span className="font-bold text-[#d9e2fd]">₹{bufferCost.toLocaleString('en-IN')} <span className="text-[#c2c6d6] font-normal">(10%)</span></span>
              </div>
              <div className="w-full bg-[#2b3549] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#8c909f] h-full rounded-full transition-all duration-300" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Group Configuration Card */}
      <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 shadow-md flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#d9e2fd]">Who is traveling?</h3>
            <p className="text-xs text-[#c2c6d6]">Select dynamics to weight room sharing & jeep capacity</p>
          </div>
          <span className="material-symbols-outlined text-[#4d8eff] text-[22px]">diversity_3</span>
        </div>

        {/* Group Type Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {['Solo', 'Couple', 'Friends', 'Family', 'College Batch'].map(type => (
            <button
              key={type}
              onClick={() => setGroupType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                groupType === type
                  ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff] font-bold'
                  : 'bg-[#202a3e] text-[#c2c6d6] border-white/5 hover:bg-[#2b3549]'
              }`}
            >
              {groupType === type ? '✓ ' : ''}{type}
            </button>
          ))}
        </div>

        {/* Traveller Stepper */}
        <div className="bg-[#121b2f] p-3 rounded-xl flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-[#091326]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCcY7J6sE7JL0NyYhasuXAi3IKDSJqJDMk5x53pKBbXo90ttD8X0GdED2QUOhrRbxWaWLHSgCthNd6adWvFQ8-PLukkIG-k-f_eAMwtm8A_POefE42pDbLQBA3lRqSqhMUiRgvubak2Ot6MjvDqbQkLKwfCMDGPslacciNLUsaXT_DVhUnkHw4dj6pemtNblW9vThPShXEhupkaoctoaaPcoPEBFdxQbgsTSsylyj-t2ADZnpe4YtF"
                alt="Traveller"
              />
              <img
                className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-[#091326]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2eJ2T_qoadu0YrWBM0zsQTTl0QU5Bxo_3rJEjMFK58fMgEPD7UyTgfmpsMSLBaxSvkqDLW6p-Vr7C6UzsCROK6ZW1t3iDiF1YXdV_-b-vI1vNmFSbpy6bC8wduhh0lmteHhio9tRIvRLXEP6r2T5wRdUSXS6SGi23g6t7whEdmPMX3bqLxhVI0rbIoFkUSC8bAk2Vv_fJL8t34-91K7EHDAXbdmPu6g4FzXV5AIgVLw21E7C-at1"
                alt="Traveller"
              />
              <div className="inline-flex h-8 w-8 rounded-full bg-[#2b3549] text-[#d9e2fd] items-center justify-center text-xs font-bold ring-2 ring-[#091326]">
                +{Math.max(0, travellers - 2)}
              </div>
            </div>
            <span className="text-sm font-bold text-[#d9e2fd]">{travellers} Travellers</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#2b3549] p-1 rounded-xl">
            <button
              onClick={() => setTravellers(Math.max(1, travellers - 1))}
              className="w-8 h-8 rounded-lg bg-[#202a3e] hover:bg-[#30394e] text-[#d9e2fd] flex items-center justify-center font-bold"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-bold text-[#d9e2fd]">{travellers}</span>
            <button
              onClick={() => setTravellers(travellers + 1)}
              className="w-8 h-8 rounded-lg bg-[#202a3e] hover:bg-[#30394e] text-[#d9e2fd] flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Travel Style Selector */}
      <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 shadow-md flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#d9e2fd]">Travel Style & Cadence</h3>
            <p className="text-xs text-[#c2c6d6]">Calibrates comfort vs local authenticity ratio</p>
          </div>
          <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">tune</span>
        </div>

        {/* Style Buttons */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#121b2f] p-1.5 rounded-xl border border-white/5">
          {['Cheapest', 'Best Value', 'Comfort'].map(mode => (
            <button
              key={mode}
              onClick={() => setStyleMode(mode)}
              className={`py-2 text-xs rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1 ${
                styleMode === mode
                  ? 'bg-[#ee9800] text-[#5b3800] shadow-sm'
                  : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
              }`}
            >
              {mode === 'Best Value' ? '✨ ' : ''}{mode}
            </button>
          ))}
        </div>

        {/* Priority Experience Tags */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c2c6d6]">Priority Experiences</span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'Nature', emoji: '🌿' },
              { id: 'Trekking', emoji: '⛰️' },
              { id: 'Local Food', emoji: '🍛' },
              { id: 'Photography', emoji: '📸' },
              { id: 'Culture', emoji: '🏛️' },
            ].map(tag => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                    isSelected
                      ? 'bg-[#00a572]/20 text-[#4edea3] border-[#4edea3]/40'
                      : 'bg-[#202a3e] text-[#c2c6d6] border-white/5 hover:bg-[#2b3549]'
                  }`}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.id}</span>
                  {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destination Card Preview */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#161f33] mt-4 border border-white/10">
        <div
          className="bg-cover bg-center w-full h-32 relative"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3yvHsO5VeXku1_kqNT1lybiuZRPuKAmWM_DMSU26qcHyghd972guRio69xYtv5Mu6nNGxAO4PaFEIi0JXi_6QeI2Hx6qPTRbXtVEtUW0m1F20ZjK6kSUuF6EoVk655yVB5OWFJ2KGJk16ULJEeEn-AXB8CgSpRf4fW_6jpl8XaXOzHWGH_6unzJD-WDEUFKOyH5JteOLqjxGY2LadAvwSHkkl4duDPHYEdBBn08XW4jkyXLvoOYOm')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] via-[#161f33]/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">location_on</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#d9e2fd]">Munnar, Idukki</span>
                <span className="text-xs text-[#c2c6d6]">Western Ghats, Kerala · 3 Nights</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#040e21]/80 backdrop-blur-md text-[#d9e2fd] text-xs font-semibold">
              21°C Mild
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-12 rounded-xl bg-[#4d8eff] hover:bg-[#4d8eff]/90 text-[#00285d] font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-70"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isGenerating ? 'refresh' : 'bolt'}
          </span>
          <span>
            {isGenerating
              ? 'Synthesizing Best Rail & Stays...'
              : `Generate Intelligent Itinerary (₹${budget.toLocaleString('en-IN')})`}
          </span>
        </button>
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#c2c6d6] text-center">
          <span className="material-symbols-outlined text-[#4edea3] text-[16px]">task_alt</span>
          <span>Includes offline maps, live weather rerouting & UPI split sheet</span>
        </div>
      </div>
    </div>
  );
};
