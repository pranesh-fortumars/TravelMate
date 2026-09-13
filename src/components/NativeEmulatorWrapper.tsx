import React, { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';

interface NativeEmulatorWrapperProps {
  children: React.ReactNode;
}

export const NativeEmulatorWrapper: React.FC<NativeEmulatorWrapperProps> = ({ children }) => {
  const { deviceMode, setDeviceMode, setIsPlayStoreHubOpen } = useTrip();
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  if (deviceMode === 'standard') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050a14] py-4 px-2 sm:px-6 flex flex-col items-center justify-start antialiased selection:bg-[#4d8eff] selection:text-[#00285d]">
      {/* Top Device Frame Control Header */}
      <div className="w-full max-w-[480px] mb-3 px-3 py-2 rounded-2xl bg-[#121b2f] border border-white/10 flex items-center justify-between text-xs shadow-xl">
        <div className="flex items-center gap-2">
          {deviceMode === 'android' ? (
            <div className="flex items-center gap-1.5 text-[#00a572] font-extrabold">
              <span className="material-symbols-outlined text-[18px]">android</span>
              <span>Android Pixel 8</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#4d8eff] font-extrabold">
              <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
              <span>iPhone 15 Pro</span>
            </div>
          )}
          <span className="text-[10px] text-[#8c909f]">· NavIC Locked</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlayStoreHubOpen(true)}
            className="px-2.5 py-1 rounded-lg bg-[#00a572]/20 text-[#4edea3] hover:bg-[#00a572]/30 text-[11px] font-bold border border-[#4edea3]/30 flex items-center gap-1 transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">storefront</span>
            Play Store Hub
          </button>

          <button
            onClick={() => setDeviceMode(deviceMode === 'android' ? 'ios' : 'standard')}
            className="p-1 rounded-lg bg-[#161f33] text-[#c2c6d6] hover:text-white"
            title="Switch Frame"
          >
            <span className="material-symbols-outlined text-[16px]">devices</span>
          </button>
        </div>
      </div>

      {/* Device Outer Frame Shell */}
      <div
        className={`relative w-full max-w-[420px] bg-[#091326] rounded-[48px] border-[10px] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 flex flex-col ${
          deviceMode === 'android'
            ? 'border-[#1b253b] ring-1 ring-white/10'
            : 'border-[#2d374e] ring-2 ring-white/20'
        }`}
        style={{ minHeight: '860px' }}
      >
        {/* Android Native Status Bar */}
        {deviceMode === 'android' && (
          <div className="w-full h-8 bg-[#091326] px-6 pt-1 flex items-center justify-between text-[11px] font-bold text-[#d9e2fd] select-none z-50 shrink-0">
            <span className="font-mono">{currentTime}</span>

            {/* Front Camera Hole Punch */}
            <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-white/5 mx-auto"></div>

            <div className="flex items-center gap-1.5 text-[12px] text-[#adc6ff]">
              <span className="material-symbols-outlined text-[14px] text-[#4edea3]">radar</span>
              <span className="text-[9px] font-black text-[#ffb95f]">5G</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* iOS Native Status Bar */}
        {deviceMode === 'ios' && (
          <div className="w-full h-11 bg-[#091326] px-6 pt-2 flex items-center justify-between text-[11px] font-bold text-[#d9e2fd] select-none z-50 shrink-0">
            <span className="font-semibold tracking-tight">{currentTime}</span>

            {/* Dynamic Island Notch */}
            <div className="w-24 h-6 rounded-full bg-black border border-white/10 flex items-center justify-end px-2 gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00a572] animate-ping"></span>
            </div>

            <div className="flex items-center gap-1 text-[13px] text-[#d9e2fd]">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_3_bar</span>
            </div>
          </div>
        )}

        {/* Main Application Screen View */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">{children}</div>

        {/* Android Native System Navigation Bar */}
        {deviceMode === 'android' && (
          <div className="w-full h-11 bg-[#091326]/90 backdrop-blur-md border-t border-white/5 px-12 flex items-center justify-between text-[#8c909f] select-none z-50 shrink-0">
            <button
              onClick={() => setIsPlayStoreHubOpen(true)}
              className="hover:text-white transition-colors"
              title="Recent Apps / Hub"
            >
              <span className="material-symbols-outlined text-[20px]">crop_square</span>
            </button>
            <button
              onClick={() => {
                // Navigate home
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
              title="Home"
            >
              <span className="material-symbols-outlined text-[20px]">circle</span>
            </button>
            <button
              onClick={() => window.history.back()}
              className="hover:text-white transition-colors"
              title="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios</span>
            </button>
          </div>
        )}

        {/* iOS Home Indicator Bar */}
        {deviceMode === 'ios' && (
          <div className="w-full h-6 bg-[#091326] flex items-center justify-center pb-2 z-50 shrink-0">
            <div className="w-32 h-1 rounded-full bg-white/40"></div>
          </div>
        )}
      </div>
    </div>
  );
};
