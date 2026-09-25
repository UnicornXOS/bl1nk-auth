import React from 'react';

export function Input({ style, disabled, ...props }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <input
      data-slot="input"
      disabled={disabled}
      style={{
        display: 'block',
        width: '100%',
        height: '32px',
        minWidth: 0,
        padding: '0 10px',
        fontSize: 'var(--text-base)',
        fontFamily: 'var(--font-body)',
        color: 'var(--foreground)',
        background: 'transparent',
        border: '1px solid',
        borderColor: focused ? 'var(--ring)' : 'var(--input)',
        borderRadius: 'var(--radius)',
        outline: 'none',
        boxShadow: focused ? '0 0 0 3px color-mix(in oklch, var(--ring) 25%, transparent)' : 'none',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}
