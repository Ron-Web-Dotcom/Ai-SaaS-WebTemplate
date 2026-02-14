import { LayoutDashboard, Users, CreditCard, DollarSign, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type AdminView = 'overview' | 'users' | 'subscriptions' | 'analytics' | 'payments' | 'settings';

interface AdminLayoutProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  children: React.ReactNode;
}

export default function AdminLayout({ currentView, onViewChange, children }: AdminLayoutProps) {
  const { signOut } = useAuth();

  const navigation = [
    { id: 'analytics', name: 'Overview', icon: LayoutDashboard },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'payments', name: 'Payment History', icon: DollarSign },
    { id: 'settings', name: 'System Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">System Management</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id as AdminView)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-2">
            <a
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Site
            </a>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}