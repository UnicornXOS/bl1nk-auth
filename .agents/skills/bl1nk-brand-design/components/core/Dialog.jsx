import React from 'react';
import ReactDOM from 'react-dom';

export function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open: !!open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

const DialogContext = React.createContext({ open: false, onOpenChange: () => {} });

export function DialogTrigger({ asChild, style, children, ...props }) {
  const { onOpenChange } = React.useContext(DialogContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: () => onOpenChange(true) });
  }
  return (
    <button
      data-slot="dialog-trigger"
      onClick={() => onOpenChange(true)}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', ...style }}
      {...props}
    >
      {children}
    </button>
  );
}

export function DialogPortal({ children }) {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
}

export function DialogOverlay({ style, ...props }) {
  const { onOpenChange } = React.useContext(DialogContext);
  return (
    <div
      data-slot="dialog-overlay"
      onClick={() => onOpenChange(false)}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 50,
        ...style,
      }}
      {...props}
    />
  );
}

export function DialogContent({ style, children, ...props }) {
  const { open, onOpenChange } = React.useContext(DialogContext);
  if (!open) return null;
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        data-slot="dialog-content"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 51,
          background: 'var(--card)',
          color: 'var(--card-foreground)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          width: '90vw', maxWidth: '480px',
          padding: '24px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          ...style,
        }}
        {...props}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--muted-foreground)', padding: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        {children}
      </div>
    </DialogPortal>
  );
}

export function DialogHeader({ style, children, ...props }) {
  return (
    <div data-slot="dialog-header" style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ style, children, ...props }) {
  return (
    <div data-slot="dialog-title" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)', fontFamily: 'var(--font-heading)', lineHeight: 'var(--leading-snug)', ...style }} {...props}>
      {children}
    </div>
  );
}

export function DialogDescription({ style, children, ...props }) {
  return (
    <div data-slot="dialog-description" style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)', lineHeight: 'var(--leading-relaxed)', ...style }} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({ style, children, ...props }) {
  return (
    <div data-slot="dialog-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', ...style }} {...props}>
      {children}
    </div>
  );
}
