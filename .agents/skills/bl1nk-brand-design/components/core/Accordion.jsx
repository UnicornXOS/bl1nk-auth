import React from 'react';

export function Accordion({ type = 'single', collapsible = true, style, children, ...props }) {
  const [openItems, setOpenItems] = React.useState([]);

  const toggle = (value) => {
    if (type === 'single') {
      setOpenItems(prev => prev.includes(value) ? (collapsible ? [] : prev) : [value]);
    } else {
      setOpenItems(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  const ctx = { openItems, toggle };

  return (
    <div data-slot="accordion" style={{ display: 'flex', flexDirection: 'column', width: '100%', ...style }} {...props}>
      {React.Children.map(children, child =>
        child ? React.cloneElement(child, { __ctx: ctx }) : null
      )}
    </div>
  );
}

export function AccordionItem({ value, __ctx, style, children, ...props }) {
  const isOpen = __ctx ? __ctx.openItems.includes(value) : false;
  return (
    <div
      data-slot="accordion-item"
      data-state={isOpen ? 'open' : 'closed'}
      style={{ borderBottom: '1px solid var(--border)', ...style }}
      {...props}
    >
      {React.Children.map(children, child =>
        child ? React.cloneElement(child, { __value: value, __isOpen: isOpen, __ctx }) : null
      )}
    </div>
  );
}

export function AccordionTrigger({ __value, __isOpen, __ctx, style, children, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      data-slot="accordion-trigger"
      data-state={__isOpen ? 'open' : 'closed'}
      onClick={() => __ctx && __ctx.toggle(__value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 0',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--weight-medium)',
        fontFamily: 'var(--font-body)',
        color: 'var(--foreground)',
        textAlign: 'left',
        textDecoration: hovered ? 'underline' : 'none',
        textUnderlineOffset: '4px',
        transition: 'all 150ms ease',
        outline: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        style={{ flexShrink: 0, transition: 'transform 200ms ease', transform: __isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--muted-foreground)' }}
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export function AccordionContent({ __isOpen, style, children, ...props }) {
  return (
    <div
      data-slot="accordion-content"
      data-state={__isOpen ? 'open' : 'closed'}
      style={{
        overflow: 'hidden',
        maxHeight: __isOpen ? '1000px' : '0',
        transition: 'max-height 250ms ease',
        ...style,
      }}
      {...props}
    >
      <div style={{ paddingBottom: '14px', fontSize: 'var(--text-base)', color: 'var(--muted-foreground)', lineHeight: 'var(--leading-relaxed)' }}>
        {children}
      </div>
    </div>
  );
}
