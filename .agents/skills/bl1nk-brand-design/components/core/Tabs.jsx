import React from 'react';

const TabsCtx = React.createContext({ value: '', onValueChange: () => {} });

export function Tabs({ value, defaultValue, onValueChange, style, children, ...props }) {
  const [internal, setInternal] = React.useState(defaultValue || '');
  const controlled = value !== undefined;
  const active = controlled ? value : internal;
  const change = (v) => { if (!controlled) setInternal(v); if (onValueChange) onValueChange(v); };
  return (
    <TabsCtx.Provider value={{ value: active, onValueChange: change }}>
      <div data-slot="tabs" style={{ display: 'flex', flexDirection: 'column', gap: '0', ...style }} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ style, children, ...props }) {
  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        borderRadius: 'var(--radius)',
        background: 'var(--muted)',
        padding: '3px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, style, children, ...props }) {
  const ctx = React.useContext(TabsCtx);
  const isActive = ctx.value === value;
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      data-slot="tabs-trigger"
      role="tab"
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => ctx.onValueChange(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '4px 12px',
        height: '28px',
        borderRadius: 'calc(var(--radius) - 2px)',
        border: 'none',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        fontFamily: 'var(--font-body)',
        whiteSpace: 'nowrap',
        transition: 'all 150ms ease',
        outline: 'none',
        background: isActive ? 'var(--background)' : hovered ? 'color-mix(in oklch, var(--muted-foreground) 10%, transparent)' : 'transparent',
        color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, style, children, ...props }) {
  const ctx = React.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return (
    <div
      data-slot="tabs-content"
      role="tabpanel"
      style={{ marginTop: '12px', outline: 'none', ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
