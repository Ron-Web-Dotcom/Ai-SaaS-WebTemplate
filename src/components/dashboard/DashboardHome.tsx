import { useEffect, useState } from 'react';
import {
  TrendingUp,
  MessageSquare,
  FolderKanban,
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  Brain,
  Target
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Stats {
  totalConversations: number;
  totalProjects: number;
  tokensUsed: number;
  activeToday: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalConversations: 0,
    totalProjects: 0,
    tokensUsed: 0,
    activeToday: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const [conversationsRes, projectsRes, usageRes] = await Promise.all([
        supabase.from('conversations').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('projects').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('usage_tracking').select('tokens_used').eq('user_id', user.id)
      ]);

      const totalTokens = usageRes.data?.reduce((sum, item) => sum + item.tokens_used, 0) || 0;

      setStats({
        totalConversations: conversationsRes.count || 0,
        totalProjects: projectsRes.count || 0,
        tokensUsed: totalTokens,
        activeToday: 0
      });

      const { data: conversations } = await supabase
        .from('conversations')
        .select('id, title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (conversations) {
        setRecentActivity(
          conversations.map(conv => ({
            id: conv.id,
            type: 'conversation',
            title: conv.title,
            timestamp: conv.created_at
          }))
        );
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'AI Conversations',
      value: stats.totalConversations,
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Projects',
      value: stats.totalProjects,
      icon: FolderKanban,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600'
    },
    {
      title: 'Tokens Used',
      value: stats.tokensUsed.toLocaleString(),
      icon: Zap,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      title: 'Active Today',
      value: stats.activeToday,
      icon: Clock,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    }
  ];

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin a new conversation with AI',
      icon: MessageSquare,
      color: 'from-blue-600 to-indigo-600',
      action: 'chat'
    },
    {
      title: 'Create Project',
      description: 'Start a new AI-powered project',
      icon: FolderKanban,
      color: 'from-violet-600 to-purple-600',
      action: 'projects'
    },
    {
      title: 'View Analytics',
      description: 'See your usage insights',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
      action: 'analytics'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-blue-100 mt-1">Ready to create something amazing with AI?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              <TrendingUp size={16} className="text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target size={24} className="text-blue-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="group bg-white rounded-xl p-6 border border-slate-200/50 hover:shadow-xl hover:scale-105 transition-all text-left"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${action.color} rounded-xl mb-4`}>
                <action.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4">{action.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                Get started
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock size={24} className="text-blue-600" />
            Recent Activity
          </h2>
          <div className="bg-white rounded-xl border border-slate-200/50 overflow-hidden">
            {recentActivity.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-4"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MessageSquare size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{activity.title}</div>
                      <div className="text-sm text-slate-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                  <Brain size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-600">No recent activity yet</p>
                <p className="text-sm text-slate-500 mt-1">Start a conversation to get going!</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Tips */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles size={24} className="text-blue-600" />
            AI Tips
          </h2>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Brain size={16} />
              </div>
              <span className="font-semibold">Pro Tip</span>
            </div>
            <p className="text-sm text-slate-300 mb-4">
              Use specific, detailed prompts to get the best results from AI. The more context you provide, the better the response!
            </p>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Learn more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
