import { MessageSquare, FileText, Search, Code } from 'lucide-react';

const useCases = [
  {
    icon: MessageSquare,
    title: 'Customer Support',
    description: 'Automate responses, route tickets intelligently, and provide 24/7 support with AI agents that understand context.',
    metrics: '85% faster resolution'
  },
  {
    icon: FileText,
    title: 'Content Generation',
    description: 'Create marketing copy, technical documentation, and personalized content at scale while maintaining brand voice.',
    metrics: '10x content output'
  },
  {
    icon: Search,
    title: 'Knowledge Search',
    description: 'Instantly find information across all your documents, databases, and tools with semantic search and smart summaries.',
    metrics: '90% time saved'
  },
  {
    icon: Code,
    title: 'Code Assistance',
    description: 'Accelerate development with AI pair programming, automated testing, and intelligent code reviews.',
    metrics: '40% faster shipping'
  }
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-cyan-50/30 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
            Use Cases
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Built for every team.
            <br />
            Optimized for yours.
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            From customer support to code reviews, see how teams like yours are using Nexus AI to work smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/25 backdrop-blur-xl rounded-3xl border border-white/40 p-10 hover:border-white/60 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full group-hover:scale-150 transition-transform duration-700" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {useCase.metrics.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-700">
                        {useCase.metrics.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {useCase.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {useCase.description}
                  </p>

                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-500 shadow-lg" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
