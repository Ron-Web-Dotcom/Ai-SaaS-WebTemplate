import React, { useState, useEffect } from 'react';
import { X, Check, CreditCard, Wallet, Bitcoin, Building2, AlertCircle, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PaymentMethod {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  enabled: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan;
}

export default function PaymentCheckoutModal({
  isOpen,
  onClose,
  selectedPlan,
}: PaymentCheckoutModalProps) {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchPaymentMethods();
    }
  }, [isOpen]);

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('enabled', true)
        .order('name');

      if (error) throw error;
      setPaymentMethods(data || []);
      if (data && data.length > 0) {
        setSelectedMethod(data[0].name);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case 'CreditCard':
        return CreditCard;
      case 'Wallet':
        return Wallet;
      case 'Bitcoin':
        return Bitcoin;
      case 'Building2':
        return Building2;
      default:
        return CreditCard;
    }
  };

  const handlePayment = async () => {
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const method = paymentMethods.find(m => m.name === selectedMethod);
      if (!method) throw new Error('Invalid payment method');

      switch (selectedMethod) {
        case 'stripe':
          await handleStripePayment();
          break;
        case 'paypal':
          await handlePayPalPayment();
          break;
        case 'crypto':
          await handleCryptoPayment();
          break;
        case 'bank_transfer':
          await handleBankTransfer();
          break;
        default:
          throw new Error('Unsupported payment method');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handleStripePayment = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: selectedPlan.name.toLowerCase(),
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Stripe payment error:', error);
      throw error;
    }
  };

  const handlePayPalPayment = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-paypal-payment`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: selectedPlan.name.toLowerCase(),
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('No PayPal approval URL received');
      }
    } catch (error: any) {
      console.error('PayPal payment error:', error);
      throw error;
    }
  };

  const handleCryptoPayment = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-crypto-payment`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: selectedPlan.name.toLowerCase(),
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('No crypto payment URL received');
      }
    } catch (error: any) {
      console.error('Crypto payment error:', error);
      throw error;
    }
  };

  const handleBankTransfer = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-bank-transfer`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: selectedPlan.name.toLowerCase(),
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      alert(`Bank Transfer Instructions:\n\n${data.instructions}\n\nReference: ${data.reference}`);
      onClose();
    } catch (error: any) {
      console.error('Bank transfer error:', error);
      throw error;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h2>
              <p className="text-sm text-gray-600 mt-1">Choose your payment method</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
                <span className="text-2xl font-bold text-blue-600">${selectedPlan.price}/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{selectedPlan.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {selectedPlan.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = getIconComponent(method.icon);
                  const isSelected = selectedMethod === method.name;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.name)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isSelected ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-medium ${
                            isSelected ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {method.display_name}
                          </p>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 hover:underline font-medium"
                    type="button"
                  >
                    Terms & Conditions
                  </button>
                  {' '}and understand that my subscription will automatically renew monthly.
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading || !termsAccepted}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Complete Secure Checkout
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your payment information is encrypted and secure. You can cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </>
  );
}

function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Terms & Conditions</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <h4 className="font-semibold text-gray-900 mb-2">1. Subscription Terms</h4>
            <p className="text-gray-600 mb-4">
              By subscribing to our service, you agree to pay the monthly subscription fee for your
              selected plan. Your subscription will automatically renew each month unless cancelled.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">2. Free Trial</h4>
            <p className="text-gray-600 mb-4">
              New users receive a 14-day free trial. You will not be charged during the trial period.
              You can cancel anytime during the trial without charge.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">3. Payment & Billing</h4>
            <p className="text-gray-600 mb-4">
              Payment is processed securely through our payment providers. You authorize us to charge
              your selected payment method on a recurring monthly basis. All fees are in USD.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">4. Cancellation</h4>
            <p className="text-gray-600 mb-4">
              You may cancel your subscription at any time. Upon cancellation, you will continue to
              have access until the end of your current billing period. No refunds for partial months.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">5. Data & Privacy</h4>
            <p className="text-gray-600 mb-4">
              We respect your privacy and protect your data according to our Privacy Policy. Your
              payment information is never stored on our servers.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">6. Service Availability</h4>
            <p className="text-gray-600 mb-4">
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We are
              not liable for any losses due to service interruptions.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">7. Changes to Terms</h4>
            <p className="text-gray-600 mb-4">
              We may update these terms at any time. Continued use of the service after changes
              constitutes acceptance of the new terms.
            </p>

            <p className="text-sm text-gray-500 mt-6">
              Last updated: {new Date().toLocaleDateString()}<br />
              Version 1.0
            </p>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}