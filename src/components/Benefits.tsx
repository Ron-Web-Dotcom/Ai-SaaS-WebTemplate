export default function Benefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white space-y-2">
                  <div className="text-3xl font-bold">5 min</div>
                  <div className="text-blue-100 text-sm">Setup Time</div>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 space-y-2">
                  <div className="text-3xl font-bold text-gray-900">$0</div>
                  <div className="text-gray-600 text-sm">To Start</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-100 rounded-2xl p-6 space-y-2">
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white space-y-2">
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-cyan-100 text-sm">Integrations</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Why Teams Choose Nexus AI
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're not just another AI tool. We're your competitive advantage.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Vendor Lock-In
                  </h3>
                  <p className="text-gray-600">
                    Export your data anytime. Switch models freely. Your infrastructure, your rules.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Transparent Pricing
                  </h3>
                  <p className="text-gray-600">
                    No surprises. Predictable costs. Scale up or down without penalties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Built for Compliance
                  </h3>
                  <p className="text-gray-600">
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
