import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

type Strength = 'empty' | 'weak' | 'medium' | 'strong';

const calculateStrength = (password: string): Strength => {
  if (!password) return 'empty';

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

const config: Record<Strength, { label: string; color: string; width: string }> = {
  empty: { label: '', color: 'bg-gray-200', width: '0%' },
  weak: { label: 'Weak', color: 'bg-error-500', width: '33%' },
  medium: { label: 'Medium', color: 'bg-accent-500', width: '66%' },
  strong: { label: 'Strong', color: 'bg-success-500', width: '100%' },
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = calculateStrength(password);
  const cfg = config[strength];

  if (strength === 'empty') return null;

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${cfg.color} transition-all duration-300 rounded-full`}
            style={{ width: cfg.width }}
          ></div>
        </div>
        <span
          className={`text-xs font-medium ${
            strength === 'weak'
              ? 'text-error-700'
              : strength === 'medium'
              ? 'text-accent-700'
              : 'text-success-700'
          }`}
        >
          {cfg.label}
        </span>
      </div>
      {strength === 'weak' && (
        <p className="text-xs text-gray-500 mt-1">
          Try adding uppercase letters, numbers, and symbols.
        </p>
      )}
    </div>
  );
};
