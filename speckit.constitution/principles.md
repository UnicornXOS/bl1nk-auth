# Engineering Principles

## Discovery First
1. Survey the entire repository before beginning any task; note relevant routes, components, configurations, and shared utilities.
2. Record the explored context (paths, ownership, dependencies) inside work logs or specifications so future contributors inherit the same map.
3. Reconfirm assumptions with stakeholders when repository structure changes or previously unknown gaps surface.

## Frontend Ownership
1. Prioritize cohesive company branding across all web touchpoints - layouts, typography, palette, and component states must align.
2. Build pages with accessible, international-ready interfaces (Thai and English at minimum) and support responsive breakpoints from mobile to desktop.
3. Reuse design system primitives from `src/components` or document new ones with usage guidance before shipping.

## Execution Quality
1. Drive each feature from an approved specification and decompose work into traceable tasks with clear acceptance criteria.
2. Ship interactive flows with loading, empty, error, and success states; avoid silent failures or jarring transitions.
3. Pair UI work with integration or visual regression tests where possible; otherwise capture manual QA steps and supporting evidence.

## Performance and Reliability
1. Target sub-200ms server response times for public pages and keep first meaningful paint under two seconds on mid-tier devices.
2. Lazy-load heavy assets (fonts, media, analytics) and offload long-running work to background jobs or CDN pipelines.
3. Monitor critical pages post-release (analytics, error tracking, user feedback) and file follow-up tasks for regressions within 24 hours.
