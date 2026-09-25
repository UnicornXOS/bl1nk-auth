import React from 'react';

export function Command({ style, children, ...props }) {
  const [search, setSearch] = React.useState('');
  return (
    <CommandCtx.Provider value={{ search, setSearch }}>
      <div
        data-slot="command"
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--popover)',
          color: 'var(--popover-foreground)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </CommandCtx.Provider>
  );
}

const CommandCtx = React.createContext({ search: '', setSearch: () => {} });

export function CommandInput({ placeholder = 'Search…', style, ...props }) {
  const { search, setSearch } = React.useContext(CommandCtx);
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', borderBottom: '1px solid var(--border)', gap: '8px' }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        data-slot="command-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          height: '40px',
          background: 'none',
          border: 'none',
          outline: 'none',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-body)',
          color: 'var(--foreground)',
          ...style,
        }}
        {...props}
      />
      {search && (
        <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', display: 'flex', padding: 2 }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export function CommandList({ style, children, ...props }) {
  return (
    <div
      data-slot="command-list"
      style={{ overflowY: 'auto', maxHeight: '300px', padding: '4px', ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandEmpty({ style, children, ...props }) {
  return (
    <div data-slot="command-empty" style={{ padding: '24px 0', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', ...style }} {...props}>
      {children || 'No results found.'}
    </div>
  );
}

export function CommandGroup({ heading, style, children, ...props }) {
  return (
    <div data-slot="command-group" style={{ ...style }} {...props}>
      {heading && (
        <div style={{ padding: '6px 8px 2px', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export function CommandSeparator({ style, ...props }) {
  return <div data-slot="command-separator" style={{ height: '1px', background: 'var(--border)', margin: '4px -4px', ...style }} {...props} />;
}

export function CommandItem({ onSelect, disabled, style, children, ...props }) {
  const [hovered, setHovered] = React.useState(false);
  const { search } = React.useContext(CommandCtx);

  // Filter by search — check text content
  const textContent = React.Children.toArray(children)
    .map(c => (typeof c === 'string' ? c : c?.props?.children || ''))
    .join(' ')
    .toLowerCase();
  if (search && !textContent.includes(search.toLowerCase())) return null;

  return (
    <div
      data-slot="command-item"
      data-disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !disabled && onSelect && onSelect()}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 8px',
        borderRadius: 'var(--radius)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: hovered && !disabled ? 'var(--accent)' : 'transparent',
        color: disabled ? 'var(--muted-foreground)' : 'var(--foreground)',
        fontSize: 'var(--text-sm)',
        transition: 'background 100ms ease',
        userSelect: 'none',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandShortcut({ style, children, ...props }) {
  return (
    <span data-slot="command-shortcut" style={{ marginLeft: 'auto', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', letterSpacing: '0.05em', ...style }} {...props}>
      {children}
    </span>
  );
}
