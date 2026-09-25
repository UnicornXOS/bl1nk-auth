import React from 'react';

/**
 * GlassPanel — liquid glass container, dark or light tone.
 * Requires styles.css (or effects.css) to be loaded; the glass visual
 * lives in the `.glass` / `.glass-light` CSS classes defined there.
 */
export function GlassPanel({ tone = 'dark', className = '', style, children, ...props }) {
  const cls = tone === 'light' ? 'glass-light' : 'glass';
  return (
    <div
      data-slot="glass-panel"
      data-tone={tone}
      className={`${cls}${className ? ' ' + className : ''}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
