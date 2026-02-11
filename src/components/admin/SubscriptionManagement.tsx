import React, { useState, useEffect } from 'react';
import { Search, CreditCard, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Subscription {
  id: string;
  user_id: string;
  plan_type: string;
  status: string;
  payment_method: string | null;
  trial_ends_at: string | null;
  current_period_end: string | null;
  created_at: string;
  profiles: {
    email: string;
    full_name: string | null;
  };
}

export default function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    trial: 0,
    canceled: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchSubscriptions();
    calculateStats();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          profiles (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('plan_type, status');

      if (error) throw error;

      const total = data?.length || 0;
      const active = data?.filter(s => s.status === 'active').length || 0;
      const trial = data?.filter(s => s.status === 'trial').length || 0;
      const canceled = data?.filter(s => s.status === 'canceled').length || 0;

      const planPrices = {
        starter: 29,
        professional: 99,
        enterprise: 299,
      };

      const revenue = data?.reduce((sum, sub) => {
        if (sub.status === 'active') {
          return sum + (planPrices[sub.plan_type as keyof typeof planPrices] || 0);
        }
        return sum;
      }, 0) || 0;

      setStats({ total, active, trial, canceled, revenue });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const updateSubscriptionStatus = async (subId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: newStatus })
        .eq('id', subId);

      if (error) throw error;
      await fetchSubscriptions();
      await calculateStats();
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch =
      sub.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || sub.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      trial: 'bg-blue-100 text-blue-800',
      canceled: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
      past_due: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.active}`}>
        {status}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const styles = {
      free: 'bg-gray-100 text-gray-800',
      starter: 'bg-blue-100 text-blue-800',
      professional: 'bg-purple-100 text-purple-800',
      enterprise: 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[plan as keyof typeof styles] || styles.free}`}>
        {plan}
      </span>
    );
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Monitor and manage all user subscriptions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Subscriptions</span>
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">On Trial</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.trial}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Canceled</span>
            <CreditCard className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.canceled}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">MRR</span>
            <DollarSign className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-600">${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by user email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="canceled">Canceled</option>
              <option value="past_due">Past Due</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period End
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {sub.profiles?.full_name || 'No name'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {sub.profiles?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlanBadge(sub.plan_type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(sub.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 capitalize">
                      {sub.payment_method || 'None'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {sub.current_period_end
                        ? new Date(sub.current_period_end).toLocaleDateString()
                        : sub.trial_ends_at
                        ? `Trial: ${new Date(sub.trial_ends_at).toLocaleDateString()}`
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={sub.status}
                      onChange={(e) => updateSubscriptionStatus(sub.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="trial">Trial</option>
                      <option value="active">Active</option>
                      <option value="past_due">Past Due</option>
                      <option value="canceled">Canceled</option>
                      <option value="expired">Expired</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
          </p>
        </div>
      </div>
    </div>
  );
}