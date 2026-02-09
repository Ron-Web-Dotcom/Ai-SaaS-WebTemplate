export default function Benefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-blue-50/30 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-white space-y-2 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  <div className="relative">
                    <div className="text-3xl font-bold">5 min</div>
                    <div className="text-white/80 text-sm">Setup Time</div>
                  </div>
                </div>
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 space-y-2 shadow-xl">
                  <div className="text-3xl font-bold text-gray-900">$0</div>
                  <div className="text-gray-700 text-sm">To Start</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 space-y-2 shadow-xl">
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-700 text-sm">Support</div>
                </div>
                <div className="relative bg-gradient-to-br from-cyan-500/90 to-cyan-600/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-white space-y-2 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  <div className="relative">
                    <div className="text-3xl font-bold">150+</div>
                    <div className="text-white/80 text-sm">Integrations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Why Teams Choose Nexus AI
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                We're not just another AI tool. We're your competitive advantage.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Vendor Lock-In
                  </h3>
                  <p className="text-gray-700">
                    Export your data anytime. Switch models freely. Your infrastructure, your rules.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Transparent Pricing
                  </h3>
                  <p className="text-gray-700">
                    No surprises. Predictable costs. Scale up or down without penalties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Built for Compliance
                  </h3>
                  <p className="text-gray-700">
                    GDPR, HIPAA, SOC 2 ready out of the box. Enterprise security without enterprise complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
