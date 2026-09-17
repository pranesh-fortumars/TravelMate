import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { ActiveTrip, ItineraryActivity } from '../types';

export const PlanTripView: React.FC = () => {
  const { setActiveTab, updateBudget, showToast, createNewTrip } = useTrip();

  // Wizard state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Route & Duration
  const [origin, setOrigin] = useState('Bengaluru');
  const [primaryDestination, setPrimaryDestination] = useState('Munnar, Kerala');
  const [routeStops, setRouteStops] = useState<string[]>(['Gap Road Pass']);
  const [newStopInput, setNewStopInput] = useState('');
  const [daysTotal, setDaysTotal] = useState(3);
  const [travelPace, setTravelPace] = useState<'Relaxed' | 'Balanced' | 'Fast-Paced'>('Balanced');

  // Step 2: Budget & Group
  const [budget, setBudget] = useState(12000);
  const [travellers, setTravellers] = useState(6);
  const [groupType, setGroupType] = useState<'Solo' | 'Couple' | 'Friends' | 'Family' | 'College Batch'>('Friends');
  const [styleMode, setStyleMode] = useState('Best Value');

  // Step 3: Preferences
  const [selectedTags, setSelectedTags] = useState<string[]>(['Nature', 'Trekking', 'Local Food', 'Photography']);
  const [stayPreference, setStayPreference] = useState('Homestay & Eco-Cottage');
  const [transitPreference, setTransitPreference] = useState('Train + Shared 4x4 Jeep');
  const [dietaryPreference, setDietaryPreference] = useState('Strict Vegetarian');
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

  const handleAddStop = () => {
    if (newStopInput.trim() && !routeStops.includes(newStopInput.trim())) {
      setRouteStops(prev => [...prev, newStopInput.trim()]);
      setNewStopInput('');
      showToast(`Added waypoint: ${newStopInput.trim()}`);
    }
  };

  const handleRemoveStop = (index: number) => {
    setRouteStops(prev => prev.filter((_, i) => i !== index));
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
      // Build sample day-by-day activities
      const generatedActivities: ItineraryActivity[] = [
        {
          id: `it-gen-1`,
          dayNumber: 1,
          time: '08:00 AM',
          duration: '2 hrs',
          title: `Arrival & Check-in at ${stayPreference}`,
          description: `Welcome cardamom tea, luggage drop, and orientation briefing in ${primaryDestination}.`,
          category: 'Stay',
          cost: Math.round(staysCost / daysTotal),
          costPerHead: Math.round(staysCost / (daysTotal * travellers)),
          location: primaryDestination,
        },
        {
          id: `it-gen-2`,
          dayNumber: 1,
          time: '11:00 AM',
          duration: '2.5 hrs',
          title: 'Plantation Walk & Spice Nursery',
          description: `Guided walk through cinnamon, clove, and organic tea plots with local naturalist.`,
          category: 'Sightseeing',
          cost: 0,
          isFree: true,
          weatherTag: 'Pleasant 21°C',
          location: `${primaryDestination} Valley`,
        },
        {
          id: `it-gen-3`,
          dayNumber: 1,
          time: '01:30 PM',
          duration: '1 hr',
          title: `Authentic ${dietaryPreference} Lunch`,
          description: `Traditional banana-leaf meal with local red rice, sambar, and vegetable avial.`,
          category: 'Food',
          cost: Math.round(foodCost / (daysTotal * 2)),
          costPerHead: Math.round(foodCost / (daysTotal * 2 * travellers)),
          location: 'Main Bazaar Eatery',
        },
        {
          id: `it-gen-4`,
          dayNumber: 1,
          time: '04:30 PM',
          duration: '2 hrs',
          title: 'Sunset Viewpoint & Ridge Trail',
          description: `Panoramic valley views overlooking the Western Ghats mountain ridges.`,
          category: 'Activity',
          cost: 300,
          costPerHead: Math.round(300 / travellers),
          elevation: '1,680m',
          location: 'Sunset Point Pass',
        },
        {
          id: `it-gen-5`,
          dayNumber: 2,
          time: '07:00 AM',
          duration: '3 hrs',
          title: 'National Park Wildlife Safari',
          description: `Electric safari to witness endemic mountain wildlife and rare flora.`,
          category: 'Activity',
          cost: Math.round(expCost / 2),
          costPerHead: Math.round(expCost / (2 * travellers)),
          ticketsSynced: travellers,
          location: 'Sanctuary Gates',
        },
      ];

      const newTripData: ActiveTrip = {
        id: `trip-${Date.now()}`,
        title: `${primaryDestination.split(',')[0]} AI Odyssey`,
        subtitle: `${daysTotal} Days • ${groupType} • ${travelPace} Pace`,
        origin,
        destination: primaryDestination,
        routeStops,
        travelPace,
        groupType,
        daysTotal,
        currentDay: 1,
        travellersCount: travellers,
        totalBudget: budget,
        spentBudget: 0,
        remainingBuffer: budget,
        burnVelocityDaily: Math.round(budget / daysTotal),
        status: 'active',
        coverImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCp26WEbyFPAqFvXaugNhOm9AaE0pueBCGDKQOIOlsLYoQk6PsRznLnuRwWW-2hPem3SAVXkfv3Rr3cmewCgHPuVZh2qLf7a-kyuThc-geM8Zro4AJxsdpLhqnrN-sgE3kj-m2Q4mRY2PMzUZeIjr1EtAQhRk0bebbQ-hJaYj_UXBoC5H5y8bvzUJMxbJZxwkaKDhWlNYK6vC06-5T_KqBX6sj884VbU0yDV11J_YhC_nuhqKMn4a5O',
        weather: {
          temp: '22°C',
          condition: 'Clear Skies & Mountain Fog',
          rainProbability: '15%',
          dryWindowUntil: 'Late Evening',
        },
        allocations: {
          transport: transportCost,
          stays: staysCost,
          food: foodCost,
          experiences: expCost,
          safetyBuffer: bufferCost,
        },
        members: Array.from({ length: travellers }, (_, i) => ({
          id: `m-${i + 1}`,
          name: i === 0 ? 'Ananya Sen (You)' : `Traveller ${i + 1}`,
          shortCode: i === 0 ? 'AN' : `T${i + 1}`,
          paidTotal: 0,
          share: perPerson,
          balance: 0,
          isYou: i === 0,
        })),
        expenses: [],
        settlements: [],
        itinerary: generatedActivities,
      };

      setIsGenerating(false);
      createNewTrip(newTripData);
    }, 1400);
  };

  return (
    <div className="flex flex-col w-full px-5 pt-4 pb-28 text-[#d9e2fd]">
      {/* Wizard Step Tracker */}
      <div className="flex flex-col gap-2.5 bg-[#121b2f] p-4 rounded-2xl border border-white/5 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-bold text-[10px] ${
                currentStep >= 1 ? 'bg-[#4d8eff] text-[#00285d]' : 'bg-[#2b3549] text-[#c2c6d6]'
              }`}
            >
              1
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                currentStep === 1 ? 'text-[#4d8eff]' : 'text-[#c2c6d6]'
              }`}
            >
              Route
            </span>
          </button>
          <div className="h-0.5 w-6 bg-white/10 rounded-full"></div>

          <button
            onClick={() => setCurrentStep(2)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-bold text-[10px] ${
                currentStep >= 2 ? 'bg-[#4d8eff] text-[#00285d]' : 'bg-[#2b3549] text-[#c2c6d6]'
              }`}
            >
              2
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                currentStep === 2 ? 'text-[#4d8eff]' : 'text-[#c2c6d6]'
              }`}
            >
              Treasury
            </span>
          </button>
          <div className="h-0.5 w-6 bg-white/10 rounded-full"></div>

          <button
            onClick={() => setCurrentStep(3)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span
              className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-bold text-[10px] ${
                currentStep === 3 ? 'bg-[#4d8eff] text-[#00285d]' : 'bg-[#2b3549] text-[#c2c6d6]'
              }`}
            >
              3
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                currentStep === 3 ? 'text-[#4d8eff]' : 'text-[#c2c6d6]'
              }`}
            >
              Synthesis
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-xs text-[#c2c6d6]">
              {currentStep === 1 && 'Define Route, Multi-Stops & Duration'}
              {currentStep === 2 && 'Calibrate Total Group Budget Cap'}
              {currentStep === 3 && 'Dietary, Transit & Stay Synthesis'}
            </span>
          </div>
          <span className="text-xs text-[#ffb95f] font-bold">Step {currentStep} of 3</span>
        </div>
      </div>

      {/* STEP 1: ROUTE & DURATION */}
      {currentStep === 1 && (
        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#ffb95f]">
              Origin & Destination
            </h3>

            <div className="space-y-1">
              <label className="text-[11px] text-[#c2c6d6]">Starting Location (Origin)</label>
              <input
                type="text"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                placeholder="E.g. Bengaluru, Mumbai, Delhi..."
                className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3.5 py-2.5 rounded-xl border border-white/10 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[#c2c6d6]">Primary Destination</label>
              <input
                type="text"
                value={primaryDestination}
                onChange={e => setPrimaryDestination(e.target.value)}
                placeholder="E.g. Munnar, Kerala"
                className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3.5 py-2.5 rounded-xl border border-white/10 outline-none"
              />
            </div>

            {/* Multi-City / Multi-Stop Stops */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#adc6ff]">Multi-City Waypoints ({routeStops.length})</span>
                <span className="text-[10px] text-[#c2c6d6]">Auto-routed by AI</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {routeStops.map((stop, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202a3e] text-xs text-[#d9e2fd] border border-white/5"
                  >
                    <span>📍 {stop}</span>
                    <button
                      onClick={() => handleRemoveStop(i)}
                      className="text-[#ffb4ab] hover:text-white text-xs ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStopInput}
                  onChange={e => setNewStopInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddStop()}
                  placeholder="+ Add stop (e.g. Wayanad, Gap Road)"
                  className="flex-1 bg-[#121b2f] text-xs text-[#d9e2fd] px-3 py-2 rounded-xl border border-white/10 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="px-3 py-2 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#adc6ff]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Duration & Pace */}
          <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4edea3]">
              Duration & Rhythm
            </h3>

            <div className="flex items-center justify-between bg-[#121b2f] p-3 rounded-xl">
              <div>
                <span className="text-xs font-bold text-[#d9e2fd] block">Expedition Length</span>
                <span className="text-[11px] text-[#c2c6d6]">{daysTotal} Days / {daysTotal - 1} Nights</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDaysTotal(Math.max(1, daysTotal - 1))}
                  className="w-8 h-8 rounded-lg bg-[#202a3e] text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-sm text-[#d9e2fd]">{daysTotal}</span>
                <button
                  onClick={() => setDaysTotal(daysTotal + 1)}
                  className="w-8 h-8 rounded-lg bg-[#202a3e] text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Travel Pace */}
            <div className="space-y-1">
              <label className="text-[11px] text-[#c2c6d6]">Travel Pace</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Relaxed', 'Balanced', 'Fast-Paced'] as const).map(pace => (
                  <button
                    key={pace}
                    onClick={() => setTravelPace(pace)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      travelPace === pace
                        ? 'bg-[#4d8eff]/20 border-[#4d8eff] text-[#adc6ff]'
                        : 'bg-[#121b2f] border-white/5 text-[#c2c6d6]'
                    }`}
                  >
                    {pace}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-3 rounded-xl bg-[#4d8eff] text-[#00285d] font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Treasury & Group</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* STEP 2: BUDGET & GROUP */}
      {currentStep === 2 && (
        <div className="mt-4 space-y-4">
          {/* Total Expedition Cap Card */}
          <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#c2c6d6]">
                  Total Group Expedition Cap
                </span>
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
                <strong className="text-[#d9e2fd] font-semibold">{travellers} Travellers</strong> · {daysTotal} Days
              </span>
            </div>

            {/* Range Slider */}
            <div className="flex flex-col gap-1.5">
              <input
                type="range"
                min={4000}
                max={50000}
                step={1000}
                value={budget}
                onChange={e => handleBudgetChange(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#2b3549] rounded-lg appearance-none cursor-pointer accent-[#4d8eff]"
              />
              <div className="flex justify-between text-[11px] text-[#c2c6d6]">
                <span>₹4k (Backpacker)</span>
                <span>₹25k (Comfort)</span>
                <span>₹50k (Boutique)</span>
              </div>
            </div>

            {/* 5-Category Breakdown */}
            <div className="flex flex-col gap-2 pt-1 border-t border-white/5">
              <span className="text-xs font-semibold text-[#c2c6d6]">AI 5-Bucket Allocation Machine</span>
              <div className="h-3 w-full bg-[#121b2f] rounded-full overflow-hidden flex">
                <div style={{ width: '27%' }} className="bg-[#4d8eff] h-full" title="Transport (27%)"></div>
                <div style={{ width: '32%' }} className="bg-[#ffb95f] h-full" title="Stays (32%)"></div>
                <div style={{ width: '20%' }} className="bg-[#4edea3] h-full" title="Food (20%)"></div>
                <div style={{ width: '12%' }} className="bg-[#c2c6d6] h-full" title="Experiences (12%)"></div>
                <div style={{ width: '9%' }} className="bg-[#ee9800] h-full" title="Buffer (9%)"></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4d8eff]"></span>
                  <span className="text-[#c2c6d6]">Transit: ₹{transportCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]"></span>
                  <span className="text-[#c2c6d6]">Stays: ₹{staysCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3]"></span>
                  <span className="text-[#c2c6d6]">Food: ₹{foodCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ee9800]"></span>
                  <span className="text-[#c2c6d6]">Buffer: ₹{bufferCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group Type & Travellers */}
          <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#d9e2fd]">
              Travel Group Configuration
            </h3>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {(['Solo', 'Couple', 'Friends', 'Family', 'College Batch'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                    groupType === type
                      ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff] font-bold'
                      : 'bg-[#202a3e] text-[#c2c6d6] border-white/5'
                  }`}
                >
                  {groupType === type ? '✓ ' : ''}{type}
                </button>
              ))}
            </div>

            <div className="bg-[#121b2f] p-3 rounded-xl flex items-center justify-between border border-white/5">
              <span className="text-sm font-bold text-[#d9e2fd]">{travellers} Travellers</span>
              <div className="flex items-center gap-1.5 bg-[#2b3549] p-1 rounded-xl">
                <button
                  onClick={() => setTravellers(Math.max(1, travellers - 1))}
                  className="w-8 h-8 rounded-lg bg-[#202a3e] text-[#d9e2fd] flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold text-[#d9e2fd]">{travellers}</span>
                <button
                  onClick={() => setTravellers(travellers + 1)}
                  className="w-8 h-8 rounded-lg bg-[#202a3e] text-[#d9e2fd] flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="py-3 px-4 rounded-xl bg-[#202a3e] text-xs font-bold text-[#c2c6d6]"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex-1 py-3 rounded-xl bg-[#4d8eff] text-[#00285d] font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue to Experience Synthesis</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EXPERIENCE & SYNTHESIS */}
      {currentStep === 3 && (
        <div className="mt-4 space-y-4">
          <div className="bg-[#161f33] p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#ffb95f]">
              Priority Experiences & Stays
            </h3>

            {/* Experience Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'Nature', emoji: '🌿' },
                { id: 'Trekking', emoji: '⛰️' },
                { id: 'Local Food', emoji: '🍛' },
                { id: 'Photography', emoji: '📸' },
                { id: 'Culture', emoji: '🏛️' },
                { id: 'Wildlife', emoji: '🐘' },
                { id: 'Spiritual', emoji: '🪔' },
              ].map(tag => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                      isSelected
                        ? 'bg-[#00a572]/20 text-[#4edea3] border-[#4edea3]/40'
                        : 'bg-[#202a3e] text-[#c2c6d6] border-white/5'
                    }`}
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.id}</span>
                    {isSelected && <span>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Stay Preference */}
            <div className="space-y-1 pt-2 border-t border-white/5">
              <label className="text-[11px] text-[#c2c6d6]">Stay Style</label>
              <select
                value={stayPreference}
                onChange={e => setStayPreference(e.target.value)}
                className="w-full bg-[#121b2f] text-xs text-[#d9e2fd] px-3 py-2 rounded-xl border border-white/10 outline-none"
              >
                <option value="Homestay & Eco-Cottage">Homestay & Eco-Cottage (Local Host)</option>
                <option value="Backpacker Hostel & Dorm">Backpacker Hostel & Dorm (Social)</option>
                <option value="Boutique Heritage Haveli">Boutique Heritage Haveli</option>
                <option value="Standard 3-Star Hotel">Standard 3-Star Hotel</option>
              </select>
            </div>

            {/* Transit Mode */}
            <div className="space-y-1">
              <label className="text-[11px] text-[#c2c6d6]">Transit Preference</label>
              <select
                value={transitPreference}
                onChange={e => setTransitPreference(e.target.value)}
                className="w-full bg-[#121b2f] text-xs text-[#d9e2fd] px-3 py-2 rounded-xl border border-white/10 outline-none"
              >
                <option value="Train + Shared 4x4 Jeep">Train + Shared 4x4 Jeep (Best Value)</option>
                <option value="KSRTC Direct Sleeper Bus">KSRTC Direct Sleeper Bus (Cheapest)</option>
                <option value="Self-Drive Rental Car">Self-Drive Rental Car</option>
                <option value="Private Chauffeured Innova">Private Chauffeured Innova (Comfort)</option>
              </select>
            </div>

            {/* Dietary */}
            <div className="space-y-1">
              <label className="text-[11px] text-[#c2c6d6]">Dietary Requirement</label>
              <select
                value={dietaryPreference}
                onChange={e => setDietaryPreference(e.target.value)}
                className="w-full bg-[#121b2f] text-xs text-[#d9e2fd] px-3 py-2 rounded-xl border border-white/10 outline-none"
              >
                <option value="Strict Vegetarian">Strict Vegetarian (No meat/eggs)</option>
                <option value="Jain (No Root Veg)">Jain (No root vegetables/onion/garlic)</option>
                <option value="Non-Vegetarian">Non-Vegetarian (Local specialties)</option>
                <option value="Vegan">Vegan (Plant-based)</option>
              </select>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-13 rounded-xl bg-[#4d8eff] hover:bg-[#4d8eff]/90 text-[#00285d] font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-70"
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
              <span>Includes offline topomesh, live weather rerouting & UPI split sheet</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
