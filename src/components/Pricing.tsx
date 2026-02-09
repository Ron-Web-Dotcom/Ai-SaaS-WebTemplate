import { Check, Zap } from 'lucide-react';
import { useAuthModal } from '../contexts/AuthModalContext';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for individuals and small teams',
    features: [
      '10,000 API calls/month',
      '5 team members',
      'Basic analytics',
      'Email support',
      'Standard models',
      'Community access'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: '199',
    description: 'For growing businesses',
    features: [
      '100,000 API calls/month',
      'Unlimited team members',
      'Advanced analytics',
      'Priority support',
      'All AI models',
      'Custom integrations',
      'API access',
      'SSO authentication'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
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
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  const { openSignUp } = useAuthModal();

  const handleCtaClick = (ctaText: string) => {
    if (ctaText === 'Contact Sales') {
      window.location.href = 'mailto:sales@nexusai.com?subject=Enterprise Inquiry';
    } else {
      openSignUp();
    }
  };

  return (
    <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/30 via-cyan-50/20 to-gray-50 relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            Pricing
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Plans that scale
            <br />
            with your ambition
          </h2>
          <p className="text-xl text-gray-700">
            Start free. Upgrade when you're ready. No surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-10 ${
                plan.popular
                  ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-2 border-white/30 text-white shadow-2xl scale-105'
                  : 'bg-white/30 backdrop-blur-xl border-2 border-white/40 hover:border-white/60 hover:shadow-xl'
              } transition-all duration-500`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-700'} mb-6`}>
                  {plan.description}
                </p>

                {plan.price === 'Custom' ? (
                  <div className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    Custom
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-gray-300' : 'text-gray-700'}`}>
                      /month
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${plan.popular ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-600 to-cyan-600'} flex items-center justify-center mt-0.5 shadow-lg`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-gray-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCtaClick(plan.cta)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-xl border border-white/20'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-xl hover:shadow-2xl border border-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-700 font-medium">
            All plans include 14-day free trial
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-full shadow-lg">
              <Check className="w-4 h-4 text-green-600" />
              No credit card required
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-full shadow-lg">
              <Check className="w-4 h-4 text-green-600" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-full shadow-lg">
              <Check className="w-4 h-4 text-green-600" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
