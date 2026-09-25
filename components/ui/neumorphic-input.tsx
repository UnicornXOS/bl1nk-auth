import { type ComponentPropsWithoutRef, forwardRef } from "react";

export interface NeumorphicInputProps extends ComponentPropsWithoutRef<"input"> {}

/**
 * NeumorphicInput — soft inset neumorphic text field for bl1nk brand design system.
 * Features dual-direction inset shadows, dark mode adaptation (#2a2d35 bg), and emerald focus ring.
 */
export const NeumorphicInput = forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="neumorphic-input"
        className={`neumorphic-input${className ? ` ${className}` : ""}`}
        {...props}
      />
    );
  },
);

NeumorphicInput.displayName = "NeumorphicInput";
