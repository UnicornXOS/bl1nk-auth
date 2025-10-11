'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
  size?: 'icon' | 'default';
};

const baseStyle: CSSProperties = {
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease, color 0.2s ease',
  fontSize: '14px'
};

function resolveStyle(variant: ButtonProps['variant'], size: ButtonProps['size']): CSSProperties {
  const style: CSSProperties = { ...baseStyle };
  if (variant === 'outline') {
    style.background = '#FFFFFF';
    style.color = '#1D4ED8';
    style.border = '1px solid rgba(59, 130, 246, 0.35)';
  } else {
    style.background = '#2563EB';
    style.color = '#FFFFFF';
  }
  if (size === 'icon') {
    style.width = '44px';
    style.height = '44px';
    style.borderRadius = '999px';
    style.padding = '0';
  } else {
    style.borderRadius = '12px';
    style.padding = '12px 20px';
  }
  return style;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'default', style, ...props },
  ref
) {
  const resolved = resolveStyle(variant, size);
  return <button ref={ref} style={{ ...resolved, ...style }} {...props} />;
});

export default Button;
