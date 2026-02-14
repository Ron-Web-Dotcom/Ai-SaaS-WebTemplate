import { useState } from 'react';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';
import AIChat from './dashboard/AIChat';
import Projects from './dashboard/Projects';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';

type View = 'home' | 'chat' | 'projects' | 'analytics' | 'settings';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<View>('home');

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
    <DashboardLayout currentView={currentView} onViewChange={handleViewChange}>
      {renderView()}
    </DashboardLayout>
  );
}
