import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

export const ProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, showToast, setActiveTab, trip, savedTrips } = useTrip();

  const [activeSection, setActiveSection] = useState<'preferences' | 'trips' | 'medical' | 'account'>('preferences');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authMethod, setAuthMethod] = useState<'google' | 'email' | 'phone'>('google');
  const [authInput, setAuthInput] = useState('');

  const languages = ['English', 'Hindi', 'Malayalam', 'Kannada', 'Tamil', 'Marathi', 'Bengali'];
  const cities = ['Bengaluru, Karnataka', 'Mumbai, Maharashtra', 'Delhi NCR', 'Chennai, Tamil Nadu', 'Kochi, Kerala', 'Hyderabad, Telangana', 'Pune, Maharashtra'];
  const tripStyles = ['Budget Backpacker', 'Balanced Explorer', 'Cultural Seeker', 'Comfort Trekker'] as const;
  const foodPrefs = ['Strict Vegetarian', 'Vegetarian & Egg', 'Non-Vegetarian', 'Jain (No Root Veg)', 'Vegan'] as const;
  const accessibilityOptions = ['None Required', 'Wheelchair Friendly', 'Low Slope & Handrails', 'Senior Friendly'] as const;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ isLoggedIn: true, authProvider: authMethod });
    setShowAuthModal(false);
    showToast(`Logged in successfully via ${authMethod.toUpperCase()}!`);
  };

  return (
    <div className="flex flex-col w-full pb-28 text-[#d9e2fd]">
      {/* Top Banner & Profile Overview */}
      <div className="px-5 pt-4 pb-4 bg-[#121b2f] border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={userProfile.photo}
                alt={userProfile.name}
                className="w-16 h-16 rounded-full object-cover ring-3 ring-[#4d8eff] shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#4edea3] ring-2 ring-[#091326]"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-[#d9e2fd] truncate">{userProfile.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#4d8eff]/20 text-[#adc6ff] text-[10px] font-bold border border-[#4d8eff]/30">
                  PRO
                </span>
              </div>
              <span className="text-xs text-[#c2c6d6] truncate">{userProfile.handle} • {userProfile.homeCity.split(',')[0]}</span>
              <span className="text-[11px] text-[#ffb95f] font-semibold mt-0.5">
                {userProfile.completedTripsCount} Trips Completed • 4 Saved
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowAuthModal(true)}
            className="p-2 rounded-xl bg-[#202a3e] hover:bg-[#2b3549] text-[#adc6ff] transition-all text-xs font-bold flex items-center gap-1 border border-white/5"
            title="Account switch"
          >
            <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mt-4 bg-[#161f33] p-1 rounded-xl border border-white/5 text-center">
          <button
            onClick={() => setActiveSection('preferences')}
            className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
              activeSection === 'preferences' ? 'bg-[#4d8eff] text-[#00285d]' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            Travel DNA
          </button>
          <button
            onClick={() => setActiveSection('trips')}
            className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
              activeSection === 'trips' ? 'bg-[#4d8eff] text-[#00285d]' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            My Trips
          </button>
          <button
            onClick={() => setActiveSection('medical')}
            className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
              activeSection === 'medical' ? 'bg-[#4d8eff] text-[#00285d]' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            Medical ID
          </button>
          <button
            onClick={() => setActiveSection('account')}
            className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
              activeSection === 'account' ? 'bg-[#4d8eff] text-[#00285d]' : 'text-[#c2c6d6] hover:text-[#d9e2fd]'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="px-5 mt-4 space-y-4">
        {/* 1. TRAVEL DNA & PREFERENCES */}
        {activeSection === 'preferences' && (
          <div className="space-y-4">
            {/* Preferred Language & Home City */}
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3 shadow-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#ffb95f]">
                Regional & Localization
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-[#c2c6d6]">Preferred Language for Voice & Audio Guides</label>
                <select
                  value={userProfile.preferredLanguage}
                  onChange={e => updateUserProfile({ preferredLanguage: e.target.value })}
                  className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3 py-2.5 rounded-xl border border-white/10 outline-none"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="bg-[#121b2f] text-[#d9e2fd]">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#c2c6d6]">Home / Departure City</label>
                <select
                  value={userProfile.homeCity}
                  onChange={e => updateUserProfile({ homeCity: e.target.value })}
                  className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3 py-2.5 rounded-xl border border-white/10 outline-none"
                >
                  {cities.map(city => (
                    <option key={city} value={city} className="bg-[#121b2f] text-[#d9e2fd]">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel Style */}
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#adc6ff]">
                  Preferred Trip Style
                </h3>
                <span className="text-[10px] text-[#c2c6d6]">Shapes AI Recommendations</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {tripStyles.map(style => (
                  <button
                    key={style}
                    onClick={() => updateUserProfile({ tripStyle: style })}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      userProfile.tripStyle === style
                        ? 'bg-[#4d8eff]/20 border-[#4d8eff] text-[#adc6ff]'
                        : 'bg-[#121b2f] border-white/5 text-[#c2c6d6] hover:bg-[#1a253c]'
                    }`}
                  >
                    <div className="text-xs font-bold">{style}</div>
                    <div className="text-[10px] text-[#8c909f] mt-0.5">
                      {style === 'Budget Backpacker' && 'Hostels, buses, local eateries'}
                      {style === 'Balanced Explorer' && 'Clean homestays, mixed transit'}
                      {style === 'Cultural Seeker' && 'Temples, crafts, heritage tours'}
                      {style === 'Comfort Trekker' && 'Private jeeps, boutique resorts'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Preferences */}
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3 shadow-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4edea3]">
                Dietary & Food Philosophy
              </h3>

              <div className="flex flex-wrap gap-2">
                {foodPrefs.map(food => (
                  <button
                    key={food}
                    onClick={() => updateUserProfile({ foodPreference: food })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      userProfile.foodPreference === food
                        ? 'bg-[#00a572]/20 border-[#4edea3] text-[#4edea3]'
                        : 'bg-[#121b2f] border-white/5 text-[#c2c6d6] hover:bg-[#1a253c]'
                    }`}
                  >
                    {userProfile.foodPreference === food ? '✓ ' : ''}{food}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Preferences */}
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3 shadow-md">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#ffb95f]">
                Accessibility & Mobility Needs
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {accessibilityOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateUserProfile({ accessibility: opt })}
                    className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                      userProfile.accessibility === opt
                        ? 'bg-[#ffb95f]/20 border-[#ffb95f] text-[#ffb95f]'
                        : 'bg-[#121b2f] border-white/5 text-[#c2c6d6] hover:bg-[#1a253c]'
                    }`}
                  >
                    {userProfile.accessibility === opt ? '✓ ' : ''}{opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. MY TRIPS & SAVED */}
        {activeSection === 'trips' && (
          <div className="space-y-4">
            {/* Active Expedition */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#d9e2fd]">Current Active Trip</span>
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
              </div>
              <div
                onClick={() => setActiveTab('itinerary')}
                className="p-4 rounded-2xl bg-[#161f33] border border-[#4edea3]/40 shadow-lg cursor-pointer hover:bg-[#1a253c] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00a572]/20 text-[#4edea3] text-[10px] font-bold">
                    DAY {trip.currentDay} OF {trip.daysTotal}
                  </span>
                  <span className="text-xs font-bold text-[#ffb95f]">₹{trip.spentBudget} spent</span>
                </div>
                <h4 className="text-base font-extrabold text-[#d9e2fd]">{trip.destination}</h4>
                <p className="text-xs text-[#c2c6d6] mt-0.5">{trip.subtitle}</p>
              </div>
            </div>

            {/* Upcoming & Saved Trips */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#d9e2fd]">Upcoming & Planned Trips</span>
              {savedTrips.filter(t => t.id !== trip.id).map(t => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-[#121b2f] border border-white/10 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#d9e2fd]">{t.title}</span>
                    <span className="text-[10px] text-[#c2c6d6]">{t.daysTotal} Days • Budget ₹{t.totalBudget}</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('itinerary');
                      showToast(`Viewing ${t.title}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#adc6ff]"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>

            {/* Saved Places / Wishlist */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#d9e2fd]">Saved Wishlist Places ({userProfile.savedPlaces.length})</span>
                <span className="text-[10px] text-[#ffb95f]">Synced offline</span>
              </div>
              <div className="space-y-2">
                {userProfile.savedPlaces.map((place, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#121b2f] border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">bookmark</span>
                      <span className="text-xs font-medium text-[#d9e2fd]">{place}</span>
                    </div>
                    <button
                      onClick={() => {
                        updateUserProfile({
                          savedPlaces: userProfile.savedPlaces.filter(p => p !== place),
                        });
                        showToast(`Removed "${place}" from wishlist`);
                      }}
                      className="text-[11px] text-[#ffb4ab] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. MEDICAL ID & EMERGENCY SAFETY */}
        {activeSection === 'medical' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#161f33] border border-[#ffb4ab]/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb4ab]">medical_services</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#ffb4ab]">
                    Digital Medical ID Card
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] text-[10px] font-bold">
                  OFFLINE RELAY ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#c2c6d6]">
                This card is accessible by first responders from the emergency lock-screen HUD without unlocking the device.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-[#121b2f] border border-white/5">
                  <span className="text-[10px] text-[#8c909f] block">Blood Group</span>
                  <span className="text-sm font-black text-[#d9e2fd]">{userProfile.medicalId.bloodGroup}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#121b2f] border border-white/5">
                  <span className="text-[10px] text-[#8c909f] block">Organ Donor</span>
                  <span className="text-sm font-bold text-[#4edea3]">
                    {userProfile.medicalId.isOrganDonor ? 'Registered Donor ✓' : 'No'}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#121b2f] border border-white/5">
                <span className="text-[10px] text-[#8c909f] block">Known Allergies / Medications</span>
                <span className="text-xs font-semibold text-[#ffb4ab]">{userProfile.medicalId.allergies}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#121b2f] border border-white/5">
                <span className="text-[10px] text-[#8c909f] block">Primary ICE Contact</span>
                <span className="text-xs font-bold text-[#d9e2fd]">{userProfile.medicalId.emergencyContactName}</span>
                <span className="text-xs text-[#adc6ff] block">{userProfile.medicalId.emergencyContactPhone}</span>
              </div>

              <button
                onClick={() => setActiveTab('sos')}
                className="w-full py-2.5 rounded-xl bg-[#93000a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
                <span>Open Tactical SOS Emergency Center</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. ACCOUNT & NOTIFICATION SETTINGS */}
        {activeSection === 'account' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#d9e2fd]">
                Notification Preferences
              </h3>

              {[
                { key: 'weatherAlerts', label: 'Severe Weather & Monsoon Alerts', sub: 'Microclimate warnings along mountain passes' },
                { key: 'budgetThresholds', label: 'Budget Burn Velocity Warnings', sub: 'Alert when group spending exceeds daily target' },
                { key: 'tatkalPings', label: 'IRCTC Tatkal Booking Alarms', sub: 'Ping 5 minutes prior to 10:00 AM window' },
                { key: 'convoyRelays', label: 'Convoy BLE Mesh Fleet Updates', sub: 'Alert if convoy member drops 500m behind' },
              ].map(item => {
                const isEnabled = userProfile.notifications[item.key as keyof typeof userProfile.notifications];
                return (
                  <div key={item.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex flex-col pr-3">
                      <span className="text-xs font-bold text-[#d9e2fd]">{item.label}</span>
                      <span className="text-[10px] text-[#c2c6d6]">{item.sub}</span>
                    </div>
                    <button
                      onClick={() => {
                        updateUserProfile({
                          notifications: {
                            ...userProfile.notifications,
                            [item.key]: !isEnabled,
                          },
                        });
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                        isEnabled ? 'bg-[#4edea3]' : 'bg-[#2b3549]'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Authentication Management */}
            <div className="p-4 rounded-2xl bg-[#161f33] border border-white/10 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#d9e2fd]">
                Account Security & Provider
              </h3>
              <div className="flex items-center justify-between bg-[#121b2f] p-3 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-[#d9e2fd] block">Logged In via</span>
                  <span className="text-[11px] text-[#4edea3] uppercase font-bold">{userProfile.authProvider}</span>
                  <span className="text-[10px] text-[#c2c6d6] block">{userProfile.email}</span>
                </div>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#202a3e] hover:bg-[#2b3549] text-xs font-bold text-[#adc6ff]"
                >
                  Switch
                </button>
              </div>

              <button
                onClick={() => {
                  updateUserProfile({ isLoggedIn: false });
                  showToast('Signed out of account');
                }}
                className="w-full py-2.5 rounded-xl bg-[#2b3549] hover:bg-[#30394e] text-xs font-bold text-[#ffb4ab] border border-white/5 active:scale-98 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal (Sign in / Sign up) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#161f33] border border-white/10 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#d9e2fd]">
                  {authMode === 'login' ? 'Sign In to YatraIQ' : 'Create YatraIQ Account'}
                </h3>
                <p className="text-xs text-[#c2c6d6]">Sync trips, offline maps & group ledgers</p>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-8 h-8 rounded-full bg-[#202a3e] flex items-center justify-center text-[#c2c6d6]"
              >
                ✕
              </button>
            </div>

            {/* Provider Selectors */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'google', label: 'Google', icon: '🌐' },
                { id: 'email', label: 'Email', icon: '✉️' },
                { id: 'phone', label: 'Mobile', icon: '📱' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setAuthMethod(p.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 ${
                    authMethod === p.id
                      ? 'bg-[#4d8eff]/20 border-[#4d8eff] text-[#adc6ff]'
                      : 'bg-[#121b2f] border-white/5 text-[#c2c6d6]'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMethod === 'google' ? (
                <div className="p-3 bg-[#121b2f] rounded-xl text-center text-xs text-[#c2c6d6] border border-white/5">
                  Sign in instantly with your verified Google account
                </div>
              ) : authMethod === 'email' ? (
                <input
                  type="email"
                  required
                  value={authInput}
                  onChange={e => setAuthInput(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3 py-2.5 rounded-xl border border-white/10 outline-none"
                />
              ) : (
                <input
                  type="tel"
                  required
                  value={authInput}
                  onChange={e => setAuthInput(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#121b2f] text-sm text-[#d9e2fd] px-3 py-2.5 rounded-xl border border-white/10 outline-none"
                />
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#4d8eff] text-[#00285d] font-bold text-sm shadow-md active:scale-98 transition-all"
              >
                Continue with {authMethod.toUpperCase()}
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-xs text-[#adc6ff] hover:underline"
              >
                {authMode === 'login' ? "Don't have an account? Sign Up" : 'Already registered? Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
