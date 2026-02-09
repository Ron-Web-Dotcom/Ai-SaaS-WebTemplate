import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { faq } from '../config/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-cyan-50 rounded-full text-sm font-medium text-cyan-900 mb-6">
            {faq.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {faq.title}
          </h2>
          <p className="text-xl text-gray-600">
            {faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
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
                    <Plus className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {faq.contactText}
          </p>
          <a href={faq.contactHref} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            {faq.contactLinkText}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
