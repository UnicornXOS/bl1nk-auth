import React from 'react';

/**
 * MobilePreview — a realistic phone frame for previewing mobile UIs.
 * Wrap any screen content to simulate it on a phone display.
 */
export function MobilePreview({
  width = 390,
  height = 844,
  time = '9:41',
  hideStatusBar = false,
  style,
  children,
  ...props
}) {
  return (
    <div
      data-slot="mobile-preview"
      style={{
        position: 'relative',
        flexShrink: 0,
        borderRadius: '44px',
        border: '8px solid',
        borderColor: 'var(--foreground)',
        background: 'var(--background)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
        width,
        height,
        maxWidth: '100%',
        ...style,
      }}
      {...props}
    >
      {/* Dynamic island / notch */}
      {!hideStatusBar && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            height: '24px',
            width: '128px',
            borderRadius: '0 0 16px 16px',
            background: 'var(--foreground)',
          }}
        />
      )}

      {/* Screen */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '36px',
        background: 'var(--background)',
      }}>
        {/* Status bar */}
        {!hideStatusBar && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px 4px',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-body)',
          }}>
            <span>{time}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} aria-hidden="true">
              <div style={{ width: '16px', height: '10px', borderRadius: '3px', border: '1.5px solid', borderColor: 'var(--foreground)', opacity: 0.7 }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
            </div>
          </div>
        )}

        {/* Scrollable content area */}
        <div style={{ flex: 1, overflow: 'hidden auto', minHeight: 0 }}>
          {children}
        </div>

        {/* Home indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }} aria-hidden="true">
          <div style={{ width: '112px', height: '4px', borderRadius: '9999px', background: 'var(--foreground)', opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}
