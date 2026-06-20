import React, { useRef, useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onVerified,
  onCancel,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    // Mock verification — any 6-digit code is accepted in this demo
    onVerified();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="text-primary-600" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Two-Factor Verification</h2>
        <p className="text-sm text-gray-500 mb-6">
          We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span>
        </p>

        {error && (
          <div className="mb-4 bg-error-50 border border-error-500 text-error-700 px-3 py-2 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          ))}
        </div>

        <Button fullWidth onClick={handleVerify}>
          Verify &amp; Continue
        </Button>

        <button
          onClick={onCancel}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel and go back
        </button>

        <p className="text-xs text-gray-400 mt-6">
          This is a demo OTP screen. Enter any 6 digits to continue.
        </p>
      </div>
    </div>
  );
};
