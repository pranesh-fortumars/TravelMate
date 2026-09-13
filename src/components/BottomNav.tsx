import React from 'react';
import { useTrip } from '../context/TripContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsAskAiOpen } = useTrip();

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'itinerary', label: 'Trips', icon: 'luggage' },
    { id: 'plan', label: 'Plan', icon: 'add' }, // Center FAB
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'expenses', label: 'Expenses', icon: 'currency_rupee' },
  ];

  return (
    <>
      {/* Floating Ask TravelMate Trigger */}
      {activeTab !== 'livenav' && activeTab !== 'sos' && (
        <div className="fixed bottom-20 right-4 z-40">
          <button
            onClick={() => setIsAskAiOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#202a3e]/90 backdrop-blur-xl text-[#ffb95f] border border-[#ffb95f]/30 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)] hover:bg-[#30394e] active:scale-95 transition-all"
          >
            <span className="text-sm">✨</span>
            <span className="text-xs font-bold text-[#d9e2fd] tracking-tight">Ask TravelMate</span>
          </button>
        </div>
      )}

      {/* Main Persistent Bottom Dock */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#091326]/90 backdrop-blur-2xl border-t border-[#202a3e] shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
        <div className="relative flex items-center justify-around h-16 px-2 max-w-[480px] mx-auto">
          {navItems.map(item => {
            const isActive = activeTab === item.id;

            if (item.id === 'plan') {
              return (
                <div key={item.id} className="relative flex items-center justify-center -top-4 px-1">
                  <button
                    onClick={() => setActiveTab('plan')}
                    className="w-13 h-13 rounded-full bg-[#4d8eff] text-[#002e6a] flex items-center justify-center shadow-[0_8px_20px_rgba(77,142,255,0.4)] hover:scale-105 active:scale-95 transition-all ring-4 ring-[#091326]"
                    title="Plan a New Trip"
                  >
                    <span className="material-symbols-outlined text-[28px] font-bold">add</span>
                  </button>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex flex-col items-center justify-center h-full gap-0.5 transition-colors min-w-[44px] ${
                  isActive ? 'text-[#adc6ff] font-bold' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
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
