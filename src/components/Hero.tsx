import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuthModal } from '../contexts/AuthModalContext';
import { hero, cta } from '../config/content';

export default function Hero() {
  const { openSignUp } = useAuthModal();

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto w-full py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-medium shadow-blue-600/25 hover:shadow-large hover:shadow-blue-600/30 transition-all duration-300">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{hero.badge}</span>
            </div>

            <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl font-extrabold text-gray-900 tracking-tight">
              {hero.headline}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={openSignUp}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-gray-900 text-white px-10 py-5 rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:shadow-xlarge hover:shadow-gray-900/25 hover:scale-[1.02] font-semibold text-lg"
              >
                <span>{cta.primary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </button>
              <div className="flex flex-wrap gap-3 text-xs text-gray-600 sm:pl-2">
                {hero.trustBadges.map((badge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full font-medium shadow-soft hover:shadow-medium hover:border-gray-300 transition-all duration-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[650px] hidden lg:block" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-4xl blur-3xl" />
            <div className="relative h-full flex flex-col gap-5 p-8">
              <div className="bg-white rounded-3xl border border-gray-200/60 shadow-large p-8 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-xlarge backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-soft" />
                  <div className="flex-1">
                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5" />
                    <div className="h-2 bg-gray-100 rounded-full w-20" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-full shadow-inner-soft" />
                  <div className="h-3 bg-gray-100 rounded-full w-5/6" />
                  <div className="h-3 bg-gray-100 rounded-full w-4/6" />
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-large p-7 ml-auto transform rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-xlarge max-w-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-glow-blue" />
                    <div className="h-2.5 bg-gray-200 rounded-full flex-1" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-glow-blue" />
                    <div className="h-2.5 bg-gray-200 rounded-full flex-1" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-glow-cyan" />
                    <div className="h-2.5 bg-gray-200 rounded-full flex-1" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl shadow-xlarge shadow-blue-600/30 p-8 text-white transform hover:scale-[1.03] transition-all duration-500 hover:shadow-glow-blue">
                <div className="text-5xl font-extrabold mb-3 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent">94%</div>
                <div className="text-blue-50 text-base font-medium">Faster decisions with AI insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
