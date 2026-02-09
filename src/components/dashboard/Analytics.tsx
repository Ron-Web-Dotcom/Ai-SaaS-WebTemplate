import { useEffect, useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Zap,
  MessageSquare,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface UsageData {
  date: string;
  tokens: number;
  conversations: number;
}

export default function Analytics() {
  const { user } = useAuth();
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalConversations, setTotalConversations] = useState(0);
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    loadAnalytics();
  }, [user, timeRange]);

  const loadAnalytics = async () => {
    if (!user) return;

    setLoading(true);

    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);

    const [usageRes, conversationsRes] = await Promise.all([
      supabase
        .from('usage_tracking')
        .select('tokens_used, created_at')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString()),
      supabase
        .from('conversations')
        .select('id, created_at')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
    ]);

    const totalTokensUsed = usageRes.data?.reduce((sum, item) => sum + item.tokens_used, 0) || 0;
    setTotalTokens(totalTokensUsed);
    setTotalConversations(conversationsRes.count || 0);

    const dataByDate = new Map<string, { tokens: number; conversations: number }>();

    for (let i = 0; i < daysAgo; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dataByDate.set(dateStr, { tokens: 0, conversations: 0 });
    }

    usageRes.data?.forEach(item => {
      const dateStr = item.created_at.split('T')[0];
      const existing = dataByDate.get(dateStr);
      if (existing) {
        existing.tokens += item.tokens_used;
      }
    });

    conversationsRes.data?.forEach(item => {
      const dateStr = item.created_at.split('T')[0];
      const existing = dataByDate.get(dateStr);
      if (existing) {
        existing.conversations += 1;
      }
    });

    const chartData = Array.from(dataByDate.entries())
      .map(([date, data]) => ({
        date,
        tokens: data.tokens,
        conversations: data.conversations
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setUsageData(chartData);
    setLoading(false);
  };

  const maxTokens = Math.max(...usageData.map(d => d.tokens), 1);
  const maxConversations = Math.max(...usageData.map(d => d.conversations), 1);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-600">Track your AI usage and insights</p>
        </div>

        <div className="flex gap-2 bg-white rounded-xl border border-slate-200 p-1">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600">Loading analytics...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Zap size={24} className="text-blue-600" />
                </div>
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {totalTokens.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Tokens Used</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-violet-50 rounded-xl">
                  <MessageSquare size={24} className="text-violet-600" />
                </div>
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {totalConversations}
              </div>
              <div className="text-sm text-slate-600">Total Conversations</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Activity size={24} className="text-emerald-600" />
                </div>
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {totalConversations > 0 ? Math.round(totalTokens / totalConversations) : 0}
              </div>
              <div className="text-sm text-slate-600">Avg Tokens per Chat</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tokens Usage Chart */}
            <div className="bg-white rounded-xl border border-slate-200/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Token Usage</h3>
                  <p className="text-sm text-slate-500">Daily token consumption</p>
                </div>
              </div>
              <div className="space-y-3">
                {usageData.slice(-14).map((data, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-xs text-slate-500 w-20">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full flex items-center justify-end px-3 transition-all duration-500"
                        style={{ width: `${(data.tokens / maxTokens) * 100}%` }}
                      >
                        {data.tokens > 0 && (
                          <span className="text-xs font-medium text-white">
                            {data.tokens}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversations Chart */}
            <div className="bg-white rounded-xl border border-slate-200/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-50 rounded-lg">
                  <MessageSquare size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Conversations</h3>
                  <p className="text-sm text-slate-500">Daily conversation count</p>
                </div>
              </div>
              <div className="space-y-3">
                {usageData.slice(-14).map((data, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-xs text-slate-500 w-20">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-purple-600 h-full rounded-full flex items-center justify-end px-3 transition-all duration-500"
                        style={{ width: `${(data.conversations / maxConversations) * 100}%` }}
                      >
                        {data.conversations > 0 && (
                          <span className="text-xs font-medium text-white">
                            {data.conversations}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Insights */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <PieChart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Usage Insights</h3>
                <p className="text-blue-100">Your AI consumption patterns</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {usageData.length > 0 ? Math.round(totalTokens / usageData.length) : 0}
                </div>
                <div className="text-sm text-blue-100">Avg Daily Tokens</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {usageData.filter(d => d.conversations > 0).length}
                </div>
                <div className="text-sm text-blue-100">Active Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {Math.max(...usageData.map(d => d.tokens), 0)}
                </div>
                <div className="text-sm text-blue-100">Peak Daily Usage</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
