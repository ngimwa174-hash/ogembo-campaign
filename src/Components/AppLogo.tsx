import React from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
}

export default function AppLogo({ size = 36, className = '' }: AppLogoProps) {
  return (
    <img
      src="/images/icon.svg"
      alt="Innocent Ogembo campaign logo"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    />
  );
}