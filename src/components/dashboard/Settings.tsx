import { useState, useEffect } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Save,
  Crown
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: '',
    email: user?.email || '',
    plan: 'free'
  });
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        email: data.email,
        plan: data.plan
      });
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (!error) {
      alert('Profile updated successfully!');
    }

    setSaving(false);
  };

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model for complex tasks' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-3', name: 'Claude 3', description: 'Advanced reasoning and analysis' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl border border-slate-200/50 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Profile</h2>
              <p className="text-sm text-slate-500">Manage your personal information</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* AI Model Preferences */}
        <div className="bg-white rounded-xl border border-slate-200/50 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="p-2 bg-violet-50 rounded-lg">
              <Database size={20} className="text-violet-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">AI Model</h2>
              <p className="text-sm text-slate-500">Choose your preferred AI model</p>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {models.map((model) => (
              <label
                key={model.id}
                className="flex items-start gap-4 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors"
              >
                <input
                  type="radio"
                  name="model"
                  value={model.id}
                  checked={selectedModel === model.id}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{model.name}</div>
                  <div className="text-sm text-slate-600">{model.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-200/50 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Bell size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Notifications</h2>
              <p className="text-sm text-slate-500">Configure how you receive updates</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Email Notifications</div>
                <div className="text-sm text-slate-600">Receive updates via email</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Push Notifications</div>
                <div className="text-sm text-slate-600">Browser push notifications</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Weekly Summary</div>
                <div className="text-sm text-slate-600">Weekly usage reports</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weekly}
                  onChange={(e) => setNotifications({ ...notifications, weekly: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Plan & Billing */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <Crown size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Current Plan: {profile.plan.toUpperCase()}</h2>
                <p className="text-amber-100">
                  {profile.plan === 'free' ? 'Upgrade to unlock unlimited features' : 'You have access to all premium features'}
                </p>
              </div>
            </div>
          </div>

          {profile.plan === 'free' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
              <ul className="space-y-2 text-sm text-amber-100 mb-4">
                <li>• Unlimited AI conversations</li>
                <li>• Access to all AI models</li>
                <li>• Priority support</li>
                <li>• Advanced analytics</li>
              </ul>
              <button className="w-full py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors">
                Upgrade Now - $29/month
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
