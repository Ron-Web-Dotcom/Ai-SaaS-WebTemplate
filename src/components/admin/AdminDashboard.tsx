import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import UserManagement from './UserManagement';
import SubscriptionManagement from './SubscriptionManagement';
import AdminAnalytics from './AdminAnalytics';
import PaymentHistory from './PaymentHistory';
import SystemSettings from './SystemSettings';

type AdminView = 'overview' | 'users' | 'subscriptions' | 'analytics' | 'payments' | 'settings';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, admin_role, status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data?.is_admin && data?.status === 'active') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'payments':
        return <PaymentHistory />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminAnalytics />;
    }
  };

  return (
    <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </AdminLayout>
  );
}