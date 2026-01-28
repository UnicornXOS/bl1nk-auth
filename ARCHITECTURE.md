# bl1nk-auth Architecture Documentation

## Project Structure Overview

```
bl1nk-auth/
├── app/                          # Next.js 15 App Router
│   ├── (routes)/
│   │   ├── page.tsx             # Landing page
│   │   ├── auth/page.tsx        # Authentication portal
│   │   ├── dashboard/page.tsx   # User dashboard
│   │   ├── admin/page.tsx       # Admin panel
│   │   ├── profile/page.tsx     # User profile
│   │   └── team/page.tsx        # Team management
│   ├── api/                     # API routes
│   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   ├── login/               # Login endpoint
│   │   ├── oauth/callback/      # OAuth callback
│   │   ├── session/             # Session management
│   │   │   ├── exchange/
│   │   │   ├── logout/
│   │   │   └── refresh/
│   │   ├── dashboard/           # Dashboard API
│   │   └── worker/              # Background worker
│   ├── docs/                    # MDX documentation
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                  # React components
│   ├── features/               # Feature-specific components
│   │   ├── auth/              # Authentication
│   │   │   ├── BiometricAuth.tsx
│   │   │   ├── BiometricLogin.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── oauth-buttons.tsx
│   │   ├── dashboard/         # Dashboard features
│   │   │   ├── admin-stats.tsx
│   │   │   ├── event-log.tsx
│   │   │   └── webhook-monitor.tsx
│   │   ├── docs/              # Documentation
│   │   │   ├── ChatFloating.tsx
│   │   │   └── CodeSnippet.tsx
│   │   └── marketing/         # Marketing pages
│   │       ├── CtaBanner.tsx
│   │       ├── FeatureGrid.tsx
│   │       ├── Hero.tsx
│   │       ├── PricingPlans.tsx
│   │       └── Testimonials.tsx
│   ├── layout/                # Layout components
│   │   ├── AccessibilityProvider.tsx
│   │   ├── AccessibilitySettings.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteNavbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── TopNav.tsx
│   ├── providers/             # Context providers
│   │   └── ThemeProvider.tsx
│   ├── shared/                # Shared UI components
│   │   ├── DynamicWidget.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── GlassCard.tsx
│   │   ├── IOS26Button.tsx
│   │   ├── IOS26Card.tsx
│   │   ├── IOS26Notification.tsx
│   │   ├── IOS26Pagination.tsx
│   │   ├── IOS26Toggle.tsx
│   │   ├── LiquidLogo.tsx
│   │   └── PageTransition.tsx
│   └── ui/                    # shadcn/ui primitives
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── sidebar.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── ... (other shadcn components)
│
├── lib/                        # Utilities and core logic
│   ├── auth/                  # Authentication utilities
│   │   ├── jwt.ts            # JWT handling
│   │   ├── middleware.ts     # Auth middleware
│   │   └── roles.ts          # Role-based access control
│   ├── db/                    # Database layer
│   │   └── prisma.ts         # Prisma client
│   ├── slack/                 # Slack integration
│   │   └── client.ts
│   ├── theme/                 # Theme system
│   │   └── tokens.ts         # Design tokens
│   ├── utils/                 # General utilities
│   │   ├── analytics.ts
│   │   ├── clients.ts
│   │   ├── crypto.ts
│   │   ├── env.ts
│   │   ├── logger.ts
│   │   └── utils.ts          # cn() and helpers
│   └── webhook/               # Webhook utilities
│       ├── queue.ts
│       ├── ratelimiter.ts
│       └── verify.ts
│
├── hooks/                      # React hooks
│   ├── use-mobile.ts          # Mobile detection
│   └── use-toast.ts           # Toast notifications
│
├── config/                     # Configuration files
│   ├── clients.json           # OAuth client configs
│   └── mdx-pass-through.js    # MDX configuration
│
├── prisma/                     # Database schema
│   └── schema.prisma
│
├── public/                     # Static assets
│   ├── hero-image.svg
│   └── testimonial-avatar-*.svg
│
└── docs/                       # Documentation
    ├── deployment/
    ├── development/
    ├── security/
    └── setup/
```

## Component Architecture

### Layer Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                         App Layer                            │
│  (pages, layouts, route handlers)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ├─────────────────────────────────────┐
                         │                                      │
        ┌────────────────▼────────────────┐   ┌───────────────▼──────────────┐
        │      Feature Layer              │   │      Layout Layer            │
        │  (auth, dashboard, marketing)   │   │  (navbar, footer, shell)     │
        └────────────────┬────────────────┘   └───────────────┬──────────────┘
                         │                                      │
                         └──────────────┬───────────────────────┘
                                       │
                         ┌─────────────▼──────────────┐
                         │     Shared Layer           │
                         │  (cards, buttons, widgets) │
                         └─────────────┬──────────────┘
                                       │
                         ┌─────────────▼──────────────┐
                         │      UI Primitives         │
                         │   (shadcn/ui components)   │
                         └────────────────────────────┘
```

### Import Guidelines

**Best Practices:**
```typescript
// ✅ GOOD - Feature imports
import { LoginForm } from '@/components/features/auth/login-form'
import { AdminStats } from '@/components/features/dashboard/admin-stats'

// ✅ GOOD - Layout imports
import { SiteNavbar } from '@/components/layout/SiteNavbar'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

// ✅ GOOD - Shared component imports
import GlassCard from '@/components/shared/GlassCard'
import IOS26Button from '@/components/shared/IOS26Button'

