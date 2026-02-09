import { Sparkles, ArrowRight } from 'lucide-react';
import { announcement } from '../config/content';

export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 text-white py-3.5 px-6 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" aria-hidden="true" />
        <span className="font-semibold">{announcement.text}</span>
        <a
          href={announcement.linkHref}
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-all duration-200 group font-semibold"
          aria-label="Explore new features"
        >
          <span>{announcement.linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
