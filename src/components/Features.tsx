import { Brain, Shield, Workflow, Sparkles, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI Models',
    description: 'Leverage GPT-4, Claude, and custom models trained on your data for unmatched accuracy and context awareness.',
    color: 'blue'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with end-to-end encryption, SSO, and granular access controls for peace of mind.',
    color: 'cyan'
  },
  {
    icon: Workflow,
    title: 'Seamless Automation',
    description: 'Build sophisticated workflows with our visual builder. No code required, infinite possibilities.',
    color: 'blue'
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'AI-powered recommendations that learn from your patterns and continuously improve over time.',
    color: 'cyan'
  },
  {
    icon: Clock,
    title: 'Real-Time Processing',
    description: 'Process millions of requests per second with sub-100ms latency across our global infrastructure.',
    color: 'blue'
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Comprehensive insights with custom dashboards, exportable reports, and predictive analytics.',
    color: 'cyan'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            Platform
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Built for teams who refuse to compromise between power and simplicity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isBlue = feature.color === 'blue';

            return (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${isBlue ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gradient-to-br from-cyan-600 to-cyan-700'} rounded-2xl mb-6 shadow-lg ${isBlue ? 'shadow-blue-600/20' : 'shadow-cyan-600/20'} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className={`mt-6 h-1 w-12 ${isBlue ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-cyan-600 to-blue-600'} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
