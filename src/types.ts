export interface TravellerMember {
  id: string;
  name: string;
  shortCode: string;
  avatar?: string;
  paidTotal: number;
  share: number;
  balance: number; // positive = to receive, negative = owes
  isYou?: boolean;
}

export interface Expense {
  id: string;
  title: string;
  paidBy: string; // member id
  paidByName: string;
  amount: number;
  category: 'Stay' | 'Transport' | 'Food' | 'Entry' | 'Shopping' | 'Emergency' | 'Other';
  splitDetails: string; // e.g. "Split equal (₹200/p)"
  yourShare: number;
  timestamp: string;
  verifiedOcr?: boolean;
}

export interface Settlement {
  id: string;
  fromId: string;
  fromName: string;
  fromCode: string;
  toId: string;
  toName: string;
  toCode: string;
  amount: number;
  reason: string;
  type: 'direct' | 'split';
  stepsNote?: string;
  toSecondaryCode?: string;
}

export interface ItineraryActivity {
  id: string;
  dayNumber: number;
  time: string;
  duration: string;
  title: string;
  description: string;
  category: 'Sightseeing' | 'Food' | 'Transit' | 'Activity' | 'Stay' | 'Relaxation';
  cost: number; // 0 for free
  costPerHead?: number;
  isFree?: boolean;
  isAiRerouted?: boolean;
  elevation?: string;
  weatherTag?: string;
  ticketsSynced?: number;
  location?: string;
}

export interface TransitOption {
  id: string;
  mode: 'bus' | 'train' | 'car' | 'flight';
  title: string;
  subtitle: string;
  totalCost: number;
  duration: string;
  isBestMatch?: boolean;
  badge?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  phone: string;
  photo: string;
  authProvider: 'email' | 'google' | 'phone';
  isLoggedIn: boolean;
  preferredLanguage: string;
  homeCity: string;
  tripStyle: 'Budget Backpacker' | 'Balanced Explorer' | 'Cultural Seeker' | 'Comfort Trekker';
  foodPreference: 'Strict Vegetarian' | 'Vegetarian & Egg' | 'Non-Vegetarian' | 'Jain (No Root Veg)' | 'Vegan';
  accessibility: 'None Required' | 'Wheelchair Friendly' | 'Low Slope & Handrails' | 'Senior Friendly';
  savedPlaces: string[];
  savedTripsCount: number;
  completedTripsCount: number;
  medicalId: {
    bloodGroup: string;
    allergies: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    isOrganDonor: boolean;
  };
  notifications: {
    weatherAlerts: boolean;
    budgetThresholds: boolean;
    tatkalPings: boolean;
    convoyRelays: boolean;
  };
}

export interface DestinationCard {
  id: string;
  title: string;
  subtitle: string;
  state: string;
  image: string;
  rating: number;
  dailyBudget: number;
  bestSeason: string;
  duration: string;
  weather: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  tags: string[];
  isMonsoonPick?: boolean;
  isEcoCertified?: boolean;
  // Detailed info
  overview?: string;
  topAttractions?: string[];
  localFoodSpecialties?: string[];
  culturalEtiquette?: string[];
  safetyNotes?: string[];
}

export interface TripBudgetAllocation {
  transport: number;
  stays: number;
  food: number;
  experiences: number;
  safetyBuffer: number;
}

export interface ActiveTrip {
  id: string;
  title: string;
  subtitle: string;
  origin: string;
  destination: string;
  routeStops?: string[];
  travelPace?: 'Relaxed' | 'Balanced' | 'Fast-Paced';
  groupType?: 'Solo' | 'Couple' | 'Friends' | 'Family' | 'College Batch';
  daysTotal: number;
  currentDay: number;
  travellersCount: number;
  totalBudget: number;
  spentBudget: number;
  remainingBuffer: number;
  burnVelocityDaily: number;
  status: 'active' | 'upcoming' | 'completed';
  coverImage: string;
  weather: {
    temp: string;
    condition: string;
    rainProbability: string;
    dryWindowUntil: string;
  };
  allocations: TripBudgetAllocation;
  members: TravellerMember[];
  expenses: Expense[];
  settlements: Settlement[];
  itinerary: ItineraryActivity[];
}

export type ActiveTab = 'home' | 'trips' | 'plan' | 'explore' | 'expenses' | 'itinerary' | 'map3d' | 'livenav' | 'sos' | 'profile';
