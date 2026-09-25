/* @ds-bundle: {"format":4,"namespace":"Bl1nkDesignSystem_428be4","components":[{"name":"Accordion","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionItem","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionTrigger","sourcePath":"components/core/Accordion.jsx"},{"name":"AccordionContent","sourcePath":"components/core/Accordion.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CardHeader","sourcePath":"components/core/Card.jsx"},{"name":"CardTitle","sourcePath":"components/core/Card.jsx"},{"name":"CardDescription","sourcePath":"components/core/Card.jsx"},{"name":"CardAction","sourcePath":"components/core/Card.jsx"},{"name":"CardContent","sourcePath":"components/core/Card.jsx"},{"name":"CardFooter","sourcePath":"components/core/Card.jsx"},{"name":"Command","sourcePath":"components/core/Command.jsx"},{"name":"CommandInput","sourcePath":"components/core/Command.jsx"},{"name":"CommandList","sourcePath":"components/core/Command.jsx"},{"name":"CommandEmpty","sourcePath":"components/core/Command.jsx"},{"name":"CommandGroup","sourcePath":"components/core/Command.jsx"},{"name":"CommandSeparator","sourcePath":"components/core/Command.jsx"},{"name":"CommandItem","sourcePath":"components/core/Command.jsx"},{"name":"CommandShortcut","sourcePath":"components/core/Command.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogTrigger","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogPortal","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogOverlay","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogContent","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogHeader","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogTitle","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogDescription","sourcePath":"components/core/Dialog.jsx"},{"name":"DialogFooter","sourcePath":"components/core/Dialog.jsx"},{"name":"GlassPanel","sourcePath":"components/core/GlassPanel.jsx"},{"name":"GlowButton","sourcePath":"components/core/GlowButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"MobilePreview","sourcePath":"components/core/MobilePreview.jsx"},{"name":"NeumorphicInput","sourcePath":"components/core/NeumorphicInput.jsx"},{"name":"SidebarProvider","sourcePath":"components/core/Sidebar.jsx"},{"name":"Sidebar","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarTrigger","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarHeader","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarContent","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarFooter","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarGroup","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarGroupLabel","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarMenu","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarMenuItem","sourcePath":"components/core/Sidebar.jsx"},{"name":"SidebarMenuButton","sourcePath":"components/core/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsList","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsTrigger","sourcePath":"components/core/Tabs.jsx"},{"name":"TabsContent","sourcePath":"components/core/Tabs.jsx"}],"sourceHashes":{"components/core/Accordion.jsx":"57425a7372b9","components/core/Badge.jsx":"e1205605abd5","components/core/Button.jsx":"0b96fba4cd53","components/core/Card.jsx":"303d996d325d","components/core/Command.jsx":"9f247dcd7ff1","components/core/Dialog.jsx":"bb44e586f0e7","components/core/GlassPanel.jsx":"6cf5732de5e4","components/core/GlowButton.jsx":"1c8ff9f7c675","components/core/Input.jsx":"5201e5ac02b9","components/core/MobilePreview.jsx":"349d63286cc5","components/core/NeumorphicInput.jsx":"1db7f8fbd782","components/core/Sidebar.jsx":"1255fb155ac1","components/core/Tabs.jsx":"72a4ac8f84ca","tweaks-panel.jsx":"6591467622ed","ui_kits/app/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Bl1nkDesignSystem_428be4 = window.Bl1nkDesignSystem_428be4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Accordion({
  type = 'single',
  collapsible = true,
  style,
  children,
  ...props
}) {
  const [openItems, setOpenItems] = React.useState([]);
  const toggle = value => {
    if (type === 'single') {
      setOpenItems(prev => prev.includes(value) ? collapsible ? [] : prev : [value]);
    } else {
      setOpenItems(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };
  const ctx = {
    openItems,
    toggle
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "accordion",
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      ...style
    }
  }, props), React.Children.map(children, child => child ? React.cloneElement(child, {
    __ctx: ctx
  }) : null));
}
function AccordionItem({
  value,
  __ctx,
  style,
  children,
  ...props
}) {
  const isOpen = __ctx ? __ctx.openItems.includes(value) : false;
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "accordion-item",
    "data-state": isOpen ? 'open' : 'closed',
    style: {
      borderBottom: '1px solid var(--border)',
      ...style
    }
  }, props), React.Children.map(children, child => child ? React.cloneElement(child, {
    __value: value,
    __isOpen: isOpen,
    __ctx
  }) : null));
}
function AccordionTrigger({
  __value,
  __isOpen,
  __ctx,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "accordion-trigger",
    "data-state": __isOpen ? 'open' : 'closed',
    onClick: () => __ctx && __ctx.toggle(__value),
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
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
      ...style
    }
  }, props), children, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      flexShrink: 0,
      transition: 'transform 200ms ease',
      transform: __isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      color: 'var(--muted-foreground)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function AccordionContent({
  __isOpen,
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "accordion-content",
    "data-state": __isOpen ? 'open' : 'closed',
    style: {
      overflow: 'hidden',
      maxHeight: __isOpen ? '1000px' : '0',
      transition: 'max-height 250ms ease',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: '14px',
      fontSize: 'var(--text-base)',
      color: 'var(--muted-foreground)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, children));
}
Object.assign(__ds_scope, { Accordion, AccordionItem, AccordionTrigger, AccordionContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  default: {
    background: 'var(--primary)',
    color: 'var(--primary-foreground)',
    border: 'none'
  },
  secondary: {
    background: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    border: 'none'
  },
  destructive: {
    background: 'rgba(239,68,68,0.12)',
    color: 'var(--destructive)',
    border: 'none'
  },
  outline: {
    background: 'transparent',
    color: 'var(--foreground)',
    border: '1px solid var(--border)'
  }
};
function Badge({
  variant = 'default',
  style,
  children,
  ...props
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "badge",
    "data-variant": variant,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '20px',
      padding: '0 8px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      flexShrink: 0,
      gap: '4px',
      overflow: 'hidden',
      transition: 'all 150ms ease',
      ...v,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  default: {
    bg: 'var(--primary)',
    color: 'var(--primary-foreground)',
    borderColor: 'transparent'
  },
  outline: {
    bg: 'var(--background)',
    color: 'var(--foreground)',
    borderColor: 'var(--border)'
  },
  secondary: {
    bg: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
    borderColor: 'transparent'
  },
  ghost: {
    bg: 'transparent',
    color: 'var(--foreground)',
    borderColor: 'transparent'
  },
  destructive: {
    bg: 'transparent',
    color: 'var(--destructive)',
    borderColor: 'transparent'
  },
  link: {
    bg: 'transparent',
    color: 'var(--primary)',
    borderColor: 'transparent'
  }
};
const HOVER = {
  default: {
    filter: 'brightness(0.85)'
  },
  outline: {
    bg: 'var(--muted)'
  },
  secondary: {
    filter: 'brightness(0.92)'
  },
  ghost: {
    bg: 'var(--muted)'
  },
  destructive: {
    bg: 'rgba(239,68,68,0.12)'
  },
  link: {
    textDecoration: 'underline'
  }
};
const SIZES = {
  default: {
    height: '32px',
    padding: '0 10px',
    fontSize: 'var(--text-base)',
    borderRadius: 'var(--radius)'
  },
  xs: {
    height: '24px',
    padding: '0 8px',
    fontSize: 'var(--text-xs)',
    borderRadius: 'var(--radius-sm)'
  },
  sm: {
    height: '28px',
    padding: '0 10px',
    fontSize: 'var(--text-sm)',
    borderRadius: 'var(--radius-sm)'
  },
  lg: {
    height: '36px',
    padding: '0 12px',
    fontSize: 'var(--text-base)',
    borderRadius: 'var(--radius)'
  },
  icon: {
    width: '32px',
    height: '32px',
    padding: '0',
    borderRadius: 'var(--radius)'
  },
  'icon-xs': {
    width: '24px',
    height: '24px',
    padding: '0',
    borderRadius: 'var(--radius-sm)'
  },
  'icon-sm': {
    width: '28px',
    height: '28px',
    padding: '0',
    borderRadius: 'var(--radius-sm)'
  },
  'icon-lg': {
    width: '36px',
    height: '36px',
    padding: '0',
    borderRadius: 'var(--radius)'
  }
};
function Button({
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.default;
  const s = SIZES[size] || SIZES.default;
  const h = HOVER[variant] || {};
  const computed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: '1px solid',
    borderColor: v.borderColor,
    borderRadius: s.borderRadius,
    height: s.height,
    width: s.width,
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 'var(--weight-medium)',
    fontFamily: 'var(--font-body)',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 150ms ease',
    outline: 'none',
    userSelect: 'none',
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transform: pressed ? 'translateY(1px)' : 'none',
    background: hovered && h.bg ? h.bg : v.bg,
    color: v.color,
    filter: hovered && h.filter ? h.filter : undefined,
    textDecoration: hovered && h.textDecoration ? h.textDecoration : 'none',
    textUnderlineOffset: '4px',
    ...(variant === 'destructive' && hovered ? {
      background: 'rgba(239,68,68,0.12)'
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    style: computed,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  size = 'default',
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card",
    "data-size": size,
    style: {
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
      ...style
    }
  }, props), children);
}
function CardHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-header",
    style: {
      display: 'grid',
      gridAutoRows: 'min-content',
      alignItems: 'start',
      gap: '4px',
      padding: '0 16px',
      ...style
    }
  }, props), children);
}
function CardTitle({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-title",
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-snug)',
      fontWeight: 'var(--weight-medium)',
      fontFamily: 'var(--font-heading)',
      ...style
    }
  }, props), children);
}
function CardDescription({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-description",
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--muted-foreground)',
      ...style
    }
  }, props), children);
}
function CardAction({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-action",
    style: {
      gridColumn: '2',
      gridRow: '1 / 3',
      alignSelf: 'start',
      justifySelf: 'end',
      ...style
    }
  }, props), children);
}
function CardContent({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-content",
    style: {
      padding: '0 16px',
      ...style
    }
  }, props), children);
}
function CardFooter({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "card-footer",
    style: {
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid var(--border)',
      background: 'color-mix(in oklch, var(--muted) 50%, transparent)',
      padding: '16px',
      borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
      marginTop: 'auto',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Command.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Command({
  style,
  children,
  ...props
}) {
  const [search, setSearch] = React.useState('');
  return /*#__PURE__*/React.createElement(CommandCtx.Provider, {
    value: {
      search,
      setSearch
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command",
    style: {
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
      ...style
    }
  }, props), children));
}
const CommandCtx = React.createContext({
  search: '',
  setSearch: () => {}
});
function CommandInput({
  placeholder = 'Search…',
  style,
  ...props
}) {
  const {
    search,
    setSearch
  } = React.useContext(CommandCtx);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      borderBottom: '1px solid var(--border)',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      color: 'var(--muted-foreground)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "4.5",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 10.5L14 14",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", _extends({
    "data-slot": "command-input",
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      height: '40px',
      background: 'none',
      border: 'none',
      outline: 'none',
      fontSize: 'var(--text-sm)',
      fontFamily: 'var(--font-body)',
      color: 'var(--foreground)',
      ...style
    }
  }, props)), search && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearch(''),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      display: 'flex',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4L4 12M4 4l8 8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))));
}
function CommandList({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command-list",
    style: {
      overflowY: 'auto',
      maxHeight: '300px',
      padding: '4px',
      ...style
    }
  }, props), children);
}
function CommandEmpty({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command-empty",
    style: {
      padding: '24px 0',
      textAlign: 'center',
      color: 'var(--muted-foreground)',
      fontSize: 'var(--text-sm)',
      ...style
    }
  }, props), children || 'No results found.');
}
function CommandGroup({
  heading,
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command-group",
    style: {
      ...style
    }
  }, props), heading && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 8px 2px',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '0.07em'
    }
  }, heading), children);
}
function CommandSeparator({
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command-separator",
    style: {
      height: '1px',
      background: 'var(--border)',
      margin: '4px -4px',
      ...style
    }
  }, props));
}
function CommandItem({
  onSelect,
  disabled,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const {
    search
  } = React.useContext(CommandCtx);

  // Filter by search — check text content
  const textContent = React.Children.toArray(children).map(c => typeof c === 'string' ? c : c?.props?.children || '').join(' ').toLowerCase();
  if (search && !textContent.includes(search.toLowerCase())) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "command-item",
    "data-disabled": disabled,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => !disabled && onSelect && onSelect(),
    style: {
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
      ...style
    }
  }, props), children);
}
function CommandShortcut({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-slot": "command-shortcut",
    style: {
      marginLeft: 'auto',
      fontSize: 'var(--text-xs)',
      color: 'var(--muted-foreground)',
      letterSpacing: '0.05em',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, CommandShortcut });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Command.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open,
  onOpenChange,
  children
}) {
  return /*#__PURE__*/React.createElement(DialogContext.Provider, {
    value: {
      open: !!open,
      onOpenChange
    }
  }, children);
}
const DialogContext = React.createContext({
  open: false,
  onOpenChange: () => {}
});
function DialogTrigger({
  asChild,
  style,
  children,
  ...props
}) {
  const {
    onOpenChange
  } = React.useContext(DialogContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => onOpenChange(true)
    });
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "dialog-trigger",
    onClick: () => onOpenChange(true),
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      ...style
    }
  }, props), children);
}
function DialogPortal({
  children
}) {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
}
function DialogOverlay({
  style,
  ...props
}) {
  const {
    onOpenChange
  } = React.useContext(DialogContext);
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-overlay",
    onClick: () => onOpenChange(false),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(2px)',
      zIndex: 50,
      ...style
    }
  }, props));
}
function DialogContent({
  style,
  children,
  ...props
}) {
  const {
    open,
    onOpenChange
  } = React.useContext(DialogContext);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(DialogPortal, null, /*#__PURE__*/React.createElement(DialogOverlay, null), /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-content",
    style: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 51,
      background: 'var(--card)',
      color: 'var(--card-foreground)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      width: '90vw',
      maxWidth: '480px',
      padding: '24px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenChange(false),
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4L4 12M4 4l8 8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), children));
}
function DialogHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-header",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...style
    }
  }, props), children);
}
function DialogTitle({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-title",
    style: {
      fontSize: 'var(--text-lg)',
      fontWeight: 'var(--weight-semibold)',
      fontFamily: 'var(--font-heading)',
      lineHeight: 'var(--leading-snug)',
      ...style
    }
  }, props), children);
}
function DialogDescription({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-description",
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--muted-foreground)',
      lineHeight: 'var(--leading-relaxed)',
      ...style
    }
  }, props), children);
}
function DialogFooter({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "dialog-footer",
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GlassPanel — liquid glass container, dark or light tone.
 * Requires styles.css (or effects.css) to be loaded; the glass visual
 * lives in the `.glass` / `.glass-light` CSS classes defined there.
 */
function GlassPanel({
  tone = 'dark',
  className = '',
  style,
  children,
  ...props
}) {
  const cls = tone === 'light' ? 'glass-light' : 'glass';
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "glass-panel",
    "data-tone": tone,
    className: `${cls}${className ? ' ' + className : ''}`,
    style: style
  }, props), children);
}
Object.assign(__ds_scope, { GlassPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassPanel.jsx", error: String((e && e.message) || e) }); }

// components/core/GlowButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = 'bl1nk-glow-btn-styles';
function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes bl1nk-sheen {
      0%   { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: translateX(420%) skewX(-18deg); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}
const SIZES = {
  sm: {
    height: '36px',
    padding: '0 16px',
    fontSize: 'var(--text-sm)'
  },
  default: {
    height: '44px',
    padding: '0 24px',
    fontSize: 'var(--text-base)'
  },
  lg: {
    height: '52px',
    padding: '0 32px',
    fontSize: 'var(--text-md)'
  }
};
function GlowButton({
  variant = 'solid',
  size = 'default',
  disabled = false,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [sheening, setSheening] = React.useState(false);
  React.useEffect(() => {
    injectStyles();
  }, []);
  const sz = SIZES[size] || SIZES.default;
  const variantStyle = {
    solid: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      border: 'none',
      boxShadow: hovered ? '0 10px 30px -6px rgba(52,211,153,0.65)' : '0 4px 14px -4px rgba(52,211,153,0.45)'
    },
    glass: {
      background: 'radial-gradient(ellipse 130% 90% at 50% 0%, rgba(10,12,20,0.63) 0%, rgba(10,12,20,0.55) 45%, rgba(10,12,20,0.50) 100%)',
      backdropFilter: 'blur(20px) saturate(140%)',
      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      color: 'var(--primary)',
      border: 'none',
      boxShadow: hovered ? '0 8px 24px -8px rgba(52,211,153,0.50), inset 0 0 0 1px rgba(255,255,255,0.10)' : 'inset 0 0 0 1px rgba(255,255,255,0.07)'
    },
    outline: {
      background: hovered ? 'rgba(52,211,153,0.08)' : 'transparent',
      color: 'var(--primary)',
      border: '1px solid rgba(52,211,153,0.40)',
      boxShadow: hovered ? '0 8px 24px -8px rgba(52,211,153,0.5)' : 'none'
    }
  }[variant] || {};
  const base = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 'var(--radius-xl)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease',
    transform: pressed ? 'scale(0.97)' : hovered ? 'scale(1.025)' : 'scale(1)',
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    ...variantStyle,
    ...style
  };
  const sheenStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '33%',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
    animation: sheening ? 'bl1nk-sheen 0.7s ease-in-out forwards' : 'none',
    pointerEvents: 'none'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    "data-slot": "glow-button",
    "data-variant": variant,
    style: base,
    onMouseEnter: () => {
      if (disabled) return;
      setHovered(true);
      setSheening(false);
      requestAnimationFrame(() => setSheening(true));
      setTimeout(() => setSheening(false), 720);
    },
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false)
  }, props), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: sheenStyle
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, children));
}
Object.assign(__ds_scope, { GlowButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlowButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  style,
  disabled,
  ...props
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    "data-slot": "input",
    disabled: disabled,
    style: {
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
      ...style
    },
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/MobilePreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MobilePreview — a realistic phone frame for previewing mobile UIs.
 * Wrap any screen content to simulate it on a phone display.
 */
function MobilePreview({
  width = 390,
  height = 844,
  time = '9:41',
  hideStatusBar = false,
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "mobile-preview",
    style: {
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
      ...style
    }
  }, props), !hideStatusBar && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 20,
      height: '24px',
      width: '128px',
      borderRadius: '0 0 16px 16px',
      background: 'var(--foreground)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '36px',
      background: 'var(--background)'
    }
  }, !hideStatusBar && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px 4px',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, time), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '16px',
      height: '10px',
      borderRadius: '3px',
      border: '1.5px solid',
      borderColor: 'var(--foreground)',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'var(--primary)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden auto',
      minHeight: 0
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '112px',
      height: '4px',
      borderRadius: '9999px',
      background: 'var(--foreground)',
      opacity: 0.3
    }
  }))));
}
Object.assign(__ds_scope, { MobilePreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MobilePreview.jsx", error: String((e && e.message) || e) }); }

// components/core/NeumorphicInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NeumorphicInput — soft inset neumorphic text field.
 * Requires styles.css (or effects.css) to be loaded for the `.neumorphic-input`
 * class that provides the shadow recipe and dark-mode adaptation.
 */
function NeumorphicInput({
  className = '',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    "data-slot": "neumorphic-input",
    className: `neumorphic-input${className ? ' ' + className : ''}`,
    style: style
  }, props));
}
Object.assign(__ds_scope, { NeumorphicInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NeumorphicInput.jsx", error: String((e && e.message) || e) }); }

// components/core/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SidebarCtx = React.createContext({
  open: true,
  setOpen: () => {}
});
function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  style,
  children,
  ...props
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = v => {
    if (!isControlled) setInternalOpen(v);
    if (onOpenChange) onOpenChange(v);
  };
  return /*#__PURE__*/React.createElement(SidebarCtx.Provider, {
    value: {
      open,
      setOpen
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-provider",
    style: {
      display: 'flex',
      height: '100%',
      width: '100%',
      ...style
    }
  }, props), children));
}
function Sidebar({
  side = 'left',
  collapsible = 'icon',
  style,
  children,
  ...props
}) {
  const {
    open
  } = React.useContext(SidebarCtx);
  const width = open ? '240px' : collapsible === 'icon' ? '52px' : '0px';
  return /*#__PURE__*/React.createElement("aside", _extends({
    "data-slot": "sidebar",
    "data-open": open,
    "data-side": side,
    style: {
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
      ...style
    }
  }, props), children);
}
function SidebarTrigger({
  style,
  children,
  ...props
}) {
  const {
    open,
    setOpen
  } = React.useContext(SidebarCtx);
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "sidebar-trigger",
    onClick: () => setOpen(!open),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--sidebar-foreground)',
      ...style
    }
  }, props), children || /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "12",
    height: "1.5",
    rx: "0.75",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7.25",
    width: "12",
    height: "1.5",
    rx: "0.75",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "10.5",
    width: "12",
    height: "1.5",
    rx: "0.75",
    fill: "currentColor"
  })));
}
function SidebarHeader({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-header",
    style: {
      padding: '12px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
      ...style
    }
  }, props), children);
}
function SidebarContent({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-content",
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '4px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      ...style
    }
  }, props), children);
}
function SidebarFooter({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-footer",
    style: {
      padding: '8px',
      borderTop: '1px solid var(--sidebar-border)',
      flexShrink: 0,
      ...style
    }
  }, props), children);
}
function SidebarGroup({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-group",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      ...style
    }
  }, props), children);
}
function SidebarGroupLabel({
  style,
  children,
  ...props
}) {
  const {
    open
  } = React.useContext(SidebarCtx);
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "sidebar-group-label",
    style: {
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
      ...style
    }
  }, props), children);
}
function SidebarMenu({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({
    "data-slot": "sidebar-menu",
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
      ...style
    }
  }, props), children);
}
function SidebarMenuItem({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("li", _extends({
    "data-slot": "sidebar-menu-item",
    style: {
      ...style
    }
  }, props), children);
}
function SidebarMenuButton({
  isActive,
  size = 'default',
  tooltip,
  style,
  children,
  ...props
}) {
  const [hovered, setHovered] = React.useState(false);
  const {
    open
  } = React.useContext(SidebarCtx);
  const height = size === 'lg' ? '40px' : size === 'sm' ? '28px' : '32px';
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "sidebar-menu-button",
    "data-active": isActive,
    title: !open && tooltip ? tooltip : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
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
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TabsCtx = React.createContext({
  value: '',
  onValueChange: () => {}
});
function Tabs({
  value,
  defaultValue,
  onValueChange,
  style,
  children,
  ...props
}) {
  const [internal, setInternal] = React.useState(defaultValue || '');
  const controlled = value !== undefined;
  const active = controlled ? value : internal;
  const change = v => {
    if (!controlled) setInternal(v);
    if (onValueChange) onValueChange(v);
  };
  return /*#__PURE__*/React.createElement(TabsCtx.Provider, {
    value: {
      value: active,
      onValueChange: change
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      ...style
    }
  }, props), children));
}
function TabsList({
  style,
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs-list",
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      borderRadius: 'var(--radius)',
      background: 'var(--muted)',
      padding: '3px',
      ...style
    }
  }, props), children);
}
function TabsTrigger({
  value,
  style,
  children,
  ...props
}) {
  const ctx = React.useContext(TabsCtx);
  const isActive = ctx.value === value;
  const [hovered, setHovered] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    "data-slot": "tabs-trigger",
    role: "tab",
    "data-state": isActive ? 'active' : 'inactive',
    onClick: () => ctx.onValueChange(value),
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      ...style
    }
  }, props), children);
}
function TabsContent({
  value,
  style,
  children,
  ...props
}) {
  const ctx = React.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-slot": "tabs-content",
    role: "tabpanel",
    style: {
      marginTop: '12px',
      outline: 'none',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Tabs, TabsList, TabsTrigger, TabsContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AccordionItem = __ds_scope.AccordionItem;

__ds_ns.AccordionTrigger = __ds_scope.AccordionTrigger;

__ds_ns.AccordionContent = __ds_scope.AccordionContent;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardAction = __ds_scope.CardAction;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Command = __ds_scope.Command;

__ds_ns.CommandInput = __ds_scope.CommandInput;

__ds_ns.CommandList = __ds_scope.CommandList;

__ds_ns.CommandEmpty = __ds_scope.CommandEmpty;

__ds_ns.CommandGroup = __ds_scope.CommandGroup;

__ds_ns.CommandSeparator = __ds_scope.CommandSeparator;

__ds_ns.CommandItem = __ds_scope.CommandItem;

__ds_ns.CommandShortcut = __ds_scope.CommandShortcut;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.DialogTrigger = __ds_scope.DialogTrigger;

__ds_ns.DialogPortal = __ds_scope.DialogPortal;

__ds_ns.DialogOverlay = __ds_scope.DialogOverlay;

__ds_ns.DialogContent = __ds_scope.DialogContent;

__ds_ns.DialogHeader = __ds_scope.DialogHeader;

__ds_ns.DialogTitle = __ds_scope.DialogTitle;

__ds_ns.DialogDescription = __ds_scope.DialogDescription;

__ds_ns.DialogFooter = __ds_scope.DialogFooter;

__ds_ns.GlassPanel = __ds_scope.GlassPanel;

__ds_ns.GlowButton = __ds_scope.GlowButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.MobilePreview = __ds_scope.MobilePreview;

__ds_ns.NeumorphicInput = __ds_scope.NeumorphicInput;

__ds_ns.SidebarProvider = __ds_scope.SidebarProvider;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SidebarTrigger = __ds_scope.SidebarTrigger;

__ds_ns.SidebarHeader = __ds_scope.SidebarHeader;

__ds_ns.SidebarContent = __ds_scope.SidebarContent;

__ds_ns.SidebarFooter = __ds_scope.SidebarFooter;

__ds_ns.SidebarGroup = __ds_scope.SidebarGroup;

__ds_ns.SidebarGroupLabel = __ds_scope.SidebarGroupLabel;

__ds_ns.SidebarMenu = __ds_scope.SidebarMenu;

__ds_ns.SidebarMenuItem = __ds_scope.SidebarMenuItem;

__ds_ns.SidebarMenuButton = __ds_scope.SidebarMenuButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TabsList = __ds_scope.TabsList;

__ds_ns.TabsTrigger = __ds_scope.TabsTrigger;

__ds_ns.TabsContent = __ds_scope.TabsContent;

})();
