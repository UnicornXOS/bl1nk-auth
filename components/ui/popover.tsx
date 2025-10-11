'use client';

import { createContext, useContext } from 'react';
import type { ReactElement, ReactNode } from 'react';

type PopoverContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export function Popover({ open, onOpenChange, children }: PopoverProps): ReactElement {
  return (
    <PopoverContext.Provider value={{ open, onOpenChange }}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>{children}</div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = {
  asChild?: boolean;
  children: ReactElement;
};

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps): ReactElement {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error('PopoverTrigger must be used within a Popover');
  }
  const child = asChild ? children : <button type="button">{children}</button>;
  return (
    <div
      onClick={() => ctx.onOpenChange(!ctx.open)}
      role="presentation"
      style={{ display: 'inline-flex' }}
    >
      {child}
    </div>
  );
}

type PopoverContentProps = {
  children: ReactNode;
  className?: string;
};

export function PopoverContent({ children, className }: PopoverContentProps): ReactElement | null {
  const ctx = useContext(PopoverContext);
  if (!ctx || !ctx.open) {
    return null;
  }
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        bottom: '60px',
        right: 0,
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.25)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        overflow: 'hidden',
        zIndex: 40
      }}
    >
      {children}
    </div>
  );
}
