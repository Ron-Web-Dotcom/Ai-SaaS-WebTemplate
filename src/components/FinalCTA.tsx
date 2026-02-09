import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuthModal } from '../contexts/AuthModalContext';
import { finalCta, brand } from '../config/content';

export default function FinalCTA() {
  const { openSignUp } = useAuthModal();

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-gray-900/95 backdrop-blur-2xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.2),_transparent_50%)]" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-600/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-10 shadow-xl">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>{finalCta.badge}</span>
        </div>

        <h2 className="text-display-md sm:text-display-lg lg:text-display-xl font-extrabold text-white mb-8 leading-tight">
          {finalCta.title}
        </h2>

        <p className="text-xl sm:text-2xl text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed">
          {finalCta.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-12">
          <button
            onClick={openSignUp}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-12 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] font-bold text-lg"
          >
            <span>{finalCta.primaryCta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </button>
          <a
            href={`mailto:${brand.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/5 backdrop-blur-xl text-white px-12 py-5 rounded-2xl border border-white/30 hover:bg-white/10 hover:border-white/40 transition-all duration-300 font-bold text-lg shadow-xl"
          >
            {finalCta.secondaryCta}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-gray-300">
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" aria-hidden="true" />
            <span className="font-medium">Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" aria-hidden="true" />
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50" aria-hidden="true" />
            <span className="font-medium">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
