# bl1nk Design System

**Version:** 1.1  
**Source codebase:** `bl1nk-design-system/` (Magic Patterns Vite template, mounted locally)  
**Source URL:** <https://www.magicpatterns.com/design-system/ds-8a93ee5b-bce3-4620-b857-7a98053bcadc>  
**Logo:** `assets/logo.png`

bl1nk is a modern, dark-first design system built for premium web products. Its signature visual language combines **liquid glass panels**, **neumorphic inputs**, and **spring-animated glow buttons** — all anchored by an emerald green primary accent (`#34d399`) and deep near-black backgrounds.

---

## CONTENT FUNDAMENTALS

**Voice & Tone**

- Concise, technical, confident — never verbose
- First-person plural ("we built", "our system") for documentation; second-person ("you can", "add a") for instructions
- No fluff: every word earns its place
- Lowercase brand name: always `bl1nk` (not "Bl1nk" or "BLINK"), with the numeral `1` intact

**Copy patterns**

- CTAs: short imperatives — "Get started", "Explore", "Learn more" (never "Click here to get started")
- Labels: sentence case, not title case — "Dark glass panel", not "Dark Glass Panel"
- Token names: kebab-case, prefixed — `--color-emerald`, `--radius-glass`
- Error messages: plain English, actionable — "Something went wrong. Try again." not "An unexpected error has occurred."

**Emoji policy:** Not used in UI. Material Icons are the icon language.

**Numbers:** always numerals (not words) in UI — "14 components", not "fourteen components"

---

## VISUAL FOUNDATIONS

**Color**

- Primary: emerald `oklch(0.765 0.149 162.5)` / `#34d399` — the single dominant accent
- Background (dark): `oklch(0.145 0 0)` ≈ near-black `#1a1a1a`
- Surface (dark): `oklch(0.205 0 0)` — sidebars, panels
- Border (dark): `oklch(0.269 0 0)` — subtle separators
- Background (light): white `oklch(1 0 0)`
- The logo introduces a 4-color identity palette: teal `#0abfbc`, orange `#f96332`, pink `#e91e8c`, purple `#9c27b0` — used for gradients, never as UI accent colors

**Typography**

- **Heading:** Noto Sans — display, titles, card headers (weights 700–800 for impact)
- **Body/UI:** Plus Jakarta Sans — all UI copy, labels, nav, tables (Avenir substitute; Avenir unavailable on Google Fonts)
- **Mono:** Geist Mono — code, token names, technical labels, timestamps
- Anti-aliasing: `-webkit-font-smoothing: antialiased` throughout
- Letter-spacing on headings: `-0.02em` to `-0.04em` for tight, premium feel

**Backgrounds**

- Dark mode UI: near-black base with slightly lighter surface layers for sidebar/card backgrounds
- Gradient hero sections: rich conic/linear gradients using dark teals and navy blues (from GlowButton previews: `conic-gradient(from 200deg, #0a0f1e, #0d3a2e, #0f766e, …)`)
- Glass panels need a colorful or gradient background to activate the refraction effect — never place on flat white or black
- No full-bleed photography in UI; illustrations use geometric gradients

**Liquid Glass (signature effect)**

- Two tones: `dark` (smoked, emerald text) and `light` (frosted white, dark text)
- Recipe: `backdrop-filter: blur(20px) saturate(140%)`, layered inset shadows, specular `::before` sheen, inner rim `::after`
- CSS class-based: `.glass` and `.glass-light` (defined in `tokens/effects.css`)
- Radius: always `24px` (`--radius-glass`)
- When to use: stat cards over gradient backgrounds, modals, overlays, featured CTAs

**Neumorphic Inputs (signature effect)**

- Light mode: soft clay background `#e4e8ef` with dual inset shadow (light + dark directions)
- Dark mode: `#2a2d35` with dark inset shadows
- Focus ring: emerald `rgba(52,211,153,0.55)` added to inset shadow on focus
- Radius: `24px` — fully rounded inputs
- When to use: form inputs in dark or mid-tone UI contexts; not for data tables

**Corner Radii**

- Buttons: `var(--radius)` ≈ 11px
- Cards: `var(--radius-xl)` = 14px
- Glass panels: `var(--radius-glass)` = 24px
- Pills (badges, tags): `var(--radius-pill)` = 999px
- GlowButton: `var(--radius-xl)` = 14px (slightly more generous than standard button)

**Shadows & Depth**

- Standard elevation: `--shadow-xs` through `--shadow-2xl` (neutral dark, no color)
- Glow shadows: emerald-tinted for GlowButton and interactive emerald elements
- Glass: complex multi-layer inset + outer system (defined in `--shadow-glass-dark` / `--shadow-glass-light`)
- Neumorphic: dual-direction inset shadows simulating soft clay extrusion

**Animation**

- Spring physics (GlowButton): `stiffness: 420, damping: 26, mass: 0.6` — bouncy but controlled
- Easing token: `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` for interactive elements
- Transitions: `150ms ease` for hover color/bg, `200ms ease` for focus rings, `280ms spring` for scale transforms
- GlowButton hover: scale(1.025) + sheen sweep + stronger box-shadow glow
- GlowButton press: scale(0.97)
- All content visible in `prefers-reduced-motion` — animate from hidden end-state, never animate-only-to-hide

**Hover states**

