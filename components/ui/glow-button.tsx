"use client";

import type React from "react";
import { type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

export interface GlowButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "solid" | "glass" | "outline";
  size?: "sm" | "default" | "lg";
  children?: ReactNode;
}

const SIZES = {
  sm: { height: "36px", padding: "0 16px", fontSize: "0.8125rem" },
  default: { height: "44px", padding: "0 24px", fontSize: "0.875rem" },
  lg: { height: "52px", padding: "0 32px", fontSize: "1rem" },
};

/**
 * GlowButton — spring-animated glow button for bl1nk brand design system.
 * Features emerald #34d399 glow shadow, sheen sweep animation, and spring scale transforms.
 */
export function GlowButton({
  variant = "solid",
  size = "default",
  disabled = false,
  className = "",
  style,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}: GlowButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [sheening, setSheening] = useState(false);

  const sz = SIZES[size] || SIZES.default;

  const variantStyle = {
    solid: {
      background: "#34d399",
      color: "#0a0a0a",
      border: "none",
      boxShadow: hovered
        ? "0 10px 30px -6px rgba(52,211,153,0.65)"
        : "0 4px 14px -4px rgba(52,211,153,0.45)",
    },
    glass: {
      background:
        "radial-gradient(ellipse 130% 90% at 50% 0%, rgba(10,12,20,0.63) 0%, rgba(10,12,20,0.55) 45%, rgba(10,12,20,0.50) 100%)",
      backdropFilter: "blur(20px) saturate(140%)",
      WebkitBackdropFilter: "blur(20px) saturate(140%)",
      color: "#34d399",
      border: "none",
      boxShadow: hovered
        ? "0 8px 24px -8px rgba(52,211,153,0.50), inset 0 0 0 1px rgba(255,255,255,0.10)"
        : "inset 0 0 0 1px rgba(255,255,255,0.07)",
    },
    outline: {
      background: hovered ? "rgba(52,211,153,0.08)" : "transparent",
      color: "#34d399",
      border: "1px solid rgba(52,211,153,0.40)",
      boxShadow: hovered ? "0 8px 24px -8px rgba(52,211,153,0.5)" : "none",
    },
  }[variant];

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "14px",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    whiteSpace: "nowrap",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    userSelect: "none",
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
    transform: pressed ? "scale(0.97)" : hovered ? "scale(1.025)" : "scale(1)",
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    ...variantStyle,
    ...style,
  };

  const sheenStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "33%",
    background:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
    animation: sheening ? "bl1nk-sheen 0.7s ease-in-out forwards" : "none",
    pointerEvents: "none",
  };

  return (
    <button
      disabled={disabled}
      data-slot="glow-button"
      data-variant={variant}
      className={className}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          setHovered(true);
          setSheening(false);
          requestAnimationFrame(() => setSheening(true));
          setTimeout(() => setSheening(false), 720);
        }
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        setPressed(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setPressed(false);
        onMouseUp?.(e);
      }}
      {...props}
    >
      <span aria-hidden="true" style={sheenStyle} />
      <span
        style={{
          position: "relative",
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {children}
      </span>
    </button>
  );
}
