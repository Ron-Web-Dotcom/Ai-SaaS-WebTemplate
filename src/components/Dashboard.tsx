import { useState, lazy, Suspense } from 'react';
import DashboardLayout from './dashboard/DashboardLayout';
import TrialExpiredModal from './TrialExpiredModal';
import LoadingSpinner from './LoadingSpinner';
import { useTrialStatus } from '../hooks/useTrialStatus';

const DashboardHome = lazy(() => import('./dashboard/DashboardHome'));
const AIChat = lazy(() => import('./dashboard/AIChat'));
const Projects = lazy(() => import('./dashboard/Projects'));
const Analytics = lazy(() => import('./dashboard/Analytics'));
const Settings = lazy(() => import('./dashboard/Settings'));

type View = 'home' | 'chat' | 'projects' | 'analytics' | 'settings';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { isExpired } = useTrialStatus();

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome onViewChange={handleViewChange} />;
      case 'chat':
        return <AIChat />;
      case 'projects':
        return <Projects />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome onViewChange={handleViewChange} />;
    }
  };

  return (
    <>
      <DashboardLayout currentView={currentView} onViewChange={handleViewChange}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" text="Loading..." />
            </div>
          }
        >
          {renderView()}
        </Suspense>
      </DashboardLayout>
      <TrialExpiredModal isOpen={isExpired} />
    </>
  );
}
