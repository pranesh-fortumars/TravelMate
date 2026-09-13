import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DESTINATIONS } from '../data/mockData';

export const HomeView: React.FC = () => {
  const { setActiveTab, setIsAskAiOpen, trip, toggleRerouteActivity, showToast } = useTrip();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  return (
    <div className="flex flex-col w-full pb-24 text-[#d9e2fd]">
      {/* Header & Greeting */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#ffb95f] uppercase tracking-widest">
              Namaste • Live Copilot
            </span>
            <h1 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight mt-0.5">
              Good morning, Ananya
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#202a3e] flex items-center justify-center text-[#4edea3] relative shadow-md">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              cloud_done
            </span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#4edea3] ring-2 ring-[#091326] animate-pulse"></span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2.5 px-3.5 py-1.5 rounded-full bg-[#121b2f] w-fit border border-white/5">
          <span className="material-symbols-outlined text-[#4edea3] text-[16px]">verified</span>
          <span className="text-xs text-[#c2c6d6] font-medium">
            AI Travel Copilot Active • <span className="text-[#4edea3] font-semibold">Monsoon window clear</span>
          </span>
        </div>
      </div>

      {/* Search & Plan Bento Deck */}
      <div className="px-5 mt-3">
        <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#202a3e] via-[#161f33] to-[#121b2f] shadow-xl border border-white/10 overflow-hidden">
          {/* Subtle Motif */}
          <div className="absolute -right-6 -top-6 w-40 h-44 opacity-10 pointer-events-none text-[#adc6ff]">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
              <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="50" cy="50" r="12" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4d8eff]/20 text-[#adc6ff] text-[10px] font-bold tracking-wider">
                  INDIA VOYAGE OS
                </span>
                <span className="text-[#c2c6d6] text-xs">•</span>
                <span className="text-xs text-[#ffb95f] font-semibold">28 States • 8 UTs</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#d9e2fd] mt-2.5">Where are you going next?</h2>
            <p className="text-xs text-[#c2c6d6] mt-0.5">Your Budget. Your Journey. Your India.</p>

            {/* Search Bar Input */}
            <div className="mt-4 flex items-center bg-[#040e21] rounded-xl px-3.5 py-2.5 border border-[#424754]">
              <span className="material-symbols-outlined text-[#adc6ff] text-[20px] mr-2.5">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="E.g. Munnar, Ladakh, Hampi, Gokarna..."
                className="bg-transparent text-[#d9e2fd] text-sm placeholder-[#8c909f] outline-none w-full min-w-0"
              />
              <button
                onClick={() => setActiveTab('explore')}
                className="w-8 h-8 rounded-lg bg-[#202a3e] flex items-center justify-center text-[#c2c6d6] hover:text-[#d9e2fd] transition-colors shrink-0 ml-1"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            {/* Action Row */}
            <div className="mt-3.5 flex items-center gap-2.5">
              <button
                onClick={() => setActiveTab('plan')}
                className="flex-1 h-11 bg-[#4d8eff] text-[#002e6a] text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(77,142,255,0.35)] active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">assistant_navigation</span>
                <span>Plan a Smart Trip</span>
              </button>
              <button
                onClick={() => setIsAskAiOpen(true)}
                className="h-11 w-11 rounded-xl bg-[#2b3549] flex items-center justify-center text-[#ffb95f] hover:bg-[#30394e] transition-colors active:scale-95 shrink-0 shadow-md"
                title="Voice Travel Copilot"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ongoing Expedition Card */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#d9e2fd]">Ongoing Expedition</span>
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
          </div>
          <button
            onClick={() => setActiveTab('expenses')}
            className="text-xs text-[#adc6ff] font-bold hover:underline"
          >
            View Ledger
          </button>
        </div>

        {/* Live Trip Card */}
        <div className="relative rounded-2xl overflow-hidden bg-[#161f33] shadow-2xl border border-white/10">
          <div
            className="h-48 w-full bg-cover bg-center relative"
            style={{ backgroundImage: `url('${trip.coverImage}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] via-[#161f33]/50 to-transparent"></div>
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#040e21]/80 backdrop-blur-md shadow-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
                <span className="text-[10px] text-[#4edea3] uppercase tracking-wider font-bold">
                  ACTIVE • DAY {trip.currentDay} OF {trip.daysTotal}
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-[#040e21]/80 backdrop-blur-md text-[#ffb95f] flex items-center gap-1 text-[11px] font-semibold border border-white/10">
                <span className="material-symbols-outlined text-[14px]">groups</span>
                <span>{trip.travellersCount} Friends</span>
              </div>
            </div>

            {/* Destination Name */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#ffb95f] tracking-widest uppercase">
                    Western Ghats Trail
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight drop-shadow-sm">
                    {trip.destination}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[#d9e2fd] bg-[#202a3e]/90 px-2.5 py-1 rounded-lg border border-white/10">
                  <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">thermostat</span>
                  <span className="text-xs font-bold">{trip.weather.temp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="p-4 flex flex-col gap-3">
            <div className="p-3 rounded-xl bg-[#121b2f] flex flex-col gap-2 border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-[18px]">account_balance_wallet</span>
                  <span className="text-xs font-semibold text-[#d9e2fd]">Group Budget Track</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-bold">
                  72% on track
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#2b3549] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#4edea3] to-[#ffb95f] rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-[#c2c6d6]">
                  Spent: <strong className="text-[#d9e2fd] font-bold">₹{trip.spentBudget.toLocaleString('en-IN')}</strong>
                </span>
                <span className="text-[#c2c6d6]">
                  Cap: <strong className="text-[#d9e2fd] font-bold">₹{trip.totalBudget.toLocaleString('en-IN')}</strong>
                </span>
              </div>
            </div>

            {/* Weather / Micro Window */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-[#121b2f] flex items-center gap-2.5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#202a3e] flex items-center justify-center text-[#adc6ff] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">foggy</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#c2c6d6] block truncate">Microclimate</span>
                  <span className="text-xs text-[#d9e2fd] font-bold block truncate">Light Mist</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121b2f] flex items-center gap-2.5 border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#202a3e] flex items-center justify-center text-[#ffb95f] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#c2c6d6] block truncate">Dry Window</span>
                  <span className="text-xs text-[#d9e2fd] font-bold block truncate">Until 3:00 PM</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setActiveTab('livenav')}
              className="w-full h-11 bg-[#2b3549] hover:bg-[#30394e] text-[#d9e2fd] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-sm border border-white/10"
            >
              <span>Open Live Navigation Mode</span>
              <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Realtime AI Copilot Alert */}
      {!isAlertDismissed && (
        <div className="px-5 mt-4">
          <div className="p-4 rounded-2xl bg-[#202a3e]/80 border border-[#ffb95f]/30 shadow-lg relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ee9800]/20 text-[#ffb95f] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-[#ffb95f] uppercase tracking-wider">
                    Tactical Copilot Alert
                  </span>
                  <span className="text-[10px] text-[#c2c6d6]">• 2m ago</span>
                </div>
                <p className="text-xs text-[#d9e2fd] mt-1 font-medium leading-snug">
                  “Heavy rain expected at Top Station at 3:30 PM. AI recommends tea tasting at KDHP museum instead.”
                </p>
                <div className="flex items-center gap-2.5 mt-3">
                  <button
                    onClick={() => {
                      toggleRerouteActivity(true);
                      setIsAlertDismissed(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ee9800] text-[#5b3800] text-xs font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    Apply AI Change
                  </button>
                  <button
                    onClick={() => setIsAlertDismissed(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#2b3549] text-[#c2c6d6] text-xs font-semibold hover:text-[#d9e2fd] transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick AI Tools Pill Strip */}
      <div className="mt-5">
        <div className="px-5 flex items-center justify-between mb-2.5">
          <span className="text-base font-bold text-[#d9e2fd]">Quick AI Tools</span>
          <span className="text-[11px] text-[#c2c6d6] font-medium">Bharat AI Engine</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto px-5 pb-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#202a3e] text-[#d9e2fd] hover:bg-[#30394e] shrink-0 transition-all active:scale-95 shadow-sm border border-white/5"
          >
            <span>⚡</span>
            <span className="text-xs font-semibold whitespace-nowrap">Plan New Trip</span>
          </button>

          <button
            onClick={() => setActiveTab('3dmap')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#202a3e] text-[#d9e2fd] hover:bg-[#30394e] shrink-0 transition-all active:scale-95 shadow-sm border border-white/5"
          >
            <span>🗺️</span>
            <span className="text-xs font-semibold whitespace-nowrap">3D Terrain Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('itinerary')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#202a3e] text-[#d9e2fd] hover:bg-[#30394e] shrink-0 transition-all active:scale-95 shadow-sm border border-white/5"
          >
            <span>🌦️</span>
            <span className="text-xs font-semibold whitespace-nowrap">Monsoon Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#202a3e] text-[#d9e2fd] hover:bg-[#30394e] shrink-0 transition-all active:scale-95 shadow-sm border border-white/5"
          >
            <span>🏨</span>
            <span className="text-xs font-semibold whitespace-nowrap">Stays under ₹1.5k</span>
          </button>

          <button
            onClick={() => setActiveTab('expenses')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#202a3e] text-[#d9e2fd] hover:bg-[#30394e] shrink-0 transition-all active:scale-95 shadow-sm border border-white/5"
          >
            <span>👥</span>
            <span className="text-xs font-semibold whitespace-nowrap">Split Bills</span>
          </button>
        </div>
      </div>

      {/* Trending Escapes */}
      <div className="mt-6">
        <div className="px-5 flex items-baseline justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#d9e2fd]">Trending Escapes</h2>
            <p className="text-xs text-[#c2c6d6]">Calibrated for smart budget travelers</p>
          </div>
          <button onClick={() => setActiveTab('explore')} className="text-xs text-[#adc6ff] font-bold hover:underline">
            Explore All
          </button>
        </div>

        <div className="flex gap-3.5 overflow-x-auto px-5 pb-2 no-scrollbar">
          {DESTINATIONS.map(dest => (
            <div
              key={dest.id}
              onClick={() => setActiveTab('explore')}
              className="w-60 shrink-0 rounded-2xl bg-[#161f33] border border-white/10 overflow-hidden shadow-lg flex flex-col group cursor-pointer"
            >
              <div
                className="h-36 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${dest.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#161f33] to-transparent"></div>
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#091326]/80 backdrop-blur-md flex items-center gap-1 text-[11px] text-[#ffb95f] font-bold">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span>{dest.rating}</span>
                </div>
                {dest.isMonsoonPick && (
                  <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-[#00a572] text-[#00311f] text-[10px] font-bold">
                    Monsoon Pick
                  </span>
                )}
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#d9e2fd] group-hover:text-[#adc6ff] transition-colors truncate">
                    {dest.title}
                  </h4>
                  <span className="text-xs text-[#c2c6d6]">{dest.state} • {dest.tags[1] || 'Nature'}</span>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between bg-[#121b2f] px-2.5 py-1.5 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-[#d9e2fd]">
                    ₹{dest.dailyBudget.toLocaleString('en-IN')}
                    <span className="text-[10px] text-[#c2c6d6] font-normal">/day</span>
                  </span>
                  <span className="text-[10px] text-[#4edea3] font-bold">Budget Friendly</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IRCTC Tatkal Alert Footer Banner */}
      <div className="px-5 mt-5">
        <div className="p-3.5 rounded-2xl bg-[#121b2f] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">train</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d9e2fd]">IRCTC • Tatkal Reminder</span>
              <span className="text-[11px] text-[#c2c6d6]">AC Tatkal opens tomorrow at 10:00 AM IST</span>
            </div>
          </div>
          <button
            onClick={() => showToast('Tatkal Ping Armed for 09:55 AM IST')}
            className="px-3 py-1.5 rounded-lg bg-[#202a3e] hover:bg-[#2b3549] text-[#adc6ff] text-xs font-bold active:scale-95 transition-transform shrink-0"
          >
            Set Ping
          </button>
        </div>
      </div>
    </div>
  );
};
