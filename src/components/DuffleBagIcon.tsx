import React from 'react';

interface DuffleBagIconProps {
  className?: string;
  size?: number;
  variant?: 'solid' | 'outline' | 'badge';
}

export const DuffleBagIcon: React.FC<DuffleBagIconProps> = ({
  className = 'w-6 h-6',
  size = 24,
  variant = 'solid'
}) => {
  if (variant === 'badge') {
    return (
      <div className={`relative flex items-center justify-center rounded-xl bg-neutral-900 text-amber-400 p-2 shadow-sm border border-neutral-800 ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-400"
        >
          {/* Main duffle body: rounded barrel */}
          <rect x="2" y="8.5" width="20" height="11" rx="4" ry="4" fill="currentColor" fillOpacity="0.18" />
          {/* Main top zipper line */}
          <line x1="4.5" y1="11" x2="19.5" y2="11" />
          {/* Top handle loops */}
          <path d="M7 8.5V5.5C7 4.12 8.12 3 9.5 3H14.5C15.88 3 17 4.12 17 5.5V8.5" />
          {/* Side pocket outline & zipper */}
          <path d="M6 11V18" strokeDasharray="1.5 1.5" />
          <path d="M18 11V18" strokeDasharray="1.5 1.5" />
          {/* Metal D-rings for shoulder strap */}
          <circle cx="3" cy="11" r="1" fill="currentColor" />
          <circle cx="21" cy="11" r="1" fill="currentColor" />
          {/* Handle center leather wrap */}
          <rect x="10" y="3" width="4" height="2.5" rx="0.8" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer duffle cylinder silhouette */}
      <rect x="2" y="8" width="20" height="11.5" rx="3.8" fill="currentColor" fillOpacity="0.15" />
      {/* Main zipper */}
      <line x1="5" y1="10.5" x2="19" y2="10.5" />
      {/* Handle arch */}
      <path d="M7.5 8V5.2C7.5 4 8.5 3 9.7 3H14.3C15.5 3 16.5 4 16.5 5.2V8" />
      {/* Handle grip connector */}
      <rect x="10.2" y="2.8" width="3.6" height="2" rx="0.6" fill="currentColor" />
      {/* Structural side seams */}
      <path d="M6.5 10.5V17.5" strokeOpacity="0.6" />
      <path d="M17.5 10.5V17.5" strokeOpacity="0.6" />
      {/* Shoulder strap attachment D-rings */}
      <circle cx="3" cy="11" r="1" />
      <circle cx="21" cy="11" r="1" />
    </svg>
  );
};
