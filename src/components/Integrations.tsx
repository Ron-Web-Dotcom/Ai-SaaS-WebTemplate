import { Boxes } from 'lucide-react';

const integrations = [
  { name: 'Slack', category: 'Communication' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'HubSpot', category: 'Marketing' },
  { name: 'Notion', category: 'Productivity' },
  { name: 'GitHub', category: 'Development' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Google Workspace', category: 'Productivity' },
  { name: 'Zendesk', category: 'Support' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'Jira', category: 'Project Management' },
  { name: 'Intercom', category: 'Customer Success' },
  { name: 'PostgreSQL', category: 'Database' }
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-cyan-50/20 to-gray-50 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-sm font-medium text-gray-900 mb-6 shadow-lg">
            <Boxes className="w-4 h-4" />
            Integrations
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Connects With Your Stack
          </h2>
          <p className="text-xl text-gray-700">
            Seamlessly integrate with 150+ tools and platforms. API-first architecture for custom connections.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 p-6 hover:border-white/60 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/30">
                  <span className="text-2xl text-white font-bold">{integration.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{integration.name}</div>
                  <div className="text-xs text-gray-700">{integration.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 text-blue-600 hover:text-blue-700 hover:bg-white/30 font-medium rounded-xl transition-all shadow-lg hover:shadow-xl">
            View all integrations
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
