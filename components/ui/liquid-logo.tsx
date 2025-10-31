import type { JSX } from 'react';

export default function LiquidLogo(): JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
      <span className="text-xl font-bold">bl1nk</span>
    </div>
  );
}