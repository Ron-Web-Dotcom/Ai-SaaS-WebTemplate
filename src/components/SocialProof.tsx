import { TrendingUp, Users, Zap, Award } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/95 via-blue-900/90 to-gray-900/95 backdrop-blur-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_70%)]" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-xl">
            <Award className="w-4 h-4" />
            Trusted worldwide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for the world's best teams
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300 text-sm">Active Teams</div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Zap className="w-8 h-8 text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5M+</div>
              <div className="text-gray-300 text-sm">Tasks Automated</div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Uptime SLA</div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Award className="w-8 h-8 text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-300 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {['Acme Corp', 'TechFlow', 'DataSync', 'CloudBase', 'NexGen'].map((company) => (
            <div key={company} className="text-xl font-semibold text-white/50 hover:text-white/70 transition-all">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
