import React from 'react';

const STYLE_ID = 'bl1nk-glow-btn-styles';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes bl1nk-sheen {
      0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateX(420%) skewX(-18deg); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}

const SIZES = {
  sm:      { height: '36px', padding: '0 16px', fontSize: 'var(--text-sm)' },
  default: { height: '44px', padding: '0 24px', fontSize: 'var(--text-base)' },
  lg:      { height: '52px', padding: '0 32px', fontSize: 'var(--text-md)' },
};

export function GlowButton({
  variant = 'solid',
  size = 'default',
  disabled = false,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered]  = React.useState(false);
  const [pressed, setPressed]  = React.useState(false);
  const [sheening, setSheening] = React.useState(false);

  React.useEffect(() => { injectStyles(); }, []);

  const sz = SIZES[size] || SIZES.default;

  const variantStyle = {
    solid: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      border: 'none',
      boxShadow: hovered
        ? '0 10px 30px -6px rgba(52,211,153,0.65)'
        : '0 4px 14px -4px rgba(52,211,153,0.45)',
    },
    glass: {
      background: 'radial-gradient(ellipse 130% 90% at 50% 0%, rgba(10,12,20,0.63) 0%, rgba(10,12,20,0.55) 45%, rgba(10,12,20,0.50) 100%)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      color: 'var(--primary)',
      border: 'none',
      boxShadow: hovered
        ? '0 8px 24px -8px rgba(52,211,153,0.50), inset 0 0 0 1px rgba(255,255,255,0.10)'
        : 'inset 0 0 0 1px rgba(255,255,255,0.07)',
    },
    outline: {
      background: hovered ? 'rgba(52,211,153,0.08)' : 'transparent',
      color: 'var(--primary)',
      border: '1px solid rgba(52,211,153,0.40)',
      boxShadow: hovered ? '0 8px 24px -8px rgba(52,211,153,0.5)' : 'none',
    },
  }[variant] || {};

  const base = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 'var(--radius-xl)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease',
    transform: pressed ? 'scale(0.97)' : hovered ? 'scale(1.025)' : 'scale(1)',
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    ...variantStyle,
    ...style,
  };

  const sheenStyle = {
    position: 'absolute',
    top: 0, bottom: 0, left: 0,
    width: '33%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
    animation: sheening ? 'bl1nk-sheen 0.7s ease-in-out forwards' : 'none',
    pointerEvents: 'none',
  };

  return (
    <button
      disabled={disabled}
      data-slot="glow-button"
      data-variant={variant}
      style={base}
      onMouseEnter={() => {
        if (disabled) return;
        setHovered(true);
        setSheening(false);
        requestAnimationFrame(() => setSheening(true));
        setTimeout(() => setSheening(false), 720);
      }}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...props}
    >
      <span aria-hidden="true" style={sheenStyle} />
      <span style={{ position: 'relative', zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  );
}
