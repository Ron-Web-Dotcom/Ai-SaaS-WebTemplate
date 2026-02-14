import { useState, useEffect, ReactNode } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search,
  Bell,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface DashboardLayoutProps {
  children: ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function DashboardLayout({ children, currentView, onViewChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('profiles')
        .select('is_admin, status')
        .eq('id', user.id)
        .maybeSingle();

      if (data?.is_admin && data?.status === 'active') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'home' },
    { name: 'AI Chat', icon: MessageSquare, view: 'chat' },
    { name: 'Projects', icon: FolderKanban, view: 'projects' },
    { name: 'Analytics', icon: BarChart3, view: 'analytics' },
    { name: 'Settings', icon: Settings, view: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-cyan-50/10">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all border border-transparent hover:border-white/30 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 hover:bg-white/20 rounded-xl transition-all border border-transparent hover:border-white/30"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900 hidden sm:inline">NexusAI</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-gray-700 bg-white/20 hover:bg-white/30 rounded-xl transition-all border border-white/30 backdrop-blur-xl"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline px-2 py-0.5 text-xs bg-white/30 rounded border border-white/30">⌘K</kbd>
            </button>

            <button className="relative p-2 hover:bg-white/20 rounded-xl transition-all border border-transparent hover:border-white/30">
              <Bell size={20} className="text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full shadow-lg"></span>
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-white/20">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                {user?.email?.[0].toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 bg-white/10 backdrop-blur-2xl border-r border-white/20 transition-all duration-300 shadow-xl ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-0 lg:translate-x-0'
        } overflow-hidden`}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.name}
                onClick={() => {
                  onViewChange(item.view);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl border border-white/20'
                    : 'text-gray-700 hover:bg-white/20 hover:text-gray-900 border border-transparent hover:border-white/30'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/20">
            {isAdmin && (
              <a
                href="?admin=true"
                className="w-full flex items-center gap-3 px-4 py-3 mb-2 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all border border-purple-200"
              >
                <Shield size={20} />
                <span className="font-medium">Admin Panel</span>
              </a>
            )}
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-500/10 hover:text-red-600 rounded-xl transition-all border border-transparent hover:border-red-500/30"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-white/80 mb-3">
                Unlock unlimited AI conversations and advanced features
              </p>
              <button
                onClick={() => {
                  window.location.href = '/#pricing';
                }}
                className="w-full py-2 bg-white/20 backdrop-blur-xl text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-all border border-white/30"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Command Palette */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-xl px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="max-w-2xl mx-auto mt-16 sm:mt-24 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-gray-700" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-600"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="text-xs font-semibold text-gray-700 px-3 py-2">Recent</div>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onViewChange(item.view);
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/20 rounded-xl transition-all border border-transparent hover:border-white/30"
                >
                  <item.icon size={18} className="text-gray-700" />
                  <span className="text-sm text-gray-900">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
