import React, { useState, useRef } from 'react';
import { useTrip } from '../context/TripContext';

export const SosView: React.FC = () => {
  const { setActiveTab, sosState, setSosState, showToast } = useTrip();

  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<any>(null);

  const startHold = () => {
    setHoldProgress(0);
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          triggerSosAlert();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    if (holdProgress < 100) {
      setHoldProgress(0);
    }
  };

  const triggerSosAlert = () => {
    setSosState(prev => ({ ...prev, isActive: true, strobe: true, siren: true }));
    showToast('🔴 EMERGENCY SOS BEACON BROADCASTED VIA NAVIC & BLE MESH', 'error');
  };

  const cancelSos = () => {
    setSosState(prev => ({ ...prev, isActive: false, strobe: false, siren: false }));
    setHoldProgress(0);
    showToast('Emergency SOS Cancelled');
  };

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd] bg-[#091326] min-h-screen">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 border-b border-[#202a3e] bg-[#121b2f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="w-9 h-9 rounded-full bg-[#161f33] text-[#c2c6d6] hover:text-[#d9e2fd] flex items-center justify-center border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#ffb4ab] uppercase tracking-widest">
              OFFLINE TACTICAL BEACON
            </span>
            <h1 className="text-base font-extrabold text-[#d9e2fd]">Emergency SOS & Relays</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
          <span>NavIC L5 Lock</span>
        </div>
      </div>

      {/* Main Hold-To-Trigger Beacon Core */}
      <div className="px-5 mt-5 flex flex-col items-center">
        {sosState.isActive ? (
          <div className="w-full p-5 rounded-2xl bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab] flex flex-col items-center text-center shadow-2xl animate-pulse">
            <span className="material-symbols-outlined text-[48px] text-[#ffb4ab]">warning</span>
            <h3 className="text-xl font-extrabold mt-2">SOS BEACON BROADCASTING</h3>
            <p className="text-xs mt-1 leading-relaxed opacity-90">
              Broadcasting encrypted position via NavIC satellite relays & BLE local mesh to 112 Patrol & Convoy Thar #02.
            </p>

            <button
              onClick={cancelSos}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white text-[#93000a] text-xs font-extrabold uppercase shadow-lg active:scale-95 transition-transform"
            >
              Cancel Emergency Signal
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Interactive Hold-to-Trigger Button */}
            <div
              onMouseDown={startHold}
              onMouseUp={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="relative w-44 h-44 rounded-full bg-gradient-to-br from-[#93000a] to-[#600004] border-4 border-[#ffb4ab]/40 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(147,0,10,0.5)] active:scale-95 transition-all select-none"
            >
              {/* SVG Ring Progress Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="88"
                  cy="88"
                  r="80"
                  fill="none"
                  stroke="#ffb4ab"
                  strokeWidth="8"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (502 * holdProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <span className="material-symbols-outlined text-[42px] text-[#ffb4ab] font-bold">sos</span>
              <span className="text-xs font-extrabold text-[#ffdad6] tracking-wider uppercase mt-1">
                {holdProgress > 0 ? `${Math.round(holdProgress)}%` : 'HOLD 3S FOR SOS'}
              </span>
            </div>
            <span className="text-[11px] text-[#c2c6d6] mt-3">Press & hold 3 seconds to broadcast offline signal</span>
          </div>
        )}
      </div>

      {/* Geolocation Fix Card */}
      <div className="px-5 mt-6">
        <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#202a3e] text-[#4edea3] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">location_on</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d9e2fd]">10.0889° N, 77.0595° E</span>
              <span className="text-[11px] text-[#ffb95f] font-mono mt-0.5">///valley.mist.chai • Elev 1,640m</span>
            </div>
          </div>

          <button
            onClick={() => showToast('Copied Lat/Long coordinates to clipboard!')}
            className="px-3 py-1.5 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-[#adc6ff] text-xs font-bold active:scale-95"
          >
            Copy Fix
          </button>
        </div>
      </div>

      {/* Offline Emergency Relay Shortcuts */}
      <div className="px-5 mt-5">
        <h3 className="text-sm font-bold text-[#d9e2fd] mb-3">Offline Emergency Relays</h3>
        
        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-[#161f33] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center font-bold">
                112
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#d9e2fd]">112 Unified Emergency Relay</span>
                <span className="text-[11px] text-[#c2c6d6]">Police • Ambulance • Fire & Rescue</span>
              </div>
            </div>
            <a
              href="tel:112"
              className="px-3 py-1.5 rounded-xl bg-[#93000a] text-[#ffdad6] text-xs font-bold active:scale-95"
            >
              Call 112
            </a>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161f33] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#ee9800]/20 text-[#ffb95f] flex items-center justify-center font-bold">
                NHAI
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#d9e2fd]">1033 NHAI Highway Patrol</span>
                <span className="text-[11px] text-[#c2c6d6]">Ghat Towing • Flat Tyre • Fuel Patrol</span>
              </div>
            </div>
            <a
              href="tel:1033"
              className="px-3 py-1.5 rounded-xl bg-[#202a3e] text-[#d9e2fd] text-xs font-bold active:scale-95"
            >
              Call 1033
            </a>
          </div>
        </div>
      </div>

      {/* Convoy BLE Mesh Nodes */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#d9e2fd]">Convoy BLE Mesh Fleet</span>
          <span className="text-[10px] text-[#4edea3] font-bold">3 Nodes Active</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#161f33] border border-white/10 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="font-semibold text-[#d9e2fd]">🚙 Rohan Thar #02</span>
            <span className="text-[#4edea3] font-bold">Connected • 120m ahead</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="font-semibold text-[#d9e2fd]">🏍️ Sneha KTM Adventure</span>
            <span className="text-[#4edea3] font-bold">Connected • 40m behind</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#d9e2fd]">📞 Papa (ICE Contact)</span>
            <span className="text-[#ffb95f] font-bold">SMS Relay Armed</span>
          </div>
        </div>
      </div>

      {/* Tactical Hardware Deck */}
      <div className="px-5 mt-5">
        <h3 className="text-sm font-bold text-[#d9e2fd] mb-3">Tactical Hardware Deck</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setSosState(prev => ({ ...prev, strobe: !prev.strobe }));
              showToast(sosState.strobe ? 'Strobe Light Deactivated' : 'High-Intensity Strobe Flash Activated!');
            }}
            className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
              sosState.strobe
                ? 'bg-white text-black border-white shadow-lg font-bold'
                : 'bg-[#161f33] text-[#d9e2fd] border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">flash_on</span>
              <span className="text-xs font-bold">SOS Strobe</span>
            </div>
            <span className="text-[10px] uppercase">{sosState.strobe ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => {
              setSosState(prev => ({ ...prev, siren: !prev.siren }));
              showToast(sosState.siren ? 'Siren Audio Deactivated' : '120dB Emergency Acoustic Siren Active!');
            }}
            className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
              sosState.siren
                ? 'bg-[#93000a] text-[#ffdad6] border-[#ffb4ab] shadow-lg font-bold'
                : 'bg-[#161f33] text-[#d9e2fd] border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
              <span className="text-xs font-bold">120dB Siren</span>
            </div>
            <span className="text-[10px] uppercase">{sosState.siren ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Traveler Medical ID Card */}
      <div className="px-5 mt-5">
        <div className="p-4 rounded-2xl bg-[#121b2f] border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#d9e2fd]">Traveler Medical ID</span>
            <span className="text-[10px] text-[#ffb4ab] font-bold">Organ Donor Registry</span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[#c2c6d6]">Name: <strong className="text-[#d9e2fd]">Ananya Sen</strong></span>
            <span className="text-[#c2c6d6]">Blood Group: <strong className="text-[#ffb4ab]">O+ Positive</strong></span>
          </div>
          <span className="text-[11px] text-[#c2c6d6]">Allergies: Mild Peanut / Asthmatics Inhaler in Backpack</span>
        </div>
      </div>
    </div>
  );
};
