import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Nexus AI transformed how we handle customer support. Response times dropped by 85% and satisfaction scores are at an all-time high.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "TechFlow Inc",
    image: "SC"
  },
  {
    quote: "The ROI was clear within the first month. We're processing 10x more data with the same team size. It's like having an army of expert analysts.",
    author: "Michael Rodriguez",
    role: "Head of Data",
    company: "DataSync Corp",
    image: "MR"
  },
  {
    quote: "Finally, an AI platform that actually delivers on its promises. Setup was painless, integration was seamless, and results were immediate.",
    author: "Emily Watson",
    role: "CTO",
    company: "CloudBase",
    image: "EW"
  },
  {
    quote: "We evaluated 12 different solutions. Nexus AI was the only one that met our security requirements while being easy enough for non-technical teams to use.",
    author: "David Kim",
    role: "Director of Engineering",
    company: "SecureNet",
    image: "DK"
  },
  {
    quote: "The custom model training capabilities are incredible. We went from generic responses to highly specific, brand-aligned outputs in days.",
    author: "Lisa Thompson",
    role: "Marketing Director",
    company: "BrandFlow",
    image: "LT"
  },
  {
    quote: "Support has been phenomenal. They don't just answer questions, they help us optimize our entire AI strategy. True partners.",
    author: "James Park",
    role: "CEO",
    company: "StartupXYZ",
    image: "JP"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            What people say
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Don't take our word for it
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-lg text-gray-600">
              <span className="font-bold text-gray-900">4.9/5</span> from 2,000+ reviews
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
