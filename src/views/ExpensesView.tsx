import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const ExpensesView: React.FC = () => {
  const { trip, setIsLogExpenseOpen, settleDebt, showToast } = useTrip();
  const [showMemberDetails, setShowMemberDetails] = useState(false);

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd]">
      {/* Live Trip Ledger Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-widest">
              Live Trip Ledger • 6 Explorers
            </span>
            <h1 className="text-2xl font-extrabold text-[#d9e2fd] tracking-tight mt-0.5">
              Group Expenses & UPI
            </h1>
          </div>

          <button
            onClick={() => setIsLogExpenseOpen(true)}
            className="h-10 px-3.5 bg-[#4d8eff] hover:bg-[#4d8eff]/90 text-[#002e6a] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* Financial Health Bento Box */}
      <div className="px-5 mt-2">
        <div className="p-5 rounded-2xl bg-[#161f33] border border-white/10 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#c2c6d6]">Total Group Spent</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-extrabold text-[#adc6ff]">₹</span>
                <span className="text-3xl font-extrabold text-[#d9e2fd] tracking-tight">
                  {trip.spentBudget.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#c2c6d6]">/ ₹{trip.totalBudget.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="px-3 py-1 rounded-full bg-[#00a572]/20 text-[#4edea3] text-xs font-bold border border-[#4edea3]/30">
                ₹{trip.remainingBuffer.toLocaleString('en-IN')} Safe Buffer
              </div>
              <span className="text-[11px] text-[#c2c6d6] mt-1">78.7% of Cap Used</span>
            </div>
          </div>

          {/* Visual Progress Stack */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full h-3 rounded-full bg-[#2b3549] overflow-hidden flex">
              <div className="bg-[#ffb95f] h-full" style={{ width: '32%' }} title="Stay 32%"></div>
              <div className="bg-[#4d8eff] h-full" style={{ width: '27%' }} title="Transport 27%"></div>
              <div className="bg-[#4edea3] h-full" style={{ width: '20%' }} title="Food 20%"></div>
              <div className="bg-[#adc6ff] h-full" style={{ width: '12%' }} title="Entry 12%"></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#c2c6d6] px-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span> Stays
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4d8eff]"></span> Transit
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span> Food
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#adc6ff]"></span> Tickets
              </span>
            </div>
          </div>

          {/* Healthy Burn Velocity */}
          <div className="p-3 rounded-xl bg-[#121b2f] flex items-center justify-between border border-white/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">speed</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#d9e2fd]">Healthy Burn Velocity</span>
                <span className="text-[11px] text-[#c2c6d6]">₹{trip.burnVelocityDaily}/day • Target ₹4,000/day</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#4edea3]">3 Days Left</span>
          </div>
        </div>
      </div>

      {/* Smart UPI Settlement Resolution Engine */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-[#d9e2fd]">Smart UPI Settlement</span>
              <span className="text-[10px] bg-[#ee9800]/20 text-[#ffb95f] px-2 py-0.5 rounded font-bold">
                Min Debt Engine
              </span>
            </div>
            <p className="text-xs text-[#c2c6d6]">Reduces 15 complex group debts down to 3 optimal transfers</p>
          </div>
        </div>

        <div className="space-y-3">
          {trip.settlements.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#161f33] text-center text-xs text-[#4edea3] font-bold border border-white/10">
              🎉 All group debts are completely settled!
            </div>
          ) : (
            trip.settlements.map(st => (
              <div
                key={st.id}
                className="p-4 rounded-2xl bg-[#161f33] border border-white/10 shadow-md flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-[#202a3e] text-[#adc6ff] flex items-center justify-center font-bold text-xs ring-1 ring-white/10">
                        {st.fromCode}
                      </div>
                      <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">arrow_forward</span>
                      <div className="w-8 h-8 rounded-full bg-[#00a572]/20 text-[#4edea3] flex items-center justify-center font-bold text-xs ring-1 ring-white/10">
                        {st.toCode}
                      </div>
                      {st.toSecondaryCode && (
                        <div className="w-8 h-8 rounded-full bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center font-bold text-xs -ml-3 ring-1 ring-white/10">
                          {st.toSecondaryCode}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#d9e2fd]">
                        {st.fromName} owes {st.toName}
                      </span>
                      <span className="text-[11px] text-[#c2c6d6]">{st.reason}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-base font-extrabold text-[#4edea3]">
                      ₹{st.amount.toLocaleString('en-IN')}
                    </span>
                    {st.stepsNote && (
                      <span className="text-[10px] text-[#ffb95f] font-semibold">{st.stepsNote}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => settleDebt(st.id)}
                    className="flex-1 h-9 rounded-xl bg-[#00a572] hover:bg-[#00a572]/90 text-[#00311f] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    <span>Pay via GPay / PhonePe</span>
                  </button>
                  <button
                    onClick={() => showToast(`Sent payment reminder to ${st.fromName}`)}
                    className="h-9 px-3 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-[#c2c6d6] text-xs font-semibold"
                  >
                    Remind
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Member Standings Accordion */}
      <div className="px-5 mt-5">
        <div
          onClick={() => setShowMemberDetails(!showMemberDetails)}
          className="p-4 rounded-2xl bg-[#161f33] border border-white/10 flex items-center justify-between cursor-pointer hover:bg-[#1a253c] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#adc6ff]">groups</span>
            <div>
              <h3 className="text-sm font-bold text-[#d9e2fd]">Member Standings</h3>
              <p className="text-xs text-[#c2c6d6]">Individual shares and balances</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#c2c6d6]">
            {showMemberDetails ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {showMemberDetails && (
          <div className="mt-2 p-4 rounded-2xl bg-[#121b2f] border border-white/5 space-y-3">
            {trip.members.map(m => (
              <div key={m.id} className="flex items-center justify-between text-xs pb-2 border-b border-white/5 last:border-0 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#202a3e] text-[#d9e2fd] flex items-center justify-center font-bold text-xs">
                    {m.shortCode}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#d9e2fd]">
                      {m.name} {m.isYou ? '(You)' : ''}
                    </span>
                    <span className="text-[10px] text-[#c2c6d6]">Paid: ₹{m.paidTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-bold block ${
                      m.balance > 0 ? 'text-[#4edea3]' : m.balance < 0 ? 'text-[#ffb4ab]' : 'text-[#c2c6d6]'
                    }`}
                  >
                    {m.balance > 0 ? `+₹${m.balance}` : m.balance < 0 ? `-₹${Math.abs(m.balance)}` : 'Settled'}
                  </span>
                  <span className="text-[10px] text-[#c2c6d6]">
                    {m.balance > 0 ? 'To Receive' : m.balance < 0 ? 'Owes Group' : 'Balanced'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Group Expenses Stream */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[#d9e2fd]">Recent Group Expenses</h3>
          <span className="text-xs text-[#c2c6d6]">{trip.expenses.length} Records</span>
        </div>

        <div className="space-y-2.5">
          {trip.expenses.map(exp => (
            <div
              key={exp.id}
              className="p-3.5 rounded-2xl bg-[#161f33] border border-white/10 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#202a3e] text-[#ffb95f] flex items-center justify-center font-bold shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {exp.category === 'Entry' ? 'confirmation_number' : exp.category === 'Food' ? 'restaurant' : 'directions_car'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-[#d9e2fd]">{exp.title}</h5>
                    {exp.verifiedOcr && (
                      <span className="px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#4edea3] text-[9px] font-bold">
                        OCR Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#c2c6d6] mt-0.5">{exp.splitDetails}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-[#d9e2fd] block">
                  ₹{exp.amount.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#adc6ff] block">Your share: ₹{exp.yourShare}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
