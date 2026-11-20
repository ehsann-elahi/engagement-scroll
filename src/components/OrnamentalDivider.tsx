import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
  light?: boolean;
}

export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({ className = '', light = false }) => {
  const color = light ? '#C6A56B' : '#C6A56B';
  const lineColor = light ? 'bg-[#C6A56B]/40' : 'bg-[#C6A56B]/30';

  return (
    <div className={`flex items-center justify-center space-x-4 my-6 ${className}`} aria-hidden="true">
      <span className={`h-px w-12 sm:w-24 ${lineColor}`} />
      
      {/* Delicate floral rosette / star ornament */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold-champagne transition-transform duration-700 hover:rotate-90">
        <path
          d="M12 2L13.5 8.5L20 10L14.5 13.5L16 20L12 16L8 20L9.5 13.5L4 10L10.5 8.5L12 2Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="12" r="2" fill={color} />
      </svg>
      
      <span className={`h-px w-12 sm:w-24 ${lineColor}`} />
    </div>
  );
};
