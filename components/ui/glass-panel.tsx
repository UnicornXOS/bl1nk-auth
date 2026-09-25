import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface GlassPanelProps extends ComponentPropsWithoutRef<"div"> {
  tone?: "dark" | "light";
  children?: ReactNode;
}

/**
 * GlassPanel — signature liquid glass panel for bl1nk brand design system.
 * Features smoked/frosted backdrop blur (20px), specular rim light, and layered inset shadows.
 */
export function GlassPanel({ tone = "dark", className = "", children, ...props }: GlassPanelProps) {
  const cls = tone === "light" ? "glass-light" : "glass";
  return (
    <div
      data-slot="glass-panel"
      data-tone={tone}
      className={`${cls}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
