import React from 'react';
import { useTrip } from '../context/TripContext';
import { TRANSIT_OPTIONS } from '../data/mockData';

export const ItineraryView: React.FC = () => {
  const { trip, toggleRerouteActivity, showToast, setActiveTab } = useTrip();

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd]">
      {/* Top Hero Visual Stage */}
      <div className="relative w-full overflow-hidden bg-[#121b2f] px-5 pt-4 pb-5 rounded-b-2xl shadow-xl border-b border-white/5">
        {/* Ambient Fog Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#4d8eff]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-[#00a572]/15 blur-2xl pointer-events-none"></div>

        {/* Header Metadata */}
        <div className="relative z-10 flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-[#2b3549]/70 backdrop-blur-md px-3 py-1 rounded-full text-[#4edea3] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Day {trip.currentDay} of {trip.daysTotal} • Active
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#c2c6d6] text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">group</span>
            <span>{trip.travellersCount} Wanderers</span>
          </div>
        </div>

        {/* Destination Info */}
        <div className="relative z-10 mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#adc6ff] tracking-wider uppercase font-semibold">
                Western Ghats Trail
              </span>
              <h2 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight">{trip.destination}</h2>
            </div>

            {/* Weather Badge */}
            <div className="flex flex-col items-end bg-[#202a3e]/80 px-3 py-1.5 rounded-xl border border-white/10 shadow-sm">
              <div className="flex items-center gap-1 text-[#ffb95f]">
                <span className="material-symbols-outlined text-[18px]">rainy</span>
                <span className="text-sm font-bold text-[#d9e2fd]">{trip.weather.temp}</span>
              </div>
              <span className="text-[10px] text-[#ffb95f] font-medium">{trip.weather.condition}</span>
            </div>
          </div>
        </div>

        {/* Financial Barometer Bento Card */}
        <div className="relative z-10 bg-[#161f33]/90 rounded-2xl p-4 border border-white/10 shadow-md">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
              </div>
              <div>
                <span className="text-[10px] text-[#c2c6d6] block">Trip Financial Cap</span>
                <span className="text-xs font-bold text-[#d9e2fd]">₹{trip.totalBudget.toLocaleString('en-IN')} Group Budget</span>
              </div>
            </div>
            <span className="bg-[#00a572]/30 text-[#4edea3] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-[#4edea3]/30">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Within Budget
            </span>
          </div>

          {/* Telemetry Bar */}
          <div className="w-full h-2 bg-[#2b3549] rounded-full overflow-hidden mb-2.5">
            <div className="h-full bg-gradient-to-r from-[#adc6ff] via-[#4edea3] to-[#ffb95f] rounded-full" style={{ width: '98%' }}></div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
            <div className="bg-[#202a3e]/60 py-1.5 px-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-[#c2c6d6] block">Planned</span>
              <span className="font-bold text-[#d9e2fd]">₹11,850</span>
            </div>
            <div className="bg-[#202a3e]/60 py-1.5 px-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-[#4edea3] block">Buffer Left</span>
              <span className="font-bold text-[#4edea3]">+₹150</span>
            </div>
            <div className="bg-[#202a3e]/60 py-1.5 px-2 rounded-xl border border-white/5">
              <span className="text-[10px] text-[#ffb95f] block">Avg / Head</span>
              <span className="font-bold text-[#ffb95f]">₹1,975</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Stream */}
      <div className="px-5 flex flex-col gap-4 mt-4">
        {/* AI Real-Time Weather Adaptation Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#202a3e] via-[#161f33] to-[#121b2f] p-4 border border-[#ffb95f]/30 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffb95f] via-[#4d8eff] to-[#4edea3]"></div>
          
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ee9800]/20 flex items-center justify-center text-[#ffb95f] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-[10px] bg-[#ee9800]/30 text-[#ffddb8] px-2 py-0.5 rounded-full font-bold">
                  AI REROUTE ACTIVE
                </span>
                <span className="text-[10px] text-[#c2c6d6]">86% Rain Confidence</span>
              </div>
              <h3 className="text-sm font-bold text-[#d9e2fd] leading-snug">
                Downpour Alert at Top Station (3:00 PM)
              </h3>
              <p className="text-xs text-[#c2c6d6] mt-1 leading-relaxed">
                AI has rescheduled the outdoor cliff trek to preserve safety. <strong className="text-[#d9e2fd] font-semibold">KDHP Tea Factory & Spice Tasting</strong> swapped in for 02:30 PM - 04:30 PM.
              </p>

              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-[#00a572]/20 rounded-md text-[#4edea3] text-[11px] font-semibold border border-[#00a572]/30">
                <span className="material-symbols-outlined text-[14px]">savings</span>
                <span>Optimized: Saves ₹300 off-road jeep cost</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <button
                  onClick={() => toggleRerouteActivity(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#adc6ff] text-[#002e6a] text-xs font-bold shadow-md active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Accept (Rec)</span>
                </button>
                <button
                  onClick={() => toggleRerouteActivity(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2b3549] text-[#c2c6d6] text-xs font-semibold hover:text-[#d9e2fd] active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span>Keep Original</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transit Engine Comparison Matrix */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">sync_alt</span>
              <h4 className="text-sm font-bold text-[#d9e2fd]">Transit Engine</h4>
            </div>
            <span className="text-xs text-[#c2c6d6]">Choice — Not Compromise</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TRANSIT_OPTIONS.map(opt => (
              <div
                key={opt.id}
                onClick={() => showToast(`Selected Transit: ${opt.title}`)}
                className={`flex flex-col justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  opt.isBestMatch
                    ? 'bg-[#202a3e] border-[#ffb95f]/50 shadow-md'
                    : 'bg-[#121b2f] border-white/5 hover:bg-[#161f33]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[#c2c6d6] mb-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {opt.mode === 'bus' ? 'directions_bus' : opt.mode === 'train' ? 'train' : 'directions_car'}
                    </span>
                    <span className={`text-[9px] font-bold px-1 rounded ${opt.isBestMatch ? 'text-[#ffb95f]' : 'text-[#8c909f]'}`}>
                      {opt.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#d9e2fd] block leading-tight">{opt.title}</span>
                  <span className={`text-xs font-bold block mt-1 ${opt.isBestMatch ? 'text-[#ffb95f]' : 'text-[#c2c6d6]'}`}>
                    ₹{opt.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="mt-2 text-[10px] text-[#8c909f] block text-center py-1 bg-[#161f33] rounded-lg">
                  {opt.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#d9e2fd]">Timeline</span>
              <span className="bg-[#adc6ff]/10 text-[#adc6ff] px-2 py-0.5 rounded text-[10px] font-semibold">
                Day 02 • High Ranges
              </span>
            </div>
            <button className="text-xs text-[#adc6ff] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              Filter
            </button>
          </div>

          <div className="relative pl-5 flex flex-col gap-3.5">
            {/* Connecting Line */}
            <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-[#2b3549]"></div>

            {trip.itinerary.map(item => (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-2xl p-3.5 shadow-sm border ${
                  item.isAiRerouted
                    ? 'bg-[#202a3e] border-[#ffb95f]/40'
                    : 'bg-[#161f33] border-white/5'
                }`}
              >
                {/* Bullet */}
                <div className="absolute -left-[17px] top-4 w-3.5 h-3.5 rounded-full bg-[#2b3549] flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isAiRerouted ? 'bg-[#ffb95f] animate-ping' : 'bg-[#adc6ff]'}`}></div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-bold text-[#ffb95f]">{item.time}</span>
                      <span className="text-[11px] text-[#c2c6d6]">• {item.duration}</span>
                      {item.weatherTag && (
                        <span className="text-[10px] text-[#4edea3] bg-[#00a572]/20 px-1.5 py-0.2 rounded font-semibold">
                          {item.weatherTag}
                        </span>
                      )}
                      {item.isAiRerouted && (
                        <span className="text-[10px] bg-[#ee9800] text-[#5b3800] px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">bolt</span>
                          AI Rerouted
                        </span>
                      )}
                    </div>
                    <h5 className="text-sm font-bold text-[#d9e2fd]">{item.title}</h5>
                    <p className="text-xs text-[#c2c6d6] mt-0.5 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#d9e2fd]">
                      {item.cost === 0 ? 'FREE' : `₹${item.cost.toLocaleString('en-IN')}`}
                    </span>
                    {item.costPerHead && (
                      <span className="text-[10px] text-[#c2c6d6] block">₹{item.costPerHead}/p</span>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 mt-3 pt-2 bg-[#121b2f]/60 -mx-3.5 -mb-3.5 px-3.5 py-2 rounded-b-2xl border-t border-white/5">
                  <button
                    onClick={() => setActiveTab('livenav')}
                    className="flex items-center gap-1 text-[#adc6ff] hover:underline text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-[15px]">navigation</span>
                    GPS
                  </button>
                  <span className="text-[#424754]">•</span>
                  
                  {item.ticketsSynced ? (
                    <button
                      onClick={() => showToast(`Showing ${item.ticketsSynced} synced tickets!`)}
                      className="flex items-center gap-1 text-[#4edea3] text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-[15px]">qr_code</span>
                      Tickets ({item.ticketsSynced})
                    </button>
                  ) : (
                    <button
                      onClick={() => showToast('AI finding alternative activity options...')}
                      className="flex items-center gap-1 text-[#c2c6d6] hover:text-[#d9e2fd] text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-[15px]">auto_fix_high</span>
                      AI Swap
                    </button>
                  )}

                  <span className="text-[#424754]">•</span>
                  <button
                    onClick={() => showToast(`Logged expense for ${item.title}`)}
                    className="flex items-center gap-1 text-[#c2c6d6] hover:text-[#d9e2fd] text-xs font-semibold ml-auto"
                  >
                    <span className="material-symbols-outlined text-[15px]">add_circle</span>
                    Log ₹
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
