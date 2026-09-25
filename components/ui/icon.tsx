import type { ComponentPropsWithoutRef } from "react";

export interface IconProps extends ComponentPropsWithoutRef<"span"> {
  name: string;
  size?: number | string;
}

/**
 * Icon — Material Icons wrapper for bl1nk brand design system.
 * Usage: `<Icon name="dashboard" size={20} />`
 */
export function Icon({ name, size = 20, className = "", style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-icons inline-block select-none leading-none ${className}`}
      style={{
        fontSize: typeof size === "number" ? `${size}px` : size,
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
}
