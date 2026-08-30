import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base rounded-[10px]',
    md: 'w-11 h-11 text-xl rounded-[14px]',
    lg: 'w-14 h-14 text-2xl rounded-[18px]',
    xl: 'w-20 h-20 text-4xl rounded-[24px]'
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center font-black select-none shrink-0 bg-gradient-to-b from-[#1cd29b] to-[#08b783] text-white shadow-md shadow-emerald-500/20 tracking-normal ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.35)'
      }}
    >
      <span className="font-extrabold transform -translate-y-[0.5px] leading-none">
        С
      </span>
    </div>
  );
};
