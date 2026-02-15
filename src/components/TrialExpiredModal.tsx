import { X, AlertTriangle, CreditCard, Mail } from 'lucide-react';
import { useState } from 'react';
import PaymentCheckoutModal from './PaymentCheckoutModal';

interface TrialExpiredModalProps {
  isOpen: boolean;
}

export default function TrialExpiredModal({ isOpen }: TrialExpiredModalProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const enterprisePlan = {
    name: 'Enterprise',
    price: '999',
    description: 'Complete platform access with unlimited features',
    features: [
      'Unlimited API calls',
      'Unlimited team members',
      'Enterprise analytics',
      'Dedicated support',
      'Custom models',
      'On-premise deployment',
      'SLA guarantee',
      'Training & onboarding'
    ],
    cta: 'Upgrade to Enterprise',
    popular: true
  };

  const handleUpgradeClick = () => {
    setShowCheckout(true);
  };

  const handleContactSales = () => {
    window.location.href = 'mailto:sales@nexusai.com?subject=Enterprise Plan Inquiry';
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-lg">
        <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4 shadow-xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Trial Has Ended
            </h2>
            <p className="text-gray-700 text-lg">
              Upgrade to Enterprise to continue accessing all features
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-6 text-white border border-gray-700">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold">$999</span>
              <span className="text-gray-400 text-lg">/month</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Enterprise Plan</h3>
            <p className="text-gray-400 mb-6">
              Complete platform access with unlimited features
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {enterprisePlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpgradeClick}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-xl"
              >
                <CreditCard size={20} />
                Upgrade Now
              </button>
              <button
                onClick={handleContactSales}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <Mail size={20} />
                Contact Sales
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Questions? Contact us at <a href="mailto:support@nexusai.com" className="text-blue-600 hover:underline">support@nexusai.com</a></p>
          </div>
        </div>
      </div>

      {showCheckout && (
        <PaymentCheckoutModal
          isOpen={showCheckout}
          onClose={() => {}}
          selectedPlan={enterprisePlan}
        />
      )}
    </>
  );
}
