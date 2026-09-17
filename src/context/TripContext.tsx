import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveTrip, ActiveTab, Expense, Settlement, ItineraryActivity, UserProfile, DestinationCard } from '../types';
import { INITIAL_ACTIVE_TRIP, INITIAL_USER_PROFILE, DESTINATIONS } from '../data/mockData';

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
  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  // Destinations
  savedDestinationIds: string[];
  toggleSaveDestination: (destId: string) => void;
  selectedDestination: DestinationCard | null;
  setSelectedDestination: (dest: DestinationCard | null) => void;
  // Trips
  savedTrips: ActiveTrip[];
  createNewTrip: (newTrip: ActiveTrip) => void;
  switchActiveTrip: (tripId: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<ActiveTrip>(INITIAL_ACTIVE_TRIP);
  const [savedTrips, setSavedTrips] = useState<ActiveTrip[]>([
    INITIAL_ACTIVE_TRIP,
    {
      id: 'hampi-heritage-2026',
      title: 'Hampi Vijayanagara Trail',
      subtitle: 'Boulders & Coracles • 3 Days',
      origin: 'Bengaluru',
      destination: 'Hampi, Karnataka',
      daysTotal: 3,
      currentDay: 1,
      travellersCount: 4,
      totalBudget: 8500,
      spentBudget: 0,
      remainingBuffer: 8500,
      burnVelocityDaily: 2833,
      status: 'upcoming',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEiBuvW_MqMSkp5gcSuDtOvUmW3SHn5df6_RFwIIlrxetNSMvcDJcNefnjA3YYR-ePTXuoXwbZMfquXHSsVFbJaDm1Na9AkQ0MvFxf9k15LFzVyIoSXXxQY3asqAFOy62b2z0NQ7tScsEoAS5Y5nhBfdDP9DpDLoo1HcUjfqFwfh_PooM6DQAxieQurmuDj28eGToxFJd3OrAGymsgXKa8SXdb_vMxYtBcKxLj4izczLz3JL8_fqS1',
      weather: {
        temp: '28°C',
        condition: 'Clear Skies',
        rainProbability: '5%',
        dryWindowUntil: 'All Day',
      },
      allocations: {
        transport: 2200,
        stays: 2800,
        food: 1800,
        experiences: 1000,
        safetyBuffer: 700,
      },
      members: [
        { id: 'm1', name: 'Ananya Sen', shortCode: 'AN', paidTotal: 0, share: 2125, balance: 0, isYou: true },
        { id: 'm2', name: 'Vikram Joshi', shortCode: 'VK', paidTotal: 0, share: 2125, balance: 0, isYou: false },
        { id: 'm3', name: 'Rahul Sharma', shortCode: 'RA', paidTotal: 0, share: 2125, balance: 0, isYou: false },
        { id: 'm4', name: 'Sneha Nair', shortCode: 'SN', paidTotal: 0, share: 2125, balance: 0, isYou: false },
      ],
      expenses: [],
      settlements: [],
      itinerary: [
        {
          id: 'h-1',
          dayNumber: 1,
          time: '06:30 AM',
          duration: '1 hr',
          title: 'Sunrise on Matanga Hill',
          description: 'Panoramic view over Achyutaraya Temple & banana groves.',
          category: 'Sightseeing',
          cost: 0,
          isFree: true,
          location: 'Matanga Hill, Hampi',
        },
      ],
    },
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(['munnar', 'hampi']);
  const [selectedDestination, setSelectedDestination] = useState<DestinationCard | null>(null);

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

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile preferences updated ✓');
  };

  const toggleSaveDestination = (destId: string) => {
    setSavedDestinationIds(prev => {
      const exists = prev.includes(destId);
      if (exists) {
        showToast('Removed from Saved Wishlist');
        return prev.filter(id => id !== destId);
      } else {
        showToast('Added to Saved Wishlist ❤️');
        return [...prev, destId];
      }
    });
  };

  const createNewTrip = (newTrip: ActiveTrip) => {
    setTrip(newTrip);
    setSavedTrips(prev => [newTrip, ...prev]);
    setActiveTab('itinerary');
    showToast(`Created "${newTrip.title}" successfully!`);
  };

  const switchActiveTrip = (tripId: string) => {
    const found = savedTrips.find(t => t.id === tripId);
    if (found) {
      setTrip(found);
      setActiveTab('home');
      showToast(`Switched to "${found.title}"`);
    }
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
        userProfile,
        updateUserProfile,
        savedDestinationIds,
        toggleSaveDestination,
        selectedDestination,
        setSelectedDestination,
        savedTrips,
        createNewTrip,
        switchActiveTrip,
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
