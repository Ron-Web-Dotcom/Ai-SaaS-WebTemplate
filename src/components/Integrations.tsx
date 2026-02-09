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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-900 mb-6">
            <Boxes className="w-4 h-4" />
            Integrations
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Connects With Your Stack
          </h2>
          <p className="text-xl text-gray-600">
            Seamlessly integrate with 150+ tools and platforms. API-first architecture for custom connections.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">{integration.name[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{integration.name}</div>
                  <div className="text-xs text-gray-500">{integration.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            View all integrations
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