- Default buttons: `brightness(0.85)` on the background
- Ghost/outline buttons: muted background fill appears
- Nav items: `rgba(52,211,153,0.08)` tint
- Table rows: `rgba(255,255,255,0.03)` lift
- No opacity-only hover — always a visible color or bg change

**Dark mode**

- First-class: all components and tokens support `.dark` / `[data-theme="dark"]`
- Near-black bg, light text, same emerald primary, muted neutrals shift dark
- Neumorphic inputs auto-adapt via `.dark .neumorphic-input` CSS

**Cards**

- Standard: white bg, `1px border var(--border)`, `rounded-xl`, no shadow
- Glass cards: `.glass` or `.glass-light` class, `24px` radius, always on gradient background
- No colored left-border accent pattern

**Layout**

- App shell: fixed sidebar (240px) + flexible main area
- Sidebar: always dark even in light mode
- No blur/parallax on scroll; glass blur is for containers, not scroll effects

**Imagery / Illustrations**

- Not present in the source codebase. Use geometric gradients as backgrounds.
- Color tone of any imagery: cool, desaturated, or dark moody

---

## ICONOGRAPHY

**System:** [Material Icons](https://fonts.google.com/icons) — loaded via Google Fonts CDN  
**Import:** `@import url('https://fonts.googleapis.com/icon?family=Material+Icons');`  
**Usage:** `<span class="material-icons">dashboard</span>`  
**Size:** 16–20px for nav/UI, 24px default, 32px for hero/feature contexts  
**Color:** `currentColor` — inherits from parent, or set explicitly via `color:`  
**Weight:** Material Icons (filled), not outlined or sharp variants  

No custom SVG icon set exists in the codebase. No icon font sprite. No emoji as icons.

The `__AUTOGENERATED__Icon` component exists in the source but has an empty ICON_URLS map — it is a scaffold with no loaded icons. Stick with Material Icons via CDN.

---

## FILE INDEX

```
bl1nk Design System
├── styles.css                    ← Root entry point (import this in consumers)
├── readme.md                     ← This file
├── SKILL.md                      ← Agent skill descriptor
├── assets/
│   └── logo.png                  ← Brand logo (circular gradient badge)
├── tokens/
│   ├── colors.css                ← Brand palette + semantic color aliases
│   ├── typography.css            ← Font imports + type scale + weight tokens
│   ├── spacing.css               ← Spacing scale + radius + z-index
│   └── effects.css               ← Glass, neumorphic, shadow, transition tokens
├── components/
│   └── core/
│       ├── Button.jsx / .d.ts / .prompt.md
│       ├── GlassPanel.jsx / .d.ts / .prompt.md
│       ├── GlowButton.jsx / .d.ts / .prompt.md
│       ├── Badge.jsx / .d.ts / .prompt.md
│       ├── Input.jsx / .d.ts / .prompt.md
│       ├── NeumorphicInput.jsx / .d.ts / .prompt.md
│       ├── Card.jsx / .d.ts / .prompt.md     ← includes CardHeader, CardTitle, etc.
│       ├── MobilePreview.jsx / .d.ts / .prompt.md
│       └── core.card.html        ← @dsCard thumbnail (Components group)
├── guidelines/
│   ├── colors-brand.card.html    ← Brand emerald palette
│   ├── colors-neutral.card.html  ← Neutral scale 50–900
│   ├── colors-semantic.card.html ← Light & dark semantic tokens
│   ├── colors-charts.card.html   ← 5-stop data viz palette
│   ├── type-heading.card.html    ← Noto Sans specimens
│   ├── type-body.card.html       ← Plus Jakarta Sans specimens
│   ├── type-mono.card.html       ← Geist Mono specimens
│   ├── type-scale.card.html      ← Full size ramp
│   ├── spacing-scale.card.html   ← Spacing tokens
│   ├── spacing-radius.card.html  ← Border radii
│   ├── shadows-elevation.card.html ← Elevation + glow shadows
│   ├── glass.card.html           ← Liquid glass effect (dark + light)
│   ├── neumorphic.card.html      ← Neumorphic input surfaces
│   ├── brand-logo.card.html      ← Logo usage
│   └── brand-palette.card.html   ← 4-color logo identity palette
└── ui_kits/
    └── app/
        └── index.html            ← bl1nk dashboard — dark glass UI
```

### Components quick reference

| Component | Variants/Props | Notes |
|---|---|---|
| `Button` | 6 variants, 8 sizes | Default → emerald fill |
| `GlassPanel` | `tone`: dark/light | Needs colorful bg |
| `GlowButton` | solid/glass/outline, 3 sizes | Animated sheen + spring scale |
| `Badge` | default/secondary/destructive/outline | Pill shape |
| `Input` | Standard HTML input props | Emerald focus ring |
| `NeumorphicInput` | Standard HTML input props | Needs styles.css |
| `Card` | + CardHeader/Title/Description/Content/Action/Footer | White card with border |
| `MobilePreview` | width, height, time, hideStatusBar | 390×844 default |
| `Accordion` | type: single/multiple, collapsible | Animated expand/collapse |
| `Tabs` | value, defaultValue, onValueChange | Controlled or uncontrolled |
| `Dialog` | open, onOpenChange | Portal-based modal with overlay |
| `Command` | — | Filterable command palette |
| `Sidebar` | side, collapsible | Collapsible nav sidebar with provider |