// ✅ GOOD - UI primitive imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ❌ BAD - Old paths (deprecated)
import GlassCard from '@/components/common/ui/GlassCard'  // OLD
import { AdminStats } from '@/components/dashboard/admin-stats'  // OLD
```

## Data Flow Architecture

```
┌──────────────────┐
│   User Request   │
└────────┬─────────┘
         │
         ▼
┌────────────────────────────────────┐
│        Next.js App Router          │
│  (Server Components by default)    │
└────────┬───────────────────────────┘
         │
         ├─────────────┬─────────────┬─────────────┐
         │             │             │             │
         ▼             ▼             ▼             ▼
   ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
   │   API   │  │   Auth   │  │ Database │  │ External │
   │ Routes  │  │ Middleware│  │  Prisma  │  │   APIs   │
   └─────────┘  └──────────┘  └──────────┘  └──────────┘
         │
         ▼
   ┌─────────────────────┐
   │  Client Components  │
   │  (use client)       │
   └─────────────────────┘
```

## Authentication Flow

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     ▼
┌─────────────────────┐
│  /auth/login Page   │
└────┬────────────────┘
     │
     ├───────────────┬────────────────┐
     │               │                │
     ▼               ▼                ▼
┌──────────┐  ┌───────────┐  ┌─────────────┐
│  OAuth   │  │   Email   │  │  Biometric  │
│  Flow    │  │ Password  │  │    Auth     │
└────┬─────┘  └─────┬─────┘  └──────┬──────┘
     │              │                │
     └──────────────┴────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  /api/login Handler  │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   JWT Generation     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  Session Storage     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   Dashboard Redirect │
         └──────────────────────┘
```

## Feature Module Pattern

Each feature module follows this structure:

```
features/[feature-name]/
├── components/          # Feature-specific UI
├── hooks/              # Feature-specific hooks (optional)
├── types/              # Feature-specific types (optional)
└── index.ts            # Public API (optional)
```

**Example - Auth Feature:**
```
features/auth/
├── BiometricAuth.tsx
├── BiometricLogin.tsx
├── login-form.tsx
├── register-form.tsx
└── oauth-buttons.tsx
```

## Design System

### Theme Tokens

Located in `/lib/theme/tokens.ts`:

```typescript
{
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    // Neon palette
    userTerminal: 'rgb(var(--color-user-terminal))',
    geminiCyan: 'rgb(var(--color-gemini-cyan))',
    claudeAmber: 'rgb(var(--color-claude-amber))',
    systemViolet: 'rgb(var(--color-system-violet))',
  },
  fonts: {
    sans: 'var(--font-inter)',
    mono: 'Roboto Mono',
    display: 'Orbitron',
  }
}
```

### Component Hierarchy

```
Custom Components
├── IOS26* (iOS 26 style)
│   ├── IOS26Button
│   ├── IOS26Card
│   ├── IOS26Notification
│   ├── IOS26Pagination
│   └── IOS26Toggle
├── Glass* (Glassmorphism)
│   └── GlassCard
└── Feature* (Feature cards)
    └── FeatureCard

shadcn/ui Primitives
├── Button
├── Card
├── Toast
└── ... (other primitives)
```

## API Architecture

### Route Structure

```
/api/
├── auth/[...nextauth]/    # NextAuth.js handler
├── login/                 # POST - Initiate login
├── oauth/
│   └── callback/         # GET - OAuth callback
├── session/
│   ├── exchange/         # POST - Token exchange
│   ├── logout/           # POST - Logout
│   └── refresh/          # POST - Refresh token
├── dashboard/            # GET - Dashboard data
└── worker/              # POST - Background jobs
```

### Middleware Chain

```
Request
  │
  ▼
Rate Limiter
  │
  ▼
Auth Middleware
  │
  ▼
Role-Based Access Control
  │
  ▼
Route Handler
  │
  ▼
Response
```

## Database Schema

Using Prisma ORM with the following entities:

- **User** - User accounts
- **Session** - Active sessions
- **OAuthToken** - OAuth tokens
- **Webhook** - Webhook configurations
- **Event** - Audit log events
- **Team** - Team/organization management

## Security Layers

1. **Authentication** - JWT + OAuth 2.0
2. **Authorization** - Role-based access control (RBAC)
3. **Rate Limiting** - API endpoint protection
4. **CSRF Protection** - NextAuth.js built-in
5. **Input Validation** - Zod schemas
6. **SQL Injection Protection** - Prisma ORM
7. **XSS Protection** - React automatic escaping

## Performance Optimizations

- **Code Splitting** - Dynamic imports for heavy components
- **Image Optimization** - Next.js Image component
- **Font Optimization** - next/font with variable fonts
- **Bundle Analysis** - Webpack bundle analyzer
- **Server Components** - React Server Components by default
- **Caching** - API route caching with Next.js

## Development Workflow

```
1. Feature Branch
   └─> 2. Component Development
        └─> 3. Integration Testing
             └─> 4. PR Review
                  └─> 5. Main Branch
                       └─> 6. Deployment
```

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# OAuth Providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Analytics
VERCEL_ANALYTICS_ID=
```

## Deployment Architecture

```
┌──────────────────┐
│   Vercel Edge    │
│    Network       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Next.js Server  │
│   (Serverless)   │
└────────┬─────────┘
         │
         ├─────────────────┬─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Database   │  │    Redis     │  │   External   │
│   (Neon)     │  │   (Upstash)  │  │     APIs     │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

**Last Updated:** January 28, 2026  
**Architecture Version:** 2.0 (Post-Refactoring)
