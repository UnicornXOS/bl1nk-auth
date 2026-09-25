import React from 'react';

export function Card({ size = 'default', style, children, ...props }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: size === 'sm' ? '12px' : '16px',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        paddingTop: size === 'sm' ? '12px' : '16px',
        paddingBottom: size === 'sm' ? '12px' : '16px',
        fontSize: 'var(--text-base)',
        color: 'var(--card-foreground)',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ style, children, ...props }) {
  return (
    <div
      data-slot="card-header"
      style={{
        display: 'grid',
        gridAutoRows: 'min-content',
        alignItems: 'start',
        gap: '4px',
        padding: '0 16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ style, children, ...props }) {
  return (
    <div
      data-slot="card-title"
      style={{
        fontSize: 'var(--text-md)',
        lineHeight: 'var(--leading-snug)',
        fontWeight: 'var(--weight-medium)',
        fontFamily: 'var(--font-heading)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDescription({ style, children, ...props }) {
  return (
    <div
      data-slot="card-description"
      style={{
        fontSize: 'var(--text-base)',
        color: 'var(--muted-foreground)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardAction({ style, children, ...props }) {
  return (
    <div
      data-slot="card-action"
      style={{
        gridColumn: '2',
        gridRow: '1 / 3',
        alignSelf: 'start',
        justifySelf: 'end',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ style, children, ...props }) {
  return (
    <div
      data-slot="card-content"
      style={{
        padding: '0 16px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ style, children, ...props }) {
  return (
    <div
      data-slot="card-footer"
      style={{
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid var(--border)',
        background: 'color-mix(in oklch, var(--muted) 50%, transparent)',
        padding: '16px',
        borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
        marginTop: 'auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
