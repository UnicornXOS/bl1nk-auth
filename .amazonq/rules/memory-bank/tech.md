# bl1nk-auth Technology Stack

## Core Technologies

### Frontend Framework
- **Next.js 15.5.4**: React-based full-stack framework with App Router
- **React 18.3.1**: UI library with server/client components
- **TypeScript 5.6.2**: Static type checking and enhanced developer experience

### Authentication & Security
- **JOSE 5.2.4**: JWT token creation and validation
- **Cookie 1.0.2**: Secure session management
- **Zod 3.23.8**: Runtime type validation and schema parsing

### Queue & Background Processing
- **BullMQ 5.31.3**: Redis-based job queue system
- **IORedis 5.4.1**: Redis client for queue operations
- **@upstash/redis 1.32.0**: Serverless Redis integration
- **@upstash/ratelimit 1.2.0**: Rate limiting for API endpoints

### External Integrations
- **@notionhq/client 2.2.14**: Notion API integration
- **@octokit/rest 21.1.1**: GitHub API client

### Development Tools
- **TSX 4.20.6**: TypeScript execution for scripts
- **@types/node 24.6.1**: Node.js type definitions
- **@types/react 19.1.16**: React type definitions

## Build System & Configuration

### Package Manager
- **pnpm**: Fast, disk space efficient package manager

### Development Commands
```bash
pnpm dev -p 8787    # Development server on port 8787
pnpm build          # Production build
pnpm start -p 8787  # Production server on port 8787
pnpm gen:key        # Generate cryptographic keys
```

### TypeScript Configuration
- **Target**: ES2022 with DOM libraries
- **Module System**: ESNext with bundler resolution
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` for root imports, custom stubs for next-auth and next-themes

### Next.js Configuration
- **Page Extensions**: `.ts`, `.tsx`, `.mdx`
- **Rewrites**: JWKS endpoint mapping for Windows compatibility
- **Webpack**: Custom MDX loader configuration

## Environment & Deployment

### Required Environment Variables
```bash
# OAuth Providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Authentication Keys
AUTH_SECRET=
AUTH_PRIVATE_KEY=
AUTH_PUBLIC_KEY=

# Webhook System
WEBHOOK_SECRET=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# External Services
NOTION_API_KEY=
NOTION_TASKS_DB_ID=
GITHUB_TOKEN=
LOGTAIL_TOKEN=
```

### Deployment Targets
- **Cloudflare Pages**: Serverless deployment with Cron triggers
- **Vercel**: Alternative serverless platform
- **Local Development**: Port 8787 for testing

### File System Compatibility
- **Windows Path Handling**: Special configuration for `.well-known` endpoints
- **MDX Processing**: Custom webpack loader for documentation
- **Static Assets**: Public directory for images and icons

## Architecture Decisions

### Module System
- **CommonJS**: Package type for Node.js compatibility
- **ESNext**: TypeScript compilation target
- **Bundler Resolution**: Modern module resolution strategy

### Component Strategy
- **Server Components**: Default for performance
- **Client Components**: Explicit marking for interactivity
- **Hybrid Rendering**: Mix of SSR and CSR based on needs

### API Design
- **RESTful Routes**: Standard HTTP methods and status codes
- **Type Safety**: Zod schemas for request/response validation
- **Error Handling**: Consistent error responses across endpoints