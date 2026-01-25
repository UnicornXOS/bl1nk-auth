import type { JSX } from 'react';

interface LiquidLogoProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function LiquidLogo({
  src = '/logo.svg',
  alt = 'BlinkOS',
  size = 80,
  className = ''
}: LiquidLogoProps): JSX.Element {
  return (
    <div
      className={`backdrop-blur-sm bg-blue-500/10 rounded-2xl p-4 liquid-glass ${className}`}
      style={{ width: size + 32, height: size + 32 }}
    >
      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">bl1nk</span>
      </div>
    </div>
  );
}