import React from 'react';
import { useTrip } from '../context/TripContext';

export const Toast: React.FC = () => {
  const { toast } = useTrip();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-[#202a3e]/95 border border-[#4edea3]/40 backdrop-blur-xl rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
      <span className="material-symbols-outlined text-[#4edea3] text-[22px]">
        {toast.type === 'error' ? 'report' : toast.type === 'warning' ? 'warning' : 'task_alt'}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-[#d9e2fd] truncate">{toast.message}</span>
        <span className="text-[10px] text-[#c2c6d6]">TravelMate AI OS Active</span>
      </div>
    </div>
  );
};
