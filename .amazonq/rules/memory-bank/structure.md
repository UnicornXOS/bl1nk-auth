# bl1nk-auth Project Structure

## Directory Organization

### Core Application (`app/`)
- **`(auth)/`** - Authentication-specific pages and layouts
- **`(marketing)/`** - Marketing pages (blog, pricing, quickstart, status)
- **`(docs)/`** - Documentation pages with dedicated layout
- **`api/`** - API routes for authentication, webhooks, and dashboard
- **`agent/`** - AI agent interface page
- **`board/`** - Project board/dashboard page
- **`chat/`** - Chat interface page
- **`dashboard/`** - Main dashboard with loading states

### Component Architecture (`components/`)
- **`marketing/`** - Landing page components (Hero, FeatureGrid, Testimonials, PricingPlans)
- **`layout/`** - Site-wide layout components (SiteFooter, SiteNavbar)
- **`ui/`** - Reusable UI components with accessibility and theming
- **`docs/`** - Documentation-specific components

### Source Components (`src/components/`)
- **`dashboard/`** - Dashboard-specific components
- **`ui/`** - Additional UI components (sidebar, drawer)
- **Core components** - Dashboard, Login, Settings, Documentation viewers

### Library & Utilities (`lib/`)
- **`integrations/`** - External service integrations (GitHub, Notion, Custom)
- **Core utilities** - Analytics, clients, crypto, environment, logging, queue, rate limiting

### Configuration & Setup
- **`config/`** - Client configurations and MDX processing
- **`theme/`** - Design tokens and theming
- **`stubs/`** - TypeScript stubs for external libraries
- **`.specify/`** - Project specification and templates

### Development & Tooling
- **`scripts/`** - Build scripts and key generation utilities
- **`.codacy/`** - Code quality and analysis configurations
- **`.github/`** - GitHub workflows and issue templates
- **`test-app/`** - Separate test application

## Architectural Patterns

### Route Organization
- **Route Groups**: Uses Next.js route groups for logical separation
- **API Routes**: RESTful API design with clear endpoint structure
- **Layout Hierarchy**: Nested layouts for different application sections

### Component Patterns
- **Composition**: Components built for reusability and composition
- **Accessibility**: Built-in accessibility providers and settings
- **Theming**: Consistent theme system across all components
- **Responsive Design**: Mobile-first responsive components

### Data Flow
- **Authentication Flow**: OAuth → JWT → Session management
- **Webhook Processing**: Webhook → Rate limit → Queue → Worker
- **State Management**: React state with Next.js server components

### Integration Architecture
- **External APIs**: Modular integration system for GitHub, Notion
- **Queue System**: BullMQ for background job processing
- **Caching**: Redis for rate limiting and session storage
- **Monitoring**: Comprehensive logging and analytics

## Key Relationships

### Authentication Flow
1. User initiates login via `/api/login`
2. OAuth callback handled by `/api/oauth/callback`
3. Session exchange via `/api/session/exchange`
4. JWT validation through JWKS endpoint

### Marketing to Auth Integration
- Marketing pages lead to authentication flows
- Unified branding and user experience
- Seamless transition between marketing and application

### Webhook to Dashboard Pipeline
- Webhooks received at `/api/webhook`
- Jobs queued via BullMQ
- Worker processes jobs via `/api/worker`
- Dashboard displays statistics via `/api/dashboard`