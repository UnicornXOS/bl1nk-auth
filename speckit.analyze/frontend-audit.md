# Frontend Audit - 2025-02-12

## Repository Topology
- `app/` – Next.js App Router routes. Key segments: `(marketing)` for public pages, `(auth)` for login, `dashboard`, `agent`, `board`, `chat`, `.well-known` metadata, API handlers.
- `src/components/` – React components including new `layout/*` and marketing modules, plus legacy dashboards, charts, auth screens (`Login.jsx`), and UI primitives under `ui/`.
- `scripts/components/` – Previously hosted layout primitives; being retired as shared components move under `src/components/layout`.
- `lib/` – Auth and crypto utilities (`crypto.ts`, `env.ts`, `clients.ts`).
- `app/globals.css` – Combined Tailwind layers and custom design tokens (dark theme palette, typography, helpers).
- `src/assets/` – Imagery and icons used by legacy screens.

## Existing Styling & Tokens
- CSS variables declared in `:root` within `app/globals.css` supply primary palette (dark background, blue primary).
- Font stack mixes Inter + Sarabun (Thai) demonstrating existing internationalization intent.
- Utility classes for glow, glass, tiles, grids already defined; heavy Tailwind output suggests previous compile step.
- No centralized theme file or TypeScript definition for tokens; components reference raw class strings.

## Navigation & Layout
- `app/layout.tsx` now consumes shared layout components via `@/components/layout`.
- Layout wraps children with `ThemeProvider` (stubbed via `stubs/next-themes`), but theme switching likely unfinished.
- Footer and navigation primitives live in `src/components/layout`.

## Marketing Page
- `app/(marketing)/page.tsx` renders `<Hero />` plus placeholder tiles. `Hero` component location unresolved (likely in `src/components`).
- Additional marketing routes (blog, changelog, pricing, etc.) exist but content unknown; require review during implementation.

## Auth Experience
- `app/(auth)/login/page.tsx` implements GitHub OAuth trigger using `next-auth` stub; copy contains mojibake (encoding issue).
- Legacy `src/components/Login.jsx` indicates prior standalone app; opportunity to reuse styling.

## Dashboard Context
- `app/dashboard` page pending audit; `src/components/Dashboard.jsx` large module likely previous implementation.
- Need to validate existing analytics/logging hooks before wiring new shell.

## Gaps & Risks
- Path alias inconsistency resolved by relocating layout primitives into `src/components`.
- Tailwind configuration absent; `globals.css` includes generated utilities but uncertain maintainability.
- Bilingual content incomplete; marketing/auth pages currently English-only with broken Thai copy.
- Testing harness not present; manual QA documentation required per spec.

## Design Token Approach (Proposed)
- Create `src/theme/tokens.ts` exporting a typed `DesignTokens` object covering palette, typography, spacing, radii, shadows, and motion durations.
- Mirror tokens in CSS via `:root` custom properties (generated from the TypeScript map) to ensure availability for CSS-only contexts.
- Provide a lightweight hook (`useDesignTokens`) or context for runtime access while allowing tree-shaking.
- Document token usage in `speckit.specify/company-frontend-foundation.md` and require new components to import from `src/theme/tokens`.

## Next Actions
1. Establish canonical location for design tokens/navigation components and update import paths.
2. Define typed token map (TS) or theme config to drive future components.
3. Plan restructure of marketing, auth, and dashboard pages according to new spec before coding changes.
