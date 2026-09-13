import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const LogExpenseModal: React.FC = () => {
  const { isLogExpenseOpen, setIsLogExpenseOpen, logNewExpense, trip } = useTrip();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'Stay' | 'Transport' | 'Food' | 'Entry' | 'Shopping' | 'Emergency' | 'Other'>('Food');
  const [paidBy, setPaidBy] = useState('m2'); // Ananya default
  const [isScanningOcr, setIsScanningOcr] = useState(false);

  if (!isLogExpenseOpen) return null;

  const handleSimulateOcr = () => {
    setIsScanningOcr(true);
    setTimeout(() => {
      setIsScanningOcr(false);
      setTitle('Rapsy Restaurant Breakfast');
      setAmount('850');
      setCategory('Food');
      setPaidBy('m2');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title || isNaN(numAmount) || numAmount <= 0) return;

    const payer = trip.members.find(m => m.id === paidBy);

    logNewExpense({
      title,
      amount: numAmount,
      category,
      paidBy,
      paidByName: payer ? payer.name : 'Ananya',
      splitDetails: `Paid by ${payer?.name || 'Ananya'} • Split 6 ways`,
      yourShare: Math.round(numAmount / trip.travellersCount),
      verifiedOcr: true,
    });

    // Reset & Close
    setTitle('');
    setAmount('');
    setIsLogExpenseOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#161f33] border border-[#202a3e] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#202a3e] flex items-center justify-between bg-[#121b2f]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3]">add_circle</span>
            <h3 className="text-base font-bold text-[#d9e2fd]">Log New Group Expense</h3>
          </div>
          <button
            onClick={() => setIsLogExpenseOpen(false)}
            className="w-8 h-8 rounded-full bg-[#202a3e] text-[#c2c6d6] hover:text-[#d9e2fd] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Simulated OCR Scanner Trigger */}
          <button
            type="button"
            onClick={handleSimulateOcr}
            disabled={isScanningOcr}
            className="w-full py-2.5 px-3 rounded-xl bg-[#202a3e] border border-[#ffb95f]/30 hover:bg-[#2b3549] text-[#ffb95f] font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isScanningOcr ? 'sync' : 'document_scanner'}
            </span>
            <span>{isScanningOcr ? 'Scanning Bill Receipt...' : '⚡ Scan Receipt via AI OCR'}</span>
          </button>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#c2c6d6] mb-1">Expense Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="E.g. KDHP Tea Museum Tickets"
              className="w-full h-11 bg-[#040e21] border border-[#424754] text-[#d9e2fd] text-sm px-3.5 rounded-xl outline-none focus:border-[#4d8eff]"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-[#c2c6d6] mb-1">Total Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#adc6ff] font-bold">₹</span>
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="1200"
                className="w-full h-11 pl-8 pr-3.5 bg-[#040e21] border border-[#424754] text-[#d9e2fd] text-base font-bold rounded-xl outline-none focus:border-[#4d8eff]"
              />
            </div>
            {amount && !isNaN(parseFloat(amount)) && (
              <p className="text-[11px] text-[#4edea3] mt-1">
                Your share: ₹{Math.round(parseFloat(amount) / trip.travellersCount)} (Split equally among 6)
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#c2c6d6] mb-1">Category</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Food', 'Transport', 'Stay', 'Entry', 'Shopping', 'Emergency', 'Other'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    category === cat
                      ? 'bg-[#4d8eff] text-[#00285d] border-[#4d8eff]'
                      : 'bg-[#121b2f] text-[#c2c6d6] border-[#424754]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-xs font-semibold text-[#c2c6d6] mb-1">Paid By</label>
            <select
              value={paidBy}
              onChange={e => setPaidBy(e.target.value)}
              className="w-full h-11 bg-[#040e21] border border-[#424754] text-[#d9e2fd] text-sm px-3 rounded-xl outline-none focus:border-[#4d8eff]"
            >
              {trip.members.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.isYou ? '(You)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 mt-2 bg-[#4d8eff] hover:bg-[#4d8eff]/90 text-[#00285d] font-bold text-sm rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Save & Split Expense</span>
          </button>
        </form>
      </div>
    </div>
  );
};
