import React from 'react';
import { useTrip } from '../context/TripContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack }) => {
  const { setActiveTab, activeTab, setIsPlayStoreHubOpen } = useTrip();

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#091326]/80 backdrop-blur-xl border-b border-[#202a3e]/50 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-[600px] mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <button
              onClick={() => setActiveTab('home')}
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#c2c6d6] hover:text-[#d9e2fd] hover:bg-[#202a3e] transition-colors -ml-1 shrink-0"
              aria-label="Back to home"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00a572] via-[#4d8eff] to-[#002e6a] flex items-center justify-center text-white font-black text-xs shadow-md shrink-0 ring-1 ring-white/20">
              TM
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#ffb95f] tracking-widest uppercase leading-none">TRAVELMATE</span>
                <span className="px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#4edea3] text-[9px] font-extrabold border border-[#4edea3]/30">
                  NATIVE
                </span>
              </div>
              <span className="text-xs font-bold text-[#d9e2fd] truncate leading-tight">
                {title || 'Your India AI Travel OS'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Play Store & Native Launch Hub Button */}
          <button
            onClick={() => setIsPlayStoreHubOpen(true)}
            className="h-8 px-2.5 rounded-full bg-[#00a572]/20 hover:bg-[#00a572]/30 text-[#4edea3] border border-[#4edea3]/40 flex items-center gap-1 text-[11px] font-bold active:scale-95 transition-all shadow-sm"
            title="Play Store & iOS Native Launch Center"
          >
            <span className="material-symbols-outlined text-[16px]">android</span>
            <span className="hidden sm:inline">Play Store</span>
          </button>

          {activeTab === 'livenav' || activeTab === '3dmap' ? (
            <button
              onClick={() => setActiveTab('sos')}
              className="h-8 px-2.5 rounded-full bg-[#93000a] text-[#ffdad6] flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all shadow-md border border-[#ffb4ab]/30 animate-pulse"
              aria-label="Emergency SOS"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffb4ab] font-bold">sos</span>
              <span className="text-[10px] font-bold tracking-wider uppercase">SOS</span>
            </button>
          ) : null}

          <button
            onClick={() => setActiveTab('sos')}
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#c2c6d6] hover:text-[#d9e2fd] hover:bg-[#202a3e] transition-colors"
            title="Emergency SOS & Relays"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ffb95f] ring-2 ring-[#091326]"></span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 p-0.5 flex items-center justify-center rounded-full ring-2 ring-[#4d8eff]/30 hover:ring-[#4d8eff] transition-all"
          >
            <img
              alt="Ananya Sen Profile"
              className="w-7 h-7 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgVY8E2xef1vTObS-Qs3h9-gp51lbIZrlStpx7B98vhotYDrTXoJhh5aw0P-JG3YtJPJq3HfmXsyWwbPUvcE6fqg_Bsfi6c76LqKy11Hg7z5ydrvLB2BOs-VL3x-sHEM5-_dxYVssE5qiQGU3NfoY16LIhm1AWw5Bor2D5bqTsnqtWkFMkX6y8dcwEJAxSd9qDi55X3pjDd1KBFdbag-okh8FA14jFbK2BePI16hpbTIMxptfJpdVr"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
