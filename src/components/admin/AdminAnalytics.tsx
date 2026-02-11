import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Activity, CreditCard, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  trialUsers: number;
  totalProjects: number;
  totalConversations: number;
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    trialUsers: 0,
    totalProjects: 0,
    totalConversations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchRecentActivity();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [
        { data: profiles },
        { data: subscriptions },
        { data: transactions },
        { data: projects },
        { data: conversations },
      ] = await Promise.all([
        supabase.from('profiles').select('status, created_at'),
        supabase.from('subscriptions').select('status, plan_type'),
        supabase.from('payment_transactions').select('amount, status, created_at'),
        supabase.from('projects').select('id'),
        supabase.from('conversations').select('id'),
      ]);

      const totalUsers = profiles?.length || 0;
      const activeUsers = profiles?.filter(p => p.status === 'active').length || 0;
      const activeSubscriptions = subscriptions?.filter(s => s.status === 'active').length || 0;
      const trialUsers = subscriptions?.filter(s => s.status === 'trial').length || 0;

      const planPrices = {
        starter: 29,
        professional: 99,
        enterprise: 299,
      };

      const monthlyRevenue = subscriptions?.reduce((sum, sub) => {
        if (sub.status === 'active') {
          return sum + (planPrices[sub.plan_type as keyof typeof planPrices] || 0);
        }
        return sum;
      }, 0) || 0;

      const totalRevenue = transactions
        ?.filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;

      setAnalytics({
        totalUsers,
        activeUsers,
        totalRevenue,
        monthlyRevenue,
        activeSubscriptions,
        trialUsers,
        totalProjects: projects?.length || 0,
        totalConversations: conversations?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_activity_log')
        .select(`
          *,
          profiles!admin_activity_log_admin_id_fkey (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentActivity(data || []);
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
        <p className="text-gray-600">Key metrics and system performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{analytics.totalUsers}</span>
          </div>
          <h3 className="text-sm font-medium opacity-90">Total Users</h3>
          <p className="text-xs opacity-75 mt-1">{analytics.activeUsers} active</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-medium opacity-90">Total Revenue</h3>
          <p className="text-xs opacity-75 mt-1">All time</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">${analytics.monthlyRevenue.toLocaleString()}</span>
          </div>
          <h3 className="text-sm font-medium opacity-90">Monthly Revenue</h3>
          <p className="text-xs opacity-75 mt-1">MRR</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{analytics.activeSubscriptions}</span>
          </div>
          <h3 className="text-sm font-medium opacity-90">Active Subscriptions</h3>
          <p className="text-xs opacity-75 mt-1">{analytics.trialUsers} on trial</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Usage Statistics</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Projects</p>
                  <p className="text-xs text-gray-500">Active projects</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">{analytics.totalProjects}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Conversations</p>
                  <p className="text-xs text-gray-500">AI interactions</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">{analytics.totalConversations}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Active Rate</p>
                  <p className="text-xs text-gray-500">User engagement</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {analytics.totalUsers > 0
                  ? Math.round((analytics.activeUsers / analytics.totalUsers) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Admin Activity</h2>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">
                      {activity.profiles?.full_name || activity.profiles?.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {activity.action.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-gray-900">
            {analytics.totalUsers > 0
              ? Math.round((analytics.activeSubscriptions / analytics.totalUsers) * 100)
              : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Trial to paid conversion</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Avg. Revenue Per User</h3>
          <p className="text-3xl font-bold text-gray-900">
            ${analytics.activeSubscriptions > 0
              ? Math.round(analytics.monthlyRevenue / analytics.activeSubscriptions)
              : 0}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Trial Users</h3>
          <p className="text-3xl font-bold text-gray-900">{analytics.trialUsers}</p>
          <p className="text-xs text-gray-500 mt-1">Currently on trial</p>
        </div>
      </div>
    </div>
  );
}