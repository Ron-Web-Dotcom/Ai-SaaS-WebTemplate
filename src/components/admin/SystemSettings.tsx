import { useState, useEffect } from 'react';
import { Save, Settings, CreditCard, Bell, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface PaymentMethod {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  enabled: boolean;
}

export default function SystemSettings() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('name');

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePaymentMethod = async (id: string, enabled: boolean) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('payment_methods')
        .update({ enabled })
        .eq('id', id);

      if (error) throw error;

      await supabase
        .from('admin_activity_log')
        .insert({
          admin_id: user?.id,
          action: 'update_payment_method',
          target_type: 'payment_method',
          target_id: id,
          details: { enabled },
        });

      setPaymentMethods(prev =>
        prev.map(pm => pm.id === id ? { ...pm, enabled } : pm)
      );

      setMessage('Payment method updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating payment method:', error);
      setMessage('Failed to update payment method');
    } finally {
      setSaving(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <p className="text-sm text-gray-600">Enable or disable payment options for users</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {method.display_name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {method.description || 'No description'}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      onChange={(e) => togglePaymentMethod(method.id, e.target.checked)}
                      disabled={saving}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
                <p className="text-sm text-gray-600">Configure general application settings</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trial Period (Days)
                </label>
                <input
                  type="number"
                  defaultValue={14}
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Default trial period for new users
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  defaultValue="AI SaaS Platform"
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@example.com"
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                <p className="text-sm text-gray-600">Manage system notifications and alerts</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">New User Registration</p>
                  <p className="text-xs text-gray-500">Get notified when new users sign up</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Failures</p>
                  <p className="text-xs text-gray-500">Get notified when payments fail</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">Trial Expiring Soon</p>
                  <p className="text-xs text-gray-500">Get notified when trials are expiring</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Notifications
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-600">Configure security and access controls</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">Require Email Verification</p>
                  <p className="text-xs text-gray-500">Users must verify email before access</p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">Enable Two-Factor Auth</p>
                  <p className="text-xs text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">Session Timeout</p>
                  <p className="text-xs text-gray-500">Auto-logout after 30 minutes of inactivity</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}