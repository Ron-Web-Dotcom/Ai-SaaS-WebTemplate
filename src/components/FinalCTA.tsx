import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuthModal } from '../contexts/AuthModalContext';
import { finalCta, brand } from '../config/content';

export default function FinalCTA() {
  const { openSignUp } = useAuthModal();

  return (
    <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-cyan-600/30 to-blue-600/30 blur-3xl animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold mb-10 shadow-large">
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
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-gray-900 px-12 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-xlarge hover:shadow-white/25 hover:scale-[1.02] font-bold text-lg"
          >
            <span>{finalCta.primaryCta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </button>
          <a
            href={`mailto:${brand.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-2xl border-2 border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 font-bold text-lg"
          >
            {finalCta.secondaryCta}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-glow-blue" aria-hidden="true" />
            <span className="font-medium">Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-glow-blue" aria-hidden="true" />
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-glow-blue" aria-hidden="true" />
            <span className="font-medium">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
