import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { FooterNav } from './components/FooterNav';
import { MainScreen } from './components/MainScreen';
import { CulturalScreen } from './components/CulturalScreen';
import { HeritageScreen } from './components/HeritageScreen';
import { SoloTravellerPage } from './components/SoloTravellerPage';
import { GroupTravellerPage } from './components/GroupTravellerPage';
import { ReportScreen } from './components/ReportScreen';
import { MapsAndCalendarScreen } from './components/MapsAndCalendarScreen';
import { SosScreen } from './components/SosScreen';
import { LoginModal } from './components/LoginModal';
import { DatabaseModal } from './components/DatabaseModal';
import { HeritageSite } from './data/heritageSites';
import { AppTab } from './types/navigation';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedHeritageSiteId, setSelectedHeritageSiteId] = useState<number | undefined>(undefined);
  const [selectedCulturalRegionId, setSelectedCulturalRegionId] = useState<string | undefined>(undefined);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSiteFromMap = (site: HeritageSite) => {
    setSelectedHeritageSiteId(site.id);
    setActiveTab('heritage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegion = (regionId: string) => {
    setSelectedCulturalRegionId(regionId);
    setActiveTab('culture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] flex flex-col font-sans selection:bg-[#B05B3B] selection:text-white">
      {/* Top Navigation Bar with Traveler Mode Dropdown & Login/Logout & Database Hub */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={handleNavigate}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenDatabaseModal={() => setIsDatabaseModalOpen(true)}
      />

      {/* Main Content Area - Full Scrollable Viewport */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeTab === 'home' && (
          <MainScreen
            onNavigate={handleNavigate}
            onOpenSiteDetails={handleSelectSiteFromMap}
          />
        )}

        {activeTab === 'solo-traveler' && (
          <SoloTravellerPage
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'group-traveler' && (
          <GroupTravellerPage
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'culture' && (
          <CulturalScreen
            initialRegionId={selectedCulturalRegionId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'heritage' && (
          <HeritageScreen
            initialSiteId={selectedHeritageSiteId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'maps-calendar' && (
          <MapsAndCalendarScreen
            onNavigateHome={() => handleNavigate('home')}
            onOpenSiteDetails={handleSelectSiteFromMap}
          />
        )}

        {activeTab === 'report' && (
          <ReportScreen
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'sos' && (
          <SosScreen
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation: Home, Culture, Heritage, Map & Cal, Report, and SOS (in red) */}
      <FooterNav
        currentTab={activeTab}
        onSelectTab={handleNavigate}
      />

      {/* Login & Registration Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Database & Supabase Gateway Modal */}
      <DatabaseModal
        isOpen={isDatabaseModalOpen}
        onClose={() => setIsDatabaseModalOpen(false)}
      />
    </div>
  );
}
