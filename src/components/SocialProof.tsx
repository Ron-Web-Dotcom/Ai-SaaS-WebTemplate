import { TrendingUp, Users, Zap, Award } from 'lucide-react';

export default function SocialProof() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-blue-600/20 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Award className="w-4 h-4" />
            Trusted worldwide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for the world's best teams
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400 text-sm">Active Teams</div>
            </div>
          </div>

          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Zap className="w-8 h-8 text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5M+</div>
              <div className="text-gray-400 text-sm">Tasks Automated</div>
            </div>
          </div>

          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime SLA</div>
            </div>
          </div>

          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <Award className="w-8 h-8 text-cyan-400 mb-4" />
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-gray-400 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
          {['Acme Corp', 'TechFlow', 'DataSync', 'CloudBase', 'NexGen'].map((company) => (
            <div key={company} className="text-xl font-semibold text-white">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
