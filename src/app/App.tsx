import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CommunityLeaderboard from './components/CommunityLeaderboard';
import MobileDashboard from './components/MobileDashboard';
import MobileCameraView from './components/MobileCameraView';
import MobileTabBar from './components/MobileTabBar';
import InteractiveMap from './components/InteractiveMap';
import RecyclingGuide from './components/RecyclingGuide';
import ProfileView from './components/ProfileView';
import Settings from './components/Settings';
import ChallengesView from './components/ChallengesView';
import DesktopImageUpload from './components/DesktopImageUpload';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [desktopView, setDesktopView] = useState('dashboard');
  const [mobileTab, setMobileTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <div className={`size-full ${theme}`}>
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={`size-full ${theme}`}>
        <div className="size-full bg-background">
          <motion.div
            key={mobileTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="size-full"
          >
            {mobileTab === 'home' && <MobileDashboard />}
            {mobileTab === 'challenges' && (
              <div className="size-full overflow-y-auto pb-20">
                <ChallengesView />
              </div>
            )}
            {mobileTab === 'scan' && <MobileCameraView />}
            {mobileTab === 'map' && (
              <div className="size-full overflow-y-auto pb-20">
                <InteractiveMap />
              </div>
            )}
            {mobileTab === 'profile' && (
              <div className="size-full overflow-y-auto pb-20">
                <ProfileView />
              </div>
            )}
          </motion.div>
          <MobileTabBar activeTab={mobileTab} onTabChange={setMobileTab} />
        </div>
      </div>
    );
  }

  return (
    <div className={`size-full ${theme}`}>
      <div className="size-full bg-background flex">
        <Sidebar activeView={desktopView} onViewChange={setDesktopView} />

        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={desktopView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {desktopView === 'dashboard' && <DashboardView />}
            {desktopView === 'challenges' && <ChallengesView />}
            {desktopView === 'scan' && <DesktopImageUpload />}
            {desktopView === 'community' && <CommunityLeaderboard />}
            {desktopView === 'map' && <InteractiveMap />}
            {desktopView === 'guide' && <RecyclingGuide />}
            {desktopView === 'profile' && <ProfileView />}
            {desktopView === 'settings' && <Settings theme={theme} onThemeChange={setTheme} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}