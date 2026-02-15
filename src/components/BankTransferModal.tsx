import { X, Copy, Check, Building2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BankDetails {
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  bankName: string;
  bankAddress: string;
}

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  instructions: string;
  amount: number;
  bankDetails: BankDetails;
}

export default function BankTransferModal({
  isOpen,
  onClose,
  reference,
  instructions,
  amount,
  bankDetails,
}: BankTransferModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bank Transfer Instructions</h2>
              <p className="text-sm text-gray-600">Follow these steps to complete your payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Important</h3>
                <p className="text-sm text-blue-800">
                  Please include the reference number below in your bank transfer to ensure your payment is processed correctly.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Transfer Amount</label>
              <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                <div className="text-3xl font-bold text-white">${amount} USD</div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Reference Number</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900">
                  {reference}
                </div>
                <button
                  onClick={() => copyToClipboard(reference, 'reference')}
                  className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                  aria-label="Copy reference number"
                >
                  {copiedField === 'reference' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Bank Account Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Bank Name', value: bankDetails.bankName, field: 'bankName' },
                  { label: 'Account Name', value: bankDetails.accountName, field: 'accountName' },
                  { label: 'Account Number', value: bankDetails.accountNumber, field: 'accountNumber' },
                  { label: 'Routing Number', value: bankDetails.routingNumber, field: 'routingNumber' },
                  { label: 'SWIFT/BIC Code', value: bankDetails.swiftCode, field: 'swiftCode' },
                  { label: 'Bank Address', value: bankDetails.bankAddress, field: 'bankAddress' },
                ].map((item) => (
                  <div key={item.field} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">{item.label}</div>
                      <div className="font-medium text-gray-900">{item.value}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.field)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      aria-label={`Copy ${item.label}`}
                    >
                      {copiedField === item.field ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h4 className="font-semibold text-yellow-900 mb-2">Processing Time</h4>
              <p className="text-sm text-yellow-800">
                Bank transfers typically take 2-3 business days to process. Your subscription will be activated once we receive and verify your payment.
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <p>
                If you have any questions about your payment, please keep this reference number and contact our support team.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            I've Noted the Details
          </button>
        </div>
      </div>
    </div>
  );
}
