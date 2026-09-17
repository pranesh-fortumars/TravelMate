import React from 'react';
import { useTrip } from '../context/TripContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsAskAiOpen } = useTrip();

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'plan', label: 'Plan', icon: 'add' }, // Center prominent action
    { id: 'itinerary', label: 'Trips', icon: 'luggage' },
    { id: 'expenses', label: 'Expenses', icon: 'account_balance_wallet' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <>
      {/* Floating Ask TravelMate Trigger */}
      {activeTab !== 'livenav' && activeTab !== 'sos' && (
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={() => setIsAskAiOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#161f33] text-[#ffb95f] border border-[#ffb95f]/40 shadow-xl hover:bg-[#202a3e] active:scale-95 transition-all"
          >
            <span className="text-sm">✨</span>
            <span className="text-xs font-bold text-[#d9e2fd] tracking-tight">Ask TravelMate</span>
          </button>
        </div>
      )}

      {/* Main Persistent Bottom Dock */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#091326] border-t border-[#202a3e] shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        <div className="relative flex items-center justify-between h-16 px-2 max-w-[560px] mx-auto">
          {navItems.map(item => {
            const isActive = activeTab === item.id || (item.id === 'itinerary' && activeTab === 'trips');

            if (item.id === 'plan') {
              return (
                <div key={item.id} className="relative flex flex-col items-center justify-center -top-3.5 px-1 shrink-0">
                  <button
                    onClick={() => setActiveTab('plan')}
                    className="w-12 h-12 rounded-full bg-[#4d8eff] text-[#002e6a] flex items-center justify-center shadow-[0_4px_16px_rgba(77,142,255,0.5)] hover:scale-105 active:scale-95 transition-all ring-3 ring-[#091326]"
                    title="Plan a New Trip"
                  >
                    <span className="material-symbols-outlined text-[24px] font-black">add</span>
                  </button>
                  <span className="text-[9px] font-bold text-[#adc6ff] mt-0.5 tracking-tight">Plan Trip</span>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center justify-center h-full gap-0.5 transition-colors min-w-[44px] ${
                  isActive ? 'text-[#4d8eff] font-bold' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
