import React from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AskTravelMateModal } from './components/AskTravelMateModal';
import { LogExpenseModal } from './components/LogExpenseModal';
import { PlayStoreHubModal } from './components/PlayStoreHubModal';
import { NativeEmulatorWrapper } from './components/NativeEmulatorWrapper';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { PlanTripView } from './views/PlanTripView';
import { ItineraryView } from './views/ItineraryView';
import { ExpensesView } from './views/ExpensesView';
import { Terrain3DView } from './views/Terrain3DView';
import { LiveNavView } from './views/LiveNavView';
import { SosView } from './views/SosView';
import { ExploreView } from './views/ExploreView';
import { ProfileView } from './views/ProfileView';

const MainContent: React.FC = () => {
  const { activeTab, isPlayStoreHubOpen, setIsPlayStoreHubOpen } = useTrip();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'plan':
        return <PlanTripView />;
      case 'itinerary':
      case 'trips':
        return <ItineraryView />;
      case 'expenses':
        return <ExpensesView />;
      case 'map3d':
        return <Terrain3DView />;
      case 'livenav':
        return <LiveNavView />;
      case 'sos':
        return <SosView />;
      case 'explore':
        return <ExploreView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Your India AI Travel OS';
      case 'plan':
        return 'Algorithmic Trip Planner';
      case 'itinerary':
      case 'trips':
        return 'Western Ghats Itinerary';
      case 'expenses':
        return 'Live Group Ledger & UPI';
      case 'map3d':
        return '3D Topo Elevation HUD';
      case 'livenav':
        return 'Live AR Turn-By-Turn Nav';
      case 'sos':
        return 'Tactical Emergency & SOS';
      case 'explore':
        return 'Explore India Destinations';
      case 'profile':
        return 'Traveler Profile & Settings';
      default:
        return 'Your India AI Travel OS';
    }
  };

  return (
    <NativeEmulatorWrapper>
      <div className="min-h-screen bg-[#091326] text-[#d9e2fd] font-sans antialiased selection:bg-[#4d8eff] selection:text-[#00285d] flex flex-col relative w-full">
        {/* Fixed Header */}
        <Header title={getHeaderTitle()} showBack={activeTab !== 'home'} />

        {/* Main View Area */}
        <main className="pt-16 max-w-[600px] w-full mx-auto min-h-screen flex flex-col flex-1">
          {renderView()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Modals & Overlays */}
        <AskTravelMateModal />
        <LogExpenseModal />
        <PlayStoreHubModal isOpen={isPlayStoreHubOpen} onClose={() => setIsPlayStoreHubOpen(false)} />
        <Toast />
      </div>
    </NativeEmulatorWrapper>
  );
};

export default function App() {
  return (
    <TripProvider>
      <MainContent />
    </TripProvider>
  );
}
