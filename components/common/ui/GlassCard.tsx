import type { JSX, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = false,
}: GlassCardProps): JSX.Element {
  return (
    <div
      className={`
        deep-glass p-6 
        ${hoverEffect ? "transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-user-terminal),0.2)] hover:border-user-terminal/30" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
