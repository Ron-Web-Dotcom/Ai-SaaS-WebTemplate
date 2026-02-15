import { X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { validateEmail as validateEmailUtil } from '../utils/emailValidation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup' | 'forgot-password' | 'reset-password';
  onSwitchMode: () => void;
}

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResetCode, setShowResetCode] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [emailValidation, setEmailValidation] = useState<{ valid: boolean; message: string } | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

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
    setResetCode('');
    setError('');
    setSuccess('');
    setShowResetCode(false);
    setEmailValidation(null);
    setEmailTouched(false);
    onClose();
  };

  const handleSwitchMode = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setResetCode('');
    setError('');
    setSuccess('');
    setShowResetCode(false);
    setEmailValidation(null);
    setEmailTouched(false);
    onSwitchMode();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.length > 0) {
      const validation = validateEmailUtil(value);
      setEmailValidation(validation);
    } else {
      setEmailValidation(null);
    }
  };

  const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true, message: '' };
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationResult = validateEmailUtil(email);
    if (!emailValidationResult.valid) {
      setError(emailValidationResult.message);
      setEmailValidation(emailValidationResult);
      return;
    }

    if (currentMode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        setError(passwordValidation.message);
        return;
      }
    }

    if (currentMode === 'signin' && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (currentMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            setError('This email is already in use. Please sign in or use a different email.');
          } else {
            throw error;
          }
          setLoading(false);
          return;
        }

        setSuccess('Account created successfully! You can now sign in.');
        setTimeout(() => {
          handleSwitchMode();
        }, 2000);
      } else if (currentMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please try again.');
          } else {
            throw error;
          }
          setLoading(false);
          return;
        }

        setSuccess('Signed in successfully!');
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else if (currentMode === 'forgot-password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;

        setSuccess('Password reset link sent to your email!');
        setShowResetCode(true);
      } else if (currentMode === 'reset-password') {
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
          setError(passwordValidation.message);
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.updateUser({
          password: password,
        });

        if (error) throw error;

        setSuccess('Password updated successfully! Please sign in.');
        setTimeout(() => {
          setCurrentMode('signin');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          setError('This email is already in use. Please sign in with your password or try a different account.');
        } else {
          throw error;
        }
        setLoading(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      if (errorMessage.includes('already registered') || errorMessage.includes('already exists')) {
        setError('This email is already in use. Please sign in with your password or try a different account.');
      } else {
        setError(errorMessage);
      }
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
            currentMode === 'signin'
              ? 'bg-blue-500/20 text-blue-800 border-blue-500/30'
              : currentMode === 'signup'
              ? 'bg-green-500/20 text-green-800 border-green-500/30'
              : 'bg-amber-500/20 text-amber-800 border-amber-500/30'
          }`}>
            {currentMode === 'signin' ? 'Sign In' : currentMode === 'signup' ? 'Create New Account' : 'Reset Password'}
          </div>
          <h2 id="auth-modal-title" className="text-3xl font-bold text-gray-900 mb-2">
            {currentMode === 'signin' ? 'Welcome back' : currentMode === 'signup' ? 'Get started free' : 'Reset your password'}
          </h2>
          <p className="text-gray-700">
            {currentMode === 'signin'
              ? 'Sign in to your account to continue'
              : currentMode === 'signup'
              ? 'Create your account and start building with AI'
              : currentMode === 'forgot-password'
              ? 'Enter your email to receive a password reset link'
              : 'Enter your new password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
                className={`w-full px-4 py-3 pr-10 rounded-xl border bg-white/30 backdrop-blur-xl focus:bg-white/40 focus:ring-2 outline-none transition-all text-gray-900 placeholder-gray-600 ${
                  emailTouched && emailValidation
                    ? emailValidation.valid
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                      : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-white/40 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
                placeholder="you@example.com"
              />
              {emailTouched && emailValidation && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailValidation.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              )}
            </div>
            {emailTouched && emailValidation && !emailValidation.valid && (
              <p className="mt-1 text-xs text-red-700 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{emailValidation.message}</span>
              </p>
            )}
          </div>

          {currentMode !== 'forgot-password' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password
                </label>
                {currentMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setCurrentMode('forgot-password')}
                    className="text-xs text-blue-700 hover:text-blue-900 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl focus:border-blue-500 focus:bg-white/40 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-gray-900 placeholder-gray-600"
                placeholder="••••••••"
                aria-describedby={currentMode === 'signup' || currentMode === 'reset-password' ? 'password-requirements' : undefined}
              />
              {(currentMode === 'signup' || currentMode === 'reset-password') && (
                <p id="password-requirements" className="mt-1 text-xs text-gray-700">
                  At least 6 characters with uppercase, lowercase, and number
                </p>
              )}
            </div>
          )}

          {(currentMode === 'signup' || currentMode === 'reset-password') && (
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
            {loading ? 'Loading...' : currentMode === 'signin' ? 'Sign In' : currentMode === 'signup' ? 'Create Account' : currentMode === 'forgot-password' ? 'Send Reset Link' : 'Update Password'}
          </button>
        </form>

        {currentMode !== 'forgot-password' && currentMode !== 'reset-password' && (
          <div className="mt-6 relative">
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-white/30"></div>
              <span className="flex-shrink mx-4 text-sm text-gray-700">Or continue with</span>
              <div className="flex-grow border-t border-white/30"></div>
            </div>

          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl hover:bg-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-gray-900 font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-xl hover:bg-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Sign in with Apple"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#000000"/>
              </svg>
              <span className="text-gray-900 font-medium">Continue with Apple</span>
            </button>
          </div>
        </div>
        )}

        <div className="mt-6 text-center relative">
          {currentMode === 'forgot-password' ? (
            <button
              onClick={() => setCurrentMode('signin')}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Remember your password? <span className="font-semibold">Sign in</span>
            </button>
          ) : currentMode === 'reset-password' ? (
            <button
              onClick={() => setCurrentMode('signin')}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              Back to <span className="font-semibold">Sign in</span>
            </button>
          ) : (
            <button
              onClick={handleSwitchMode}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {currentMode === 'signin' ? (
                <>
                  Don't have an account? <span className="font-semibold">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="font-semibold">Sign in</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
