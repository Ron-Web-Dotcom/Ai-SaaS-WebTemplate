import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';
import { brand, navigation, cta } from '../config/content';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { openSignIn, openSignUp } = useAuthModal();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-2xl sticky top-0 z-50 border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <a href="#hero" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-tight hover:from-blue-500 hover:to-cyan-500 transition-all">
              {brand.name}
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navigation.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 transition-all duration-200 text-sm font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-gray-700 text-sm px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl font-medium border border-white/30 shadow-lg">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/20 border border-transparent hover:border-white/30"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openSignIn}
                  className="text-gray-600 hover:text-gray-900 transition-all text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 border border-transparent hover:border-white/30"
                >
                  Sign in
                </button>
                <button
                  onClick={openSignUp}
                  className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 text-sm font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-white/20"
                >
                  <span className="relative z-10">{cta.getStarted}</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/20 transition-all active:scale-95 border border-transparent hover:border-white/30"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="lg:hidden py-6 space-y-4 animate-fade-in">
            {navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block text-gray-700 hover:text-gray-900 transition-colors text-base font-semibold py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/20 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 text-sm px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-medium border border-white/30">
                    <User className="w-4 h-4" aria-hidden="true" />
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-semibold w-full py-2"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={openSignIn}
                    className="block w-full text-left text-gray-700 hover:text-gray-900 transition-colors text-base font-semibold py-2"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={openSignUp}
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all text-base font-semibold shadow-xl border border-white/20"
                  >
                    {cta.getStarted}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
