import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const AskTravelMateModal: React.FC = () => {
  const { isAskAiOpen, setIsAskAiOpen, trip, toggleRerouteActivity, addPitstop, showToast } = useTrip();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; actionCard?: any }[]
  >([
    {
      role: 'assistant',
      text: `Namaste Ananya! I am your TravelMate AI Copilot for ${trip.destination}. I'm tracking your ₹${trip.totalBudget.toLocaleString('en-IN')} budget, 6 travellers, and live monsoon radar. How can I help your journey right now?`,
      actionCard: {
        title: 'Downpour Alert at Top Station',
        subtitle: 'AI Weather Swap Ready',
        type: 'weather',
        impact: 'Saves ₹300 jeep costs & keeps group dry at KDHP Tea Museum',
      },
    },
  ]);

  if (!isAskAiOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = customText || prompt;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          tripContext: {
            destination: trip.destination,
            budget: trip.totalBudget,
            spent: trip.spentBudget,
            travellers: trip.travellersCount,
            weather: `${trip.weather.condition}, ${trip.weather.temp}`,
          },
        }),
      });

      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply,
          actionCard: data.actionCard,
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Here is my recommendation for ${trip.destination}:\n\nSince heavy mist is reported along Gap Road, we suggest taking the indoor KDHP Tea Museum guided tour at 2:30 PM. For tea breaks, Vellathooval Elachi Chai is 800m ahead.`,
          actionCard: {
            title: 'Vellathooval Cardamom Chai',
            subtitle: '800m ahead on SH-17',
            cost: '₹40/cup',
            impact: 'Hot cardamom tea with tea garden viewpoint',
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const applyAction = (type: string) => {
    if (type === 'weather' || type === 'attraction') {
      toggleRerouteActivity(true);
    } else {
      addPitstop('Vellathooval Cardamom Chai', 240, 'Gap Road Pass');
    }
    showToast('Applied AI Recommendation to Itinerary!');
    setIsAskAiOpen(false);
  };

  const quickPrompts = [
    "It's raining, what can we do?",
    'Find a cheaper stay in Munnar',
    'Where to eat Malabar parotta tonight?',
    'Reduce today\'s spending by ₹500',
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-[600px] mx-auto bg-[#121b2f] border-t border-[#202a3e] rounded-t-[28px] flex flex-col max-h-[85vh] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#202a3e] flex items-center justify-between bg-[#161f33]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ee9800]/20 text-[#ffb95f] flex items-center justify-center font-bold">
              ✨
            </div>
            <div>
              <h3 className="text-base font-bold text-[#d9e2fd]">Ask TravelMate AI</h3>
              <p className="text-xs text-[#c2c6d6]">Context: {trip.destination} • ₹{trip.totalBudget.toLocaleString('en-IN')} Cap</p>
            </div>
          </div>
          <button
            onClick={() => setIsAskAiOpen(false)}
            className="w-8 h-8 rounded-full bg-[#202a3e] text-[#c2c6d6] hover:text-[#d9e2fd] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#4d8eff] text-[#00285d] font-semibold rounded-br-none'
                    : 'bg-[#161f33] text-[#d9e2fd] border border-[#202a3e] rounded-bl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>

              {/* Action Card Attachment */}
              {msg.actionCard && (
                <div className="mt-2.5 max-w-[85%] p-3.5 rounded-xl bg-[#202a3e] border border-[#ffb95f]/30 flex flex-col gap-2 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb95f] bg-[#ee9800]/20 px-2 py-0.5 rounded">
                      AI Action Card
                    </span>
                    {msg.actionCard.cost && (
                      <span className="text-xs font-bold text-[#4edea3]">{msg.actionCard.cost}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#d9e2fd]">{msg.actionCard.title}</h4>
                    <p className="text-xs text-[#c2c6d6] mt-0.5">{msg.actionCard.subtitle}</p>
                    <p className="text-xs text-[#4edea3] mt-1 italic">{msg.actionCard.impact}</p>
                  </div>
                  <button
                    onClick={() => applyAction(msg.actionCard.type)}
                    className="mt-1 h-9 w-full bg-[#ee9800] text-[#5b3800] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    <span>Apply This Change to Itinerary</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#ffb95f] bg-[#161f33] p-3 rounded-xl w-fit animate-pulse">
              <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
              <span>TravelMate AI is calculating optimal route & budget options...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-[#202a3e]/50 bg-[#121b2f]">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-[#202a3e] hover:bg-[#2b3549] text-xs text-[#c2c6d6] whitespace-nowrap active:scale-95 transition-all shrink-0 border border-white/5"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#161f33] border-t border-[#202a3e] flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about budget, rain, food, or stays..."
            className="flex-1 h-11 bg-[#040e21] text-[#d9e2fd] placeholder-[#8c909f] text-sm px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#4d8eff]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="w-11 h-11 bg-[#4d8eff] disabled:opacity-50 text-[#00285d] font-bold rounded-xl flex items-center justify-center active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
