import { ArrowRight, Zap, Shield, Layers } from 'lucide-react';

const steps = [
  {
    icon: Layers,
    number: '01',
    title: 'Connect',
    description: 'Integrate your data sources and tools in minutes with our pre-built connectors.'
  },
  {
    icon: Zap,
    number: '02',
    title: 'Train',
    description: 'Our AI learns your business context, patterns, and unique requirements automatically.'
  },
  {
    icon: Shield,
    number: '03',
    title: 'Deploy',
    description: 'Roll out intelligent workflows across your organization with enterprise security.'
  }
];

export default function ProductExplainer() {
  return (
    <section id="product" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2.5 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-10 shadow-medium">
            <span>How it works</span>
          </div>
          <h2 className="text-display-md sm:text-display-lg font-extrabold text-gray-900 mb-6 leading-tight">
            From setup to success
            <br />
            in three steps
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-10 border border-gray-200/60 hover:border-gray-300 hover:shadow-xlarge transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-7xl font-extrabold text-gray-100 group-hover:text-blue-50 transition-colors">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-8 shadow-large shadow-blue-600/25 group-hover:scale-110 group-hover:shadow-xlarge group-hover:shadow-blue-600/30 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-4xl p-12 lg:p-16 text-white relative overflow-hidden shadow-xlarge">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-cyan-600/20 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-display-sm sm:text-display-md font-extrabold">
                See it in action
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Watch how leading companies use Nexus AI to transform their operations and drive measurable results.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-xlarge hover:shadow-white/25 hover:scale-[1.02] font-bold text-lg group"
              >
                <span>Watch Demo Video</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center group hover:scale-[1.03] transition-transform duration-500 shadow-large">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                  <div className="w-0 h-0 border-l-[18px] border-l-white border-y-[12px] border-y-transparent ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
