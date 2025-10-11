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

import { createContext, useContext, useCallback, useEffect, useLayoutEffect, useRef, useState, cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { Ref, MutableRefObject, CSSProperties, MouseEventHandler } from 'react';

// …rest of your file…

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(node);
        return;
      }
      (ref as MutableRefObject<T | null>).current = node;
    });
  };
}

export function PopoverTrigger({ asChild = false, children }: PopoverTriggerProps): ReactElement {
  const ctx = usePopoverContext('PopoverTrigger');

  if (!asChild) {
    return (
      <button
        type="button"
        ref={(node) => {
          ctx.triggerRef.current = node;
        }}
        onClick={() => ctx.onOpenChange(!ctx.open)}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        aria-controls={ctx.contentId}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </button>
    );
  }

  const child = children as ReactElement<{
    onClick?: MouseEventHandler<HTMLElement>;
    [key: string]: unknown;
  }>;
  const mergedRef = mergeRefs<HTMLElement>(
    (child as any).ref,
    (node) => {
      ctx.triggerRef.current = node;
    }
  );

  const existingOnClick = child.props.onClick;
  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    existingOnClick?.(event);
    if (!event.defaultPrevented) {
      ctx.onOpenChange(!ctx.open);
    }
  };

  return cloneElement(child, {
    ref: mergedRef,
    onClick: handleClick,
    'aria-haspopup': 'dialog',
    'aria-expanded': ctx.open,
    'aria-controls': ctx.contentId
  });
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

type PopoverContentProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
};

const baseContentStyle: CSSProperties = {
  background: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.25)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  overflow: 'hidden',
  zIndex: 40
};

function computePosition(
  anchorRect: DOMRect,
  contentRect: DOMRect,
  side: NonNullable<PopoverContentProps['side']>,
  align: NonNullable<PopoverContentProps['align']>,
  sideOffset: number,
  alignOffset: number
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  if (side === 'top') {
    top = anchorRect.top - contentRect.height - sideOffset;
    if (align === 'start') {
      left = anchorRect.left;
    } else if (align === 'center') {
      left = anchorRect.left + (anchorRect.width - contentRect.width) / 2;
    } else {
      left = anchorRect.right - contentRect.width;
    }
    left += alignOffset;
  } else if (side === 'bottom') {
    top = anchorRect.bottom + sideOffset;
    if (align === 'start') {
      left = anchorRect.left;
    } else if (align === 'center') {
      left = anchorRect.left + (anchorRect.width - contentRect.width) / 2;
    } else {
      left = anchorRect.right - contentRect.width;
    }
    left += alignOffset;
  } else if (side === 'left') {
    left = anchorRect.left - contentRect.width - sideOffset;
    if (align === 'start') {
      top = anchorRect.top;
    } else if (align === 'center') {
      top = anchorRect.top + (anchorRect.height - contentRect.height) / 2;
    } else {
      top = anchorRect.bottom - contentRect.height;
    }
    top += alignOffset;
  } else {
    left = anchorRect.right + sideOffset;
    if (align === 'start') {
      top = anchorRect.top;
    } else if (align === 'center') {
      top = anchorRect.top + (anchorRect.height - contentRect.height) / 2;
    } else {
      top = anchorRect.bottom - contentRect.height;
    }
    top += alignOffset;
  }

  const margin = 8;
  const maxLeft = window.innerWidth - contentRect.width - margin;
  const maxTop = window.innerHeight - contentRect.height - margin;
  return {
    left: Math.min(Math.max(margin, left), Math.max(margin, maxLeft)),
    top: Math.min(Math.max(margin, top), Math.max(margin, maxTop))
  };
}

export function PopoverContent({
  children,
  className,
  style,
  side = 'top',
  align = 'end',
  sideOffset = 12,
  alignOffset = 0
}: PopoverContentProps): ReactElement | null {
  const ctx = usePopoverContext('PopoverContent');
  const { open, onOpenChange, anchorRef, triggerRef, contentRef, contentId } = ctx;
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({ position: 'fixed', visibility: 'hidden' });
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const setContentNode = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
    },
    [contentRef]
  );

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (!anchor || !content) {
      return;
    }

    const updatePosition = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const { top, left } = computePosition(anchorRect, contentRect, side, align, sideOffset, alignOffset);
      setPositionStyle({ position: 'fixed', top, left, visibility: 'visible' });
    };

    updatePosition();
    const handleScroll = () => updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open, anchorRef, contentRef, side, align, sideOffset, alignOffset]);

  useEffect(() => {
    if (!open) {
      const fallback = restoreFocusRef.current ?? triggerRef.current;
      if (fallback) {
        focusElement(fallback);
      }
      restoreFocusRef.current = null;
      return;
    }

    restoreFocusRef.current = triggerRef.current;
    const content = contentRef.current;
    if (content) {
      const focusable = getFocusable(content);
      const target = focusable[0] ?? content;
      focusElement(target);
    }
  }, [open, contentRef, triggerRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onOpenChange(false);
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }
      const content = contentRef.current;
      if (!content) {
        return;
      }
      const focusable = getFocusable(content);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !content.contains(active)) {
          event.preventDefault();
          focusElement(last);
        }
      } else if (active === last) {
        event.preventDefault();
        focusElement(first);
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const content = contentRef.current;
      const trigger = triggerRef.current;
      const target = event.target as Node | null;
      if (!content || !target) {
        return;
      }
      if (content.contains(target) || (trigger && trigger.contains(target))) {
        return;
      }
      onOpenChange(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open, onOpenChange, contentRef, triggerRef]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={setContentNode}
      id={contentId}
      role="dialog"
      aria-modal="false"
      className={className}
      style={{ ...baseContentStyle, ...positionStyle, ...style }}
    >
      {children}
    </div>
  );
}
