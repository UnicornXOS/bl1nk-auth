# bl1nk-auth Technology Stack

## Core Technologies

### Frontend Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 18.3.1** - UI library with server components
- **TypeScript 5.6.2** - Type-safe JavaScript development

### Backend & API
- **Next.js API Routes** - Server-side API endpoints
- **JOSE 5.2.4** - JWT token handling and JWKS management
- **Zod 3.23.8** - Runtime type validation and parsing

### Database & Caching
- **Redis (Upstash)** - Session storage and rate limiting
- **IORedis 5.4.1** - Redis client for Node.js

### Queue & Background Processing
- **BullMQ 5.31.3** - Redis-based job queue system
- **Upstash Rate Limit 1.2.0** - Distributed rate limiting

### External Integrations
- **Notion API 2.2.14** - Notion workspace integration
- **Octokit REST 21.1.1** - GitHub API integration
- **Vercel Analytics 1.5.0** - Web analytics and monitoring

## Development Environment

### Build System
- **Next.js Build System** - Optimized production builds
- **TypeScript Compiler** - Type checking and compilation
- **ESLint** - Code linting and style enforcement

### Development Tools
- **TSX 4.20.6** - TypeScript execution for scripts
- **Custom Key Generation** - JWT key pair generation script

### Configuration Files
- **next.config.mjs** - Next.js configuration with MDX support
- **tsconfig.json** - TypeScript configuration with path mapping
- **eslint.config.mjs** - ESLint configuration
- **postcss.config.mjs** - PostCSS configuration

## Development Commands

### Primary Commands
```bash
npm run dev        # Start development server on port 8787
npm run build      # Build for production
npm run start      # Start production server on port 8787
npm run gen:key    # Generate JWT key pairs
```

### Environment Setup
- **Development**: `http://localhost:8787`
- **Authentication**: `http://localhost:8787/login`
- **Environment Variables**: `.env.local` (see `.env.example`)

## Deployment & Infrastructure

### Supported Platforms
- **Vercel** - Primary deployment platform
- **Cloudflare** - Alternative deployment with Workers support

### Required Environment Variables
- **OAuth Providers**: `GITHUB_*`, `GOOGLE_*` credentials
- **Authentication**: `AUTH_*` keys and secrets
- **Redis**: `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN`
- **Integrations**: `NOTION_API_KEY`, `GITHUB_TOKEN`
- **Monitoring**: `LOGTAIL_TOKEN` (optional)

### Webhook System
- **Rate Limiting**: Upstash Redis-based rate limiting
- **Queue Processing**: BullMQ with Redis backend
- **Cron Integration**: Cloudflare Cron Triggers support
- **Monitoring**: Built-in dashboard for queue statistics

## Architecture Decisions

### TypeScript Configuration
- **Target**: ES2022 with DOM support
- **Module System**: ESNext with bundler resolution
- **Path Mapping**: Absolute imports with `@/*` alias
- **Stub System**: Custom stubs for external libraries

### Next.js Configuration
- **Page Extensions**: TypeScript, TSX, and MDX support
- **Rewrites**: JWKS endpoint mapping for Windows compatibility
- **Webpack**: Custom MDX loader configuration

### Security & Performance
- **JWT Security**: JOSE library for secure token handling
- **Rate Limiting**: Distributed rate limiting with Redis
- **Type Safety**: Comprehensive TypeScript coverage
- **Validation**: Zod schemas for runtime type checking