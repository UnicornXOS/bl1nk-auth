import React from 'react';

const VARIANTS = {
  default:     { bg: 'var(--primary)',       color: 'var(--primary-foreground)', borderColor: 'transparent' },
  outline:     { bg: 'var(--background)',    color: 'var(--foreground)',          borderColor: 'var(--border)' },
  secondary:   { bg: 'var(--secondary)',     color: 'var(--secondary-foreground)',borderColor: 'transparent' },
  ghost:       { bg: 'transparent',          color: 'var(--foreground)',          borderColor: 'transparent' },
  destructive: { bg: 'transparent',          color: 'var(--destructive)',         borderColor: 'transparent' },
  link:        { bg: 'transparent',          color: 'var(--primary)',             borderColor: 'transparent' },
};

const HOVER = {
  default:     { filter: 'brightness(0.85)' },
  outline:     { bg: 'var(--muted)' },
  secondary:   { filter: 'brightness(0.92)' },
  ghost:       { bg: 'var(--muted)' },
  destructive: { bg: 'rgba(239,68,68,0.12)' },
  link:        { textDecoration: 'underline' },
};

const SIZES = {
  default:  { height: '32px', padding: '0 10px',  fontSize: 'var(--text-base)', borderRadius: 'var(--radius)' },
  xs:       { height: '24px', padding: '0 8px',   fontSize: 'var(--text-xs)',  borderRadius: 'var(--radius-sm)' },
  sm:       { height: '28px', padding: '0 10px',  fontSize: 'var(--text-sm)',  borderRadius: 'var(--radius-sm)' },
  lg:       { height: '36px', padding: '0 12px',  fontSize: 'var(--text-base)', borderRadius: 'var(--radius)' },
  icon:     { width: '32px',  height: '32px', padding: '0', borderRadius: 'var(--radius)' },
  'icon-xs':{ width: '24px',  height: '24px', padding: '0', borderRadius: 'var(--radius-sm)' },
  'icon-sm':{ width: '28px',  height: '28px', padding: '0', borderRadius: 'var(--radius-sm)' },
  'icon-lg':{ width: '36px',  height: '36px', padding: '0', borderRadius: 'var(--radius)' },
};

export function Button({
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed]  = React.useState(false);

  const v = VARIANTS[variant] || VARIANTS.default;
  const s = SIZES[size]       || SIZES.default;
  const h = HOVER[variant]    || {};

  const computed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: '1px solid',
    borderColor: v.borderColor,
    borderRadius: s.borderRadius,
    height: s.height,
    width: s.width,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 'var(--weight-medium)',
    fontFamily: 'var(--font-body)',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 150ms ease',
    outline: 'none',
    userSelect: 'none',
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transform: pressed ? 'translateY(1px)' : 'none',
    background: hovered && h.bg ? h.bg : v.bg,
    color: v.color,
    filter: hovered && h.filter ? h.filter : undefined,
    textDecoration: hovered && h.textDecoration ? h.textDecoration : 'none',
    textUnderlineOffset: '4px',
    ...(variant === 'destructive' && hovered ? { background: 'rgba(239,68,68,0.12)' } : {}),
    ...style,
  };

  return (
    <button
      disabled={disabled}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      style={computed}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
}
