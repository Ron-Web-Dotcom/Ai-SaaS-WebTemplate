import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onSwitchMode: () => void;
}

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleFocusTrap);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    onClose();
  };

  const handleSwitchMode = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    onSwitchMode();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccess('Account created successfully! You can now sign in.');
        setTimeout(() => {
          handleSwitchMode();
        }, 2000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSuccess('Signed in successfully!');
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-gray-900/95 backdrop-blur-2xl" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div ref={modalRef} className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scaleIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-all border border-transparent hover:border-white/30 z-10 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-700 group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
        </button>

        <div className="mb-8 relative">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 backdrop-blur-xl border ${
            mode === 'signin'
              ? 'bg-blue-500/20 text-blue-800 border-blue-500/30'
              : 'bg-green-500/20 text-green-800 border-green-500/30'
          }`}>
            {mode === 'signin' ? 'Sign In' : 'Create New Account'}
          </div>
          <h2 id="auth-modal-title" className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'signin' ? 'Welcome back' : 'Get started free'}
          </h2>
          <p className="text-gray-700">
            {mode === 'signin'
              ? 'Sign in to your account to continue'
              : 'Create your account and start building with AI'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl focus:border-blue-500 focus:bg-white/40 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl focus:border-blue-500 focus:bg-white/40 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-600"
              placeholder="••••••••"
              aria-describedby={mode === 'signup' ? 'password-requirements' : undefined}
            />
            {mode === 'signup' && (
              <p id="password-requirements" className="mt-1 text-xs text-gray-700">At least 6 characters</p>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl focus:border-blue-500 focus:bg-white/40 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl text-sm text-red-900 shadow-lg">
              {error}
            </div>
          )}

          {success && (
            <div role="alert" className="p-3 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl text-sm text-green-900 shadow-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-white/20 hover:shadow-2xl"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center relative">
          <button
            onClick={handleSwitchMode}
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            {mode === 'signin' ? (
              <>
                Don't have an account? <span className="font-semibold">Sign up</span>
              </>
            ) : (
              <>
                Already have an account? <span className="font-semibold">Sign in</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
