import React from 'react';

const SidebarCtx = React.createContext({ open: true, setOpen: () => {} });

export function SidebarProvider({ defaultOpen = true, open: controlledOpen, onOpenChange, style, children, ...props }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v) => { if (!isControlled) setInternalOpen(v); if (onOpenChange) onOpenChange(v); };
  return (
    <SidebarCtx.Provider value={{ open, setOpen }}>
      <div data-slot="sidebar-provider" style={{ display: 'flex', height: '100%', width: '100%', ...style }} {...props}>
        {children}
      </div>
    </SidebarCtx.Provider>
  );
}

export function Sidebar({ side = 'left', collapsible = 'icon', style, children, ...props }) {
  const { open } = React.useContext(SidebarCtx);
  const width = open ? '240px' : (collapsible === 'icon' ? '52px' : '0px');
  return (
    <aside
      data-slot="sidebar"
      data-open={open}
      data-side={side}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--sidebar)',
        color: 'var(--sidebar-foreground)',
        borderRight: side === 'left' ? '1px solid var(--sidebar-border)' : 'none',
        borderLeft: side === 'right' ? '1px solid var(--sidebar-border)' : 'none',
        width,
        minWidth: width,
        overflow: 'hidden',
        transition: 'width 250ms ease, min-width 250ms ease',
        flexShrink: 0,
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarTrigger({ style, children, ...props }) {
  const { open, setOpen } = React.useContext(SidebarCtx);
  return (
    <button
      data-slot="sidebar-trigger"
      onClick={() => setOpen(!open)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px',
        background: 'none', border: 'none', cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--sidebar-foreground)',
        ...style,
      }}
      {...props}
    >
      {children || (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="currentColor"/>
          <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
          <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
      )}
    </button>
  );
}

export function SidebarHeader({ style, children, ...props }) {
  return (
    <div data-slot="sidebar-header" style={{ padding: '12px 8px 8px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, ...style }} {...props}>
      {children}
    </div>
  );
}

export function SidebarContent({ style, children, ...props }) {
  return (
    <div data-slot="sidebar-content" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '4px 8px', display: 'flex', flexDirection: 'column', gap: '4px', ...style }} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ style, children, ...props }) {
  return (
    <div data-slot="sidebar-footer" style={{ padding: '8px', borderTop: '1px solid var(--sidebar-border)', flexShrink: 0, ...style }} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ style, children, ...props }) {
  return (
    <div data-slot="sidebar-group" style={{ display: 'flex', flexDirection: 'column', gap: '2px', ...style }} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ style, children, ...props }) {
  const { open } = React.useContext(SidebarCtx);
  return (
    <div
      data-slot="sidebar-group-label"
      style={{
        padding: '4px 8px',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        opacity: open ? 1 : 0,
        transition: 'opacity 200ms ease',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarMenu({ style, children, ...props }) {
  return (
    <ul data-slot="sidebar-menu" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1px', ...style }} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ style, children, ...props }) {
  return (
    <li data-slot="sidebar-menu-item" style={{ ...style }} {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuButton({ isActive, size = 'default', tooltip, style, children, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  const { open } = React.useContext(SidebarCtx);
  const height = size === 'lg' ? '40px' : size === 'sm' ? '28px' : '32px';
  return (
    <button
      data-slot="sidebar-menu-button"
      data-active={isActive}
      title={!open && tooltip ? tooltip : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '0 8px',
        height,
        borderRadius: 'var(--radius)',
        border: 'none',
        cursor: 'pointer',
        background: isActive ? 'var(--sidebar-accent)' : hovered ? 'color-mix(in oklch, var(--sidebar-accent) 60%, transparent)' : 'transparent',
        color: isActive ? 'var(--sidebar-primary)' : 'var(--sidebar-foreground)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 'var(--weight-medium)' : 'var(--weight-normal)',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: 'background 150ms ease, color 150ms ease',
        outline: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
