---
name: bl1nk-brand-design
description: Use this skill to generate well-branded interfaces and assets for bl1nk — a dark-first, premium design system featuring liquid glass panels, neumorphic inputs, spring-animated glow buttons, and an emerald green (#34d399) primary accent. Contains design guidelines, color/type/spacing tokens, reusable React components, and a UI kit for prototyping and production.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc):

- Copy `assets/logo.png` for the brand mark
- Link `styles.css` to get all tokens, glass/neumorphic CSS classes, and Google Fonts
- Load `_ds_bundle.js` and use `const { Button, GlassPanel, GlowButton, Badge, Input, NeumorphicInput, Card, MobilePreview } = window.Bl1nkDesignSystem_428be4;`
- Default to **dark mode** (background `oklch(0.145 0 0)`, emerald `#34d399` accent)
- Use `GlassPanel` over gradient/colorful backgrounds for stats and feature cards
- Use `GlowButton` for primary CTAs; `Button` for secondary actions
- Use Material Icons (already imported via styles.css): `<span class="material-icons">dashboard</span>`
- See `ui_kits/app/index.html` for a full working dashboard reference

If working on production code:

- Import `styles.css` (CSS custom properties + font imports + glass/neumorphic CSS)
- Copy components from `components/core/` — they use inline styles + CSS vars, no Tailwind
- The neumorphic and glass components need the CSS classes from `tokens/effects.css`
- All components respect `.dark` / `[data-theme="dark"]` on a parent element for dark mode

Key visual rules:

- Emerald `#34d399` is the ONLY accent color — never add new accent colors
- Glass panels MUST have a colorful/gradient background behind them to work
- Neumorphic inputs look best in dark contexts (`#2a2d35` bg) or the specific light clay `#e4e8ef`
- GlowButton uses spring physics (scale + glow shadow on hover, scale-down on press)
- No emoji in UI. No colored left-border cards. No generic blue/purple gradient backgrounds.
- Font: Noto Sans (headings) + Plus Jakarta Sans (body) + Geist Mono (code)

If the user invokes this skill without other guidance, ask:

1. What are you building? (prototype, production component, deck slide, UI mockup)
2. Dark mode, light mode, or both?
3. Which components do you need?
4. Any specific screens or flows to include?

Then act as an expert designer who outputs polished HTML artifacts or clean production-ready component code.
