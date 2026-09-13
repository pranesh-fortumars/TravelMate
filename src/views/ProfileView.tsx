import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const ProfileView: React.FC = () => {
  const { setActiveTab, showToast, trip } = useTrip();

  const [activeSubTab, setActiveSubTab] = useState<'trips' | 'saved' | 'settings'>('trips');

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd]">
      {/* Profile Header Card */}
      <div className="p-5 bg-[#121b2f] border-b border-white/5">
        <div className="flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgVY8E2xef1vTObS-Qs3h9-gp51lbIZrlStpx7B98vhotYDrTXoJhh5aw0P-JG3YtJPJq3HfmXsyWwbPUvcE6fqg_Bsfi6c76LqKy11Hg7z5ydrvLB2BOs-VL3x-sHEM5-_dxYVssE5qiQGU3NfoY16LIhm1AWw5Bor2D5bqTsnqtWkFMkX6y8dcwEJAxSd9qDi55X3pjDd1KBFdbag-okh8FA14jFbK2BePI16hpbTIMxptfJpdVr"
            alt="Ananya Sen"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-[#4d8eff]/30 shadow-lg"
          />

          <div className="flex flex-col min-w-0">
            <h2 className="text-xl font-bold text-[#d9e2fd]">Ananya Sen</h2>
            <span className="text-xs text-[#c2c6d6]">@ananya_voyager • Bengaluru, India</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold border border-[#4edea3]/30">
                PRO EXPLORER
              </span>
              <span className="text-xs text-[#ffb95f] font-semibold">14 Trips Completed</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-5 bg-[#161f33] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveSubTab('trips')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'trips'
                ? 'bg-[#4d8eff] text-[#00285d]'
                : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            My Trips
          </button>
          <button
            onClick={() => setActiveSubTab('saved')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'saved'
                ? 'bg-[#4d8eff] text-[#00285d]'
                : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            Saved Places
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'settings'
                ? 'bg-[#4d8eff] text-[#00285d]'
                : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-5 mt-4">
        {activeSubTab === 'trips' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#d9e2fd]">Active & Upcoming Expeditions</h3>

            {/* Active Trip Card */}
            <div
              onClick={() => setActiveTab('itinerary')}
              className="p-4 rounded-2xl bg-[#161f33] border border-[#ffb95f]/40 shadow-lg cursor-pointer hover:bg-[#1a253c] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold">
                  ACTIVE NOW • DAY 2 OF 3
                </span>
                <span className="text-xs font-bold text-[#ffb95f]">₹{trip.spentBudget} / ₹{trip.totalBudget}</span>
              </div>
              <h4 className="text-base font-extrabold text-[#d9e2fd]">{trip.destination}</h4>
              <p className="text-xs text-[#c2c6d6] mt-0.5">{trip.subtitle}</p>
            </div>

            {/* Past Trip Cards */}
            <h3 className="text-sm font-bold text-[#d9e2fd] pt-2">Completed Expeditions</h3>
            {[
              { title: 'Hampi Heritage Boulder Trek', date: 'Jan 2026', spend: '₹4,850', rating: '4.9 ★' },
              { title: 'Gokarna Beach & Cliff Walk', date: 'Nov 2025', spend: '₹5,200', rating: '4.8 ★' },
              { title: 'Ooty Toy Train & Pine Forest', date: 'Aug 2025', spend: '₹6,100', rating: '5.0 ★' },
            ].map((pt, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#121b2f] border border-white/5 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#d9e2fd]">{pt.title}</h5>
                  <span className="text-[10px] text-[#c2c6d6]">{pt.date} • Spent {pt.spend}</span>
                </div>
                <span className="text-xs font-bold text-[#ffb95f]">{pt.rating}</span>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'saved' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#d9e2fd]">Saved Destinations & Itineraries</h3>
            {['Vattavada Strawberry Trails', 'Meesapulimala Peak Trek', 'Marayoor Sandalwood Forest'].map((place, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#161f33] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ffb95f]">bookmark</span>
                  <span className="text-xs font-bold text-[#d9e2fd]">{place}</span>
                </div>
                <button
                  onClick={() => showToast(`Added ${place} to active wishlist`)}
                  className="text-xs text-[#adc6ff] font-bold"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'settings' && (
          <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#d9e2fd] block">Offline NavIC Satellite Sync</span>
                <span className="text-[10px] text-[#c2c6d6]">Auto-download regional topomesh</span>
              </div>
              <span className="text-[#4edea3] font-bold">Enabled</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div>
                <span className="font-bold text-[#d9e2fd] block">Default UPI App</span>
                <span className="text-[10px] text-[#c2c6d6]">GPay / PhonePe / PayTM</span>
              </div>
              <span className="text-[#adc6ff] font-bold">Google Pay</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div>
                <span className="font-bold text-[#d9e2fd] block">Tactical Emergency Contacts</span>
                <span className="text-[10px] text-[#c2c6d6]">Papa & 112 Relays</span>
              </div>
              <button onClick={() => setActiveTab('sos')} className="text-[#ffb4ab] font-bold">Manage</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
