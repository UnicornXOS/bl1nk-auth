# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds Next.js App Router routes; `app/login` is the primary UI, `app/api` exposes auth handlers, and `app/.well-known` publishes JWKS metadata.
- `lib/` contains reusable auth utilities (key lifecycle, environment helpers); keep exports pure and documented at the call site.
- `config/clients.json` tracks registered clients and redirect URIs; update it alongside consumer services.
- `.env.local` carries runtime secrets; mirror every addition in `.env.example` so agents know which variables to provide.

## Build, Test, and Development Commands
- `npm run dev` starts the dev server on `http://localhost:8787` with hot reloading.
- `npm run build` produces the optimized production bundle in `.next/`.
- `npm run start` serves the built bundle; run it after a successful build for smoke checks.
- `npm run gen:key` runs `scripts/gen-key.ts` to generate RSA key material and suggested `.env` entries.

## Coding Style & Naming Conventions
- Write TypeScript with ES modules, two-space indentation, and explicit semicolons (see `lib/crypto.ts`).
- React components stay in PascalCase files exporting a default function; shared helpers use camelCase named exports.
- Keep inline object literals compact unless readability suffers and favor descriptive prop names over abbreviations.
- When introducing config, update both `config/clients.json` and `.env.example` in the same change.

## Testing Guidelines
- Automated tests are not yet wired; place new suites under the feature directory (e.g., `app/login/__tests__/login.spec.ts`).
- Document how to execute added tests via `npm test` or a dedicated script, and capture coverage goals in the PR.
- Include manual verification notes in PRs (e.g., `curl http://localhost:8787/api/login?client=demo`).

## Commit & Pull Request Guidelines
- Use concise, imperative commit subjects (e.g., `Add JWKS refresh hook`) and squash before publishing branches.
- PRs must explain intent, list testing evidence, and flag configuration or migration steps; add screenshots or curl snippets when UX changes.
- Link to tracking issues when available and tag reviewers responsible for the touched areas (`app/**`, `lib/**`).

## Security & Configuration Tips
- Treat RSA material as secrets. Never commit generated PEMs; refresh locally with `npm run gen:key`.
- Rotate `AUTH_KEY_KID` when rolling keys and confirm `/.well-known/jwks.json` serves the new key set before release.
- Double-check `.env.local` for stray variables before staging changes.


