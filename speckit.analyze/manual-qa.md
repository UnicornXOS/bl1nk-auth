# Manual QA & Follow-up Tasks (2025-02-12)

## Smoke Testing Checklist
- **Marketing Landing**
  - Load `/` on desktop + mobile viewport; confirm hero CTAs show both Thai/English labels and metric cards render.
  - Scroll through feature, testimonial, pricing, and CTA sections; ensure tiles animate and links resolve.
  - Validate navigation links emit `data-analytics-id` attributes for instrumentation tooling.
- **Auth Login Flow**
  - Visit `/auth/login`; verify client selector defaults to `note` and return URL updates with selection.
  - Trigger OAuth buttons without environment variables to surface `provider_not_configured` error messaging.
  - Set `GITHUB_ID`/`GITHUB_SECRET` locally, click “Continue with GitHub”, and confirm redirect hits `/api/login` then GitHub authorize screen.
- **Dashboard Shell**
  - After authentication stub, open `/dashboard`; ensure metrics, queue panel, and activity feed appear with bilingual labels.
  - Change timeframe chips (24h, 7d, 30d) and confirm loading indicator appears and metrics update.
  - Observe browser console for `[analytics] dashboard_viewed` and `dashboard_timeframe_changed` logs.

## Outstanding Items / Follow-ups
- Wire real analytics provider (`dataLayer` currently captures events locally).
- Replace mock data in `getDashboardOverview()` with real API calls and add suspense boundaries per data source.
- Align `config/clients.json` with production redirect URLs and expose admin UI to manage entries.
- Expand localization to full toggle (locale switcher) instead of dual-language labels.
- Implement registration/onboarding flow and backend endpoint to store requests.
- Add integration tests covering `/auth/login` provider handling and dashboard timeframe interaction (Cypress/Playwright candidate).
- Introduce visual regression or snapshot testing once component library is finalized.
