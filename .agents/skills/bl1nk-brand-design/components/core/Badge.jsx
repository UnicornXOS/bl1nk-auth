import React from 'react';

const VARIANTS = {
  default:     { background: 'var(--primary)',    color: 'var(--primary-foreground)',    border: 'none' },
  secondary:   { background: 'var(--secondary)',  color: 'var(--secondary-foreground)',  border: 'none' },
  destructive: { background: 'rgba(239,68,68,0.12)', color: 'var(--destructive)',        border: 'none' },
  outline:     { background: 'transparent',       color: 'var(--foreground)',            border: '1px solid var(--border)' },
};

export function Badge({ variant = 'default', style, children, ...props }) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20px',
        padding: '0 8px',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        flexShrink: 0,
        gap: '4px',
        overflow: 'hidden',
        transition: 'all 150ms ease',
        ...v,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
