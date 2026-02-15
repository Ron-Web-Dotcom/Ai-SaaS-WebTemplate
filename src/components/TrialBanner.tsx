import { Clock, ArrowRight } from 'lucide-react';
import { useTrialStatus } from '../hooks/useTrialStatus';

interface TrialBannerProps {
  onUpgradeClick: () => void;
}

export default function TrialBanner({ onUpgradeClick }: TrialBannerProps) {
  const { daysRemaining, subscriptionStatus } = useTrialStatus();

  if (subscriptionStatus !== 'trial') return null;

  const isUrgent = daysRemaining <= 3;

  return (
    <div
      className={`mb-6 rounded-2xl p-6 ${
        isUrgent
          ? 'bg-gradient-to-r from-orange-500/90 to-red-500/90 border-2 border-orange-300'
          : 'bg-gradient-to-r from-blue-500/90 to-cyan-500/90 border-2 border-blue-300'
      } text-white shadow-xl backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {isUrgent ? 'Trial Ending Soon!' : 'Free Trial Active'}
            </h3>
            <p className="text-white/90 text-sm">
              {daysRemaining === 0 ? (
                'Your trial ends today'
              ) : daysRemaining === 1 ? (
                '1 day remaining in your trial'
              ) : (
                `${daysRemaining} days remaining in your trial`
              )}
            </p>
          </div>
        </div>
        <button
          onClick={onUpgradeClick}
          className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
        >
          Upgrade to Enterprise
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
