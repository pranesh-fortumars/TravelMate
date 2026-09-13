import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const LiveNavView: React.FC = () => {
  const { setActiveTab, addPitstop, showToast } = useTrip();

  const [voiceLang, setVoiceLang] = useState<'ENG' | 'HIN' | 'MAL'>('ENG');
  const [speed] = useState(32);

  const handleVoiceToggle = () => {
    const nextLang = voiceLang === 'ENG' ? 'HIN' : voiceLang === 'HIN' ? 'MAL' : 'ENG';
    setVoiceLang(nextLang);
    showToast(`Voice Guidance Switched to ${nextLang === 'ENG' ? 'English' : nextLang === 'HIN' ? 'Hindi' : 'Malayalam'}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#040e21] text-[#d9e2fd] pb-24 relative overflow-hidden">
      {/* HUD Top Maneuver Card */}
      <div className="fixed top-0 left-0 right-0 z-30 p-4 max-w-[600px] mx-auto">
        <div className="p-4 rounded-2xl bg-[#091326]/95 backdrop-blur-2xl border border-[#4d8eff]/40 shadow-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#4d8eff] text-[#00285d] flex items-center justify-center font-extrabold shadow-lg shrink-0">
                <span className="material-symbols-outlined text-[28px]">turn_left</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-[#4d8eff] tracking-wider uppercase">In 180m</span>
                  <span className="text-[10px] text-[#c2c6d6]">• Gap Road Pass</span>
                </div>
                <h3 className="text-base font-extrabold text-[#d9e2fd] leading-tight">
                  Hairpin Left into SH-17
                </h3>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('home')}
              className="w-9 h-9 rounded-full bg-[#161f33] text-[#c2c6d6] hover:text-[#d9e2fd] flex items-center justify-center border border-white/10 shrink-0"
              title="Exit Navigation"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Subsequent Turn Preview Ribbon */}
          <div className="px-3 py-1.5 rounded-xl bg-[#161f33] flex items-center justify-between border border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb95f] text-[16px]">turn_right</span>
              <span className="text-[#c2c6d6]">Then 400m Hairpin Right • <strong className="text-[#ffb95f]">Honk Curve</strong></span>
            </div>
            <span className="text-[10px] font-bold text-[#4edea3]">Elev 1,620m</span>
          </div>
        </div>
      </div>

      {/* Main AR Windshield Navigation Canvas */}
      <div className="relative w-full h-[460px] pt-28 bg-gradient-to-b from-[#091326] via-[#0d182e] to-[#040e21] flex items-center justify-center overflow-hidden">
        {/* Simulated Winding Road Vector AR Projection */}
        <svg className="w-full h-full opacity-70" viewBox="0 0 600 400" preserveAspectRatio="none">
          {/* Horizon Line */}
          <line x1="0" y1="180" x2="600" y2="180" stroke="#202a3e" strokeWidth="1" strokeDasharray="4 4" />

          {/* Perspective Mountain Silhouettes */}
          <polygon points="0,180 120,80 280,180" fill="#0d182e" />
          <polygon points="200,180 380,50 520,180" fill="#121b2f" />
          <polygon points="400,180 500,100 600,180" fill="#0d182e" />

          {/* AR Road Trajectory Corridor */}
          <path
            d="M 300 180 Q 220 250 100 400 L 500 400 Q 380 250 300 180 Z"
            fill="#161f33"
            opacity="0.8"
          />

          {/* Dynamic AR Trajectory Arrow Spline */}
          <path
            d="M 300 190 Q 240 280 180 400"
            fill="none"
            stroke="#4d8eff"
            strokeWidth="8"
            strokeLinecap="round"
            className="animate-pulse"
          />

          <path
            d="M 300 190 Q 240 280 180 400"
            fill="none"
            stroke="#4edea3"
            strokeWidth="3"
            strokeDasharray="12 12"
          />

          {/* Hairpin Marker Pin */}
          <g transform="translate(240, 270)">
            <circle cx="0" cy="0" r="14" fill="#ee9800" opacity="0.8" className="animate-ping" />
            <circle cx="0" cy="0" r="10" fill="#ee9800" />
            <text x="0" y="4" textAnchor="middle" fill="#5b3800" fontSize="10" fontWeight="bold">#14</text>
          </g>
        </svg>

        {/* Floating Side Action Dock */}
        <div className="absolute right-4 top-36 flex flex-col gap-2.5 z-20">
          <button
            onClick={() => setActiveTab('3dmap')}
            className="w-10 h-10 rounded-xl bg-[#161f33]/90 backdrop-blur-md text-[#adc6ff] border border-white/10 flex items-center justify-center shadow-lg active:scale-95"
            title="3D Terrain Mode"
          >
            <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
          </button>

          <button
            onClick={handleVoiceToggle}
            className="w-10 h-10 rounded-xl bg-[#161f33]/90 backdrop-blur-md text-[#ffb95f] border border-white/10 flex items-center justify-center shadow-lg font-bold text-xs active:scale-95"
            title="Switch Voice Guidance Language"
          >
            {voiceLang}
          </button>

          <button
            onClick={() => showToast('Heading Recentered to North-Up Navigation')}
            className="w-10 h-10 rounded-xl bg-[#161f33]/90 backdrop-blur-md text-[#d9e2fd] border border-white/10 flex items-center justify-center shadow-lg active:scale-95"
            title="Recenter Map"
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className="w-10 h-10 rounded-xl bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/30 flex items-center justify-center shadow-lg font-bold text-xs animate-pulse active:scale-95"
            title="Emergency SOS Relay"
          >
            SOS
          </button>
        </div>

        {/* Ghat Pass Safety Radar Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-2xl bg-[#091326]/90 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              campaign
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d9e2fd]">Hairpin #14 of 42 • Blind Turn</span>
              <span className="text-[10px] text-[#ffb95f] font-medium">Honk Signal Recommended</span>
            </div>
          </div>

          <div className="flex flex-col items-end px-3 py-1 rounded-xl bg-[#161f33] border border-white/5">
            <span className="text-base font-extrabold text-[#4edea3] leading-none">{speed}</span>
            <span className="text-[9px] text-[#c2c6d6] uppercase font-bold">km/h</span>
          </div>
        </div>
      </div>

      {/* Mission Control Bottom Card */}
      <div className="px-5 mt-2 space-y-3">
        {/* Pitstop Chai Teaser Banner */}
        <div className="p-3.5 rounded-2xl bg-[#161f33] border border-[#ffb95f]/30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☕</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d9e2fd]">Vellathooval Elachi Chai</span>
              <span className="text-[11px] text-[#c2c6d6]">800m ahead on Gap Road • Cardamom Tea</span>
            </div>
          </div>

          <button
            onClick={() => addPitstop('Vellathooval Elachi Chai', 240, 'Gap Road Pass')}
            className="px-3 py-1.5 rounded-xl bg-[#ee9800] text-[#5b3800] text-xs font-bold active:scale-95 transition-transform shrink-0"
          >
            Add Pitstop
          </button>
        </div>

        {/* Nav Telemetry Bar */}
        <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#c2c6d6] uppercase tracking-wider font-bold">Destination</span>
              <h4 className="text-sm font-bold text-[#d9e2fd]">KDHP Tea Museum & Factory</h4>
            </div>

            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="text-base font-extrabold text-[#4edea3]">04:15 PM</span>
                <span className="text-[10px] text-[#c2c6d6] block">28 min • 14.2 km</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[10px] text-[#c2c6d6] block">Next Stop</span>
              <span className="font-bold text-[#d9e2fd]">Stop 3 of 6</span>
            </div>
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[10px] text-[#c2c6d6] block">FASTag</span>
              <span className="font-bold text-[#4edea3]">₹450 Ready</span>
            </div>
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[10px] text-[#c2c6d6] block">Convoy</span>
              <span className="font-bold text-[#adc6ff]">Thar #02 Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
