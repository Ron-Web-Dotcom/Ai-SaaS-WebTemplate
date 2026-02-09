import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { faq } from '../config/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/30 to-gray-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-sm font-medium text-gray-900 mb-6 shadow-lg">
            {faq.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {faq.title}
          </h2>
          <p className="text-xl text-gray-700">
            {faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden hover:border-white/60 transition-all shadow-lg hover:shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/20 transition-all"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-gray-900 text-lg pr-8">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-6 bg-white/10">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4 font-medium">
            {faq.contactText}
          </p>
          <a href={faq.contactHref} className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 text-blue-600 hover:text-blue-700 hover:bg-white/30 font-medium rounded-xl transition-all shadow-lg hover:shadow-xl">
            {faq.contactLinkText}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
