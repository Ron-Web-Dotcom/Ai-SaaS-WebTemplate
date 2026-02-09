import { Check, Zap } from 'lucide-react';

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
  return (
    <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            Pricing
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Plans that scale
            <br />
            with your ambition
          </h2>
          <p className="text-xl text-gray-600">
            Start free. Upgrade when you're ready. No surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-10 ${
                plan.popular
                  ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 scale-105 ring-4 ring-gray-900/10'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl'
              } transition-all duration-500`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
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
                    <span className={`text-lg ${plan.popular ? 'text-gray-400' : 'text-gray-600'}`}>
                      /month
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ${plan.popular ? 'bg-blue-500' : 'bg-gray-900'} flex items-center justify-center mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-600">
            All plans include 14-day free trial
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
