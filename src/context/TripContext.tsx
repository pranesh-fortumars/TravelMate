import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveTrip, ActiveTab, Expense, Settlement, ItineraryActivity } from '../types';
import { INITIAL_ACTIVE_TRIP } from '../data/mockData';

interface ToastState {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
}

interface SosState {
  isActive: boolean;
  progress: number;
  strobe: boolean;
  siren: boolean;
}

export type DeviceMode = 'android' | 'ios' | 'standard';

interface TripContextType {
  trip: ActiveTrip;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  sosState: SosState;
  setSosState: React.Dispatch<React.SetStateAction<SosState>>;
  isAskAiOpen: boolean;
  setIsAskAiOpen: (open: boolean) => void;
  isLogExpenseOpen: boolean;
  setIsLogExpenseOpen: (open: boolean) => void;
  isPlayStoreHubOpen: boolean;
  setIsPlayStoreHubOpen: (open: boolean) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  logNewExpense: (expense: Omit<Expense, 'id' | 'timestamp'>) => void;
  settleDebt: (settlementId: string) => void;
  toggleRerouteActivity: (accepted: boolean) => void;
  addPitstop: (title: string, cost: number, location: string) => void;
  updateBudget: (newBudget: number) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<ActiveTrip>(INITIAL_ACTIVE_TRIP);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [isLogExpenseOpen, setIsLogExpenseOpen] = useState(false);
  const [isPlayStoreHubOpen, setIsPlayStoreHubOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('android');

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });

  const [sosState, setSosState] = useState<SosState>({
    isActive: false,
    progress: 0,
    strobe: false,
    siren: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  };

  const logNewExpense = (newExpData: Omit<Expense, 'id' | 'timestamp'>) => {
    const newExp: Expense = {
      ...newExpData,
      id: `exp-${Date.now()}`,
      timestamp: 'Just now',
    };

    setTrip(prev => {
      const updatedSpent = prev.spentBudget + newExpData.amount;
      const updatedBuffer = prev.totalBudget - updatedSpent;

      return {
        ...prev,
        spentBudget: updatedSpent,
        remainingBuffer: Math.max(0, updatedBuffer),
        expenses: [newExp, ...prev.expenses],
      };
    });

    showToast(`Logged ₹${newExpData.amount} for ${newExpData.title}`);
  };

  const settleDebt = (settlementId: string) => {
    setTrip(prev => ({
      ...prev,
      settlements: prev.settlements.filter(s => s.id !== settlementId),
    }));
    showToast('Settlement recorded via GPay / PhonePe!');
  };

  const toggleRerouteActivity = (accepted: boolean) => {
    setTrip(prev => ({
      ...prev,
      itinerary: prev.itinerary.map(item => {
        if (item.id === 'it-4') {
          if (accepted) {
            return {
              ...item,
              title: 'KDHP Tea Museum & Factory Experience',
              description: 'Tea processing tour, live artisanal CTC tasting & historic projection room (Replaced cliff trek due to storm).',
              cost: 750,
              isAiRerouted: true,
            };
          } else {
            return {
              ...item,
              title: 'Top Station Cliff Viewpoint Trek',
              description: 'Off-road 4x4 Jeep trail to peak. Note: 86% heavy rain chance expected.',
              cost: 1050,
              isAiRerouted: false,
            };
          }
        }
        return item;
      }),
    }));

    if (accepted) {
      showToast('AI Weather Adaptation Applied ✓');
    } else {
      showToast('Reverted to original Top Station Jeep Trek');
    }
  };

  const addPitstop = (title: string, cost: number, location: string) => {
    const newActivity: ItineraryActivity = {
      id: `pit-${Date.now()}`,
      dayNumber: 2,
      time: '04:00 PM',
      duration: '30 min',
      title,
      description: `Quick refreshment & mountain viewpoint break. (${location})`,
      category: 'Food',
      cost,
      costPerHead: Math.round(cost / trip.travellersCount),
      location,
    };

    setTrip(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, newActivity].sort((a, b) => a.time.localeCompare(b.time)),
    }));

    showToast(`Added ${title} to Day 2 Itinerary!`);
  };

  const updateBudget = (newBudget: number) => {
    setTrip(prev => ({
      ...prev,
      totalBudget: newBudget,
      remainingBuffer: newBudget - prev.spentBudget,
    }));
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        sosState,
        setSosState,
        isAskAiOpen,
        setIsAskAiOpen,
        isLogExpenseOpen,
        setIsLogExpenseOpen,
        isPlayStoreHubOpen,
        setIsPlayStoreHubOpen,
        deviceMode,
        setDeviceMode,
        logNewExpense,
        settleDebt,
        toggleRerouteActivity,
        addPitstop,
        updateBudget,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
