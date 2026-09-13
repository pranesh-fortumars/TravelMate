import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const Terrain3DView: React.FC = () => {
  const { setActiveTab, showToast } = useTrip();

  const [layerMode, setLayerMode] = useState<'topo' | 'satellite' | 'contour'>('topo');
  const [isFlyingOver, setIsFlyingOver] = useState(false);
  const [activeWaypoint, setActiveWaypoint] = useState<string | null>('KDHP Tea Museum');

  const waypoints = [
    { name: 'Lock Heart Gap', elev: '1,640m', tag: 'Clear', x: '25%', y: '65%' },
    { name: 'KDHP Tea Museum', elev: '1,520m', tag: 'AI Rerouted', x: '50%', y: '45%' },
    { name: 'Top Station Ridge', elev: '1,880m', tag: 'Heavy Fog', x: '78%', y: '28%' },
    { name: 'Mattupetty Dam', elev: '1,700m', tag: 'Twilight', x: '62%', y: '72%' },
  ];

  const handleStartFlyover = () => {
    setIsFlyingOver(true);
    showToast('Starting 3D Terrain Flyover Simulation...');
    setTimeout(() => {
      setIsFlyingOver(false);
      showToast('3D Flyover Complete ✓');
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#040e21] text-[#d9e2fd] pb-24 relative overflow-hidden">
      {/* Top HUD Bar */}
      <div className="px-4 py-3 bg-[#091326]/90 backdrop-blur-xl border-b border-[#202a3e] flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="w-9 h-9 rounded-full bg-[#161f33] text-[#c2c6d6] hover:text-[#d9e2fd] flex items-center justify-center border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#ffb95f] uppercase tracking-widest">
              3D VOYAGER • MUNNAR HIGH RANGES
            </span>
            <h2 className="text-sm font-extrabold text-[#d9e2fd]">Anamudi Topo Elevation HUD</h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold border border-[#00a572]/30">
            60 FPS
          </span>
          <span className="px-2 py-0.5 rounded bg-[#202a3e] text-[#adc6ff] text-[10px] font-bold border border-white/10">
            NavIC Lock
          </span>
        </div>
      </div>

      {/* Main 3D Viewport Simulation Stage */}
      <div className="relative w-full h-[380px] bg-gradient-to-b from-[#091326] via-[#0d182e] to-[#040e21] overflow-hidden flex items-center justify-center">
        {/* Animated Topo Vector Lines SVG Canvas */}
        <svg
          className={`w-full h-full opacity-60 transition-transform duration-1000 ${
            isFlyingOver ? 'scale-125 rotate-2' : 'scale-100'
          }`}
          viewBox="0 0 600 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="topoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#4edea3" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffb95f" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="splineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb95f" />
              <stop offset="50%" stopColor="#4edea3" />
              <stop offset="100%" stopColor="#4d8eff" />
            </linearGradient>
          </defs>

          {/* Contour Rings */}
          <path d="M 50 350 Q 180 120 300 220 T 550 80" fill="none" stroke="url(#topoGrad)" strokeWidth="2" />
          <path d="M 20 280 Q 220 80 380 280 T 580 150" fill="none" stroke="url(#topoGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 80 220 Q 260 40 420 180 T 520 220" fill="none" stroke="url(#topoGrad)" strokeWidth="1" />
          <path d="M 120 160 Q 300 20 460 120 T 480 320" fill="none" stroke="url(#topoGrad)" strokeWidth="1.5" />

          {/* Route Trajectory Spline */}
          <path
            d="M 120 300 C 200 220 280 250 350 180 S 480 120 520 80"
            fill="none"
            stroke="url(#splineGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Glowing Animated Pulse Marker */}
          <circle cx="350" cy="180" r="8" fill="#ffb95f" className="animate-ping opacity-75" />
          <circle cx="350" cy="180" r="5" fill="#ffb95f" />
        </svg>

        {/* Waypoint Overlay Cards */}
        {waypoints.map((wp, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveWaypoint(wp.name);
              showToast(`Selected Waypoint: ${wp.name} (${wp.elev})`);
            }}
            style={{ left: wp.x, top: wp.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl backdrop-blur-md border transition-all ${
              activeWaypoint === wp.name
                ? 'bg-[#ffb95f] text-[#5b3800] border-[#ffb95f] ring-4 ring-[#ffb95f]/30 scale-110 z-10 font-bold'
                : 'bg-[#091326]/85 text-[#d9e2fd] border-white/20 hover:scale-105'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="text-xs whitespace-nowrap">{wp.name}</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] mt-0.5 opacity-90">
              <span>{wp.elev}</span>
              <span className="font-bold">{wp.tag}</span>
            </div>
          </div>
        ))}

        {/* Floating Side Docks */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => setLayerMode('topo')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-md transition-all ${
              layerMode === 'topo'
                ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                : 'bg-[#161f33]/80 text-[#c2c6d6] border-white/10'
            }`}
            title="Topographic Layer"
          >
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </button>

          <button
            onClick={() => setLayerMode('satellite')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-md transition-all ${
              layerMode === 'satellite'
                ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                : 'bg-[#161f33]/80 text-[#c2c6d6] border-white/10'
            }`}
            title="Satellite Mesh"
          >
            <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
          </button>

          <button
            onClick={() => showToast('Landslide Hazard Index: LOW (Safe Range)')}
            className="w-9 h-9 rounded-xl bg-[#00a572]/30 text-[#4edea3] border border-[#00a572]/40 flex items-center justify-center shadow-md"
            title="Landslide Safety Shield"
          >
            <span className="material-symbols-outlined text-[18px]">security</span>
          </button>
        </div>
      </div>

      {/* Topographic Elevation Profile & Telemetry Bar */}
      <div className="px-5 mt-4 space-y-4">
        {/* Elevation Cross-Section Chart */}
        <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 shadow-xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb95f]">show_chart</span>
              <div>
                <h4 className="text-xs font-bold text-[#d9e2fd]">Topographic Cross-Section</h4>
                <p className="text-[10px] text-[#c2c6d6]">Gap Road Pass • 1,532m to 2,695m Peak</p>
              </div>
            </div>

            <span className="text-xs font-extrabold text-[#4edea3] bg-[#00a572]/20 px-2 py-0.5 rounded">
              +8.4% Slope
            </span>
          </div>

          {/* SVG Elevation Profile Curve */}
          <div className="w-full h-24 bg-[#121b2f] rounded-xl p-2 relative overflow-hidden border border-white/5">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#4d8eff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path d="M 0 70 Q 60 50 120 20 T 240 40 T 300 10 L 300 80 L 0 80 Z" fill="url(#chartGrad)" />
              <path d="M 0 70 Q 60 50 120 20 T 240 40 T 300 10" fill="none" stroke="#4d8eff" strokeWidth="3" />
              
              {/* Vehicle Current Elevation Node */}
              <circle cx="120" cy="20" r="5" fill="#ffb95f" />
              <line x1="120" y1="20" x2="120" y2="80" stroke="#ffb95f" strokeDasharray="2 2" strokeWidth="1" />
            </svg>

            <div className="absolute left-2 top-2 text-[9px] text-[#adc6ff] font-bold">2,695m (Anamudi)</div>
            <div className="absolute right-2 bottom-2 text-[9px] text-[#c2c6d6]">1,532m (Valara)</div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[9px] text-[#c2c6d6] block">Gradient</span>
              <span className="font-bold text-[#d9e2fd]">+8.4%</span>
            </div>
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[9px] text-[#c2c6d6] block">Max Peak</span>
              <span className="font-bold text-[#ffb95f]">2,150m</span>
            </div>
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[9px] text-[#c2c6d6] block">Hairpins</span>
              <span className="font-bold text-[#4edea3]">42 Turns</span>
            </div>
            <div className="p-2 rounded-xl bg-[#121b2f] border border-white/5">
              <span className="text-[9px] text-[#c2c6d6] block">Signal</span>
              <span className="font-bold text-[#adc6ff]">NavIC+</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleStartFlyover}
            disabled={isFlyingOver}
            className="h-12 rounded-xl bg-[#4d8eff] hover:bg-[#4d8eff]/90 text-[#00285d] font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
            <span>{isFlyingOver ? 'Simulating Flyover...' : 'Start 3D Flyover'}</span>
          </button>

          <button
            onClick={() => showToast('Downloaded 3D Topographic Mesh for Offline Use ✓')}
            className="h-12 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-[#d9e2fd] font-bold text-xs flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
            <span>Offline Topo Mesh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
