import { useState } from 'react';
import { ArrowRight, Zap, Shield, Layers } from 'lucide-react';
import VideoModal from './VideoModal';

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
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
      <section id="product" className="relative py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 via-blue-50/30 to-cyan-50/20 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/20 to-transparent blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-transparent blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2.5 bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold mb-10 shadow-lg">
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
                className="group relative bg-white/25 backdrop-blur-xl rounded-3xl p-10 border border-white/40 hover:border-white/60 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-7xl font-extrabold text-white/20 group-hover:text-blue-500/20 transition-colors">
                  {step.number}
                </div>

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-8 shadow-xl shadow-blue-600/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-600/40 transition-all duration-300 border border-white/20">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-4xl p-12 lg:p-16 text-white overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-cyan-600/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-display-sm sm:text-display-md font-extrabold">
                See it in action
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Watch how leading companies use Nexus AI to transform their operations and drive measurable results.
              </p>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] font-bold text-lg group"
              >
                <span>Watch Demo Video</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="w-full aspect-video bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center group hover:scale-[1.03] transition-transform duration-500 shadow-xl cursor-pointer"
              >
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/30 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <div className="w-0 h-0 border-l-[18px] border-l-white border-y-[12px] border-y-transparent ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
