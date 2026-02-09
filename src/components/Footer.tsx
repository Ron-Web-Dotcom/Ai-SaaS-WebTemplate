import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { brand, social, footer } from '../config/content';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 inline-block">
              {brand.name}
            </a>
            <p className="text-gray-400 text-sm mb-6">
              {footer.tagline}
            </p>
            <div className="flex gap-4">
              <a href={social.twitter} className="hover:text-blue-400 transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href={social.linkedin} className="hover:text-blue-400 transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href={social.github} className="hover:text-blue-400 transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href={social.youtube} className="hover:text-blue-400 transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footer.sections.map((section, index) => (
            <nav key={index} aria-label={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-blue-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            {footer.copyright}
          </p>
          <div className="flex gap-6 text-sm">
            {footer.sections[3]?.links.slice(0, 3).map((link, index) => (
              <a key={index} href={link.href} className="hover:text-blue-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
