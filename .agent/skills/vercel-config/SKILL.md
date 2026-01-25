---
name: Vercel Project Configuration
description: Configure Vercel deployments using vercel.json for Next.js projects. Handles build commands, deployment checks, security headers, redirects, rewrites, function settings, image optimization, and cron jobs. Use when setting up or modifying Vercel project configuration.
---

# Vercel Project Configuration

Configure Vercel project settings through `vercel.json` for production-ready Next.js deployments.

## When to Use

- Setting up new Vercel project configuration
- Adding deployment health checks
- Configuring security headers
- Setting up redirects or rewrites
- Customizing function behavior (memory, duration, regions)
- Configuring image optimization
- Setting up cron jobs

## Quick Start

1. **Basic Next.js config** - Framework detection, build commands, health checks
2. **Security headers** - CSP, CORS, XSS protection
3. **Routing** - Redirects, rewrites, clean URLs
4. **Advanced** - Functions, regions, image optimization, crons

## Core Configuration

### Essential Properties

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

### Health Check Endpoint

Create a health endpoint for monitoring:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'healthy' }, { status: 200 });
}
```

### Security Headers

```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" }
    ]
  }]
}
```

## Advanced Configuration

For detailed configuration options, see:

- **[ROUTING.md](references/ROUTING.md)** - Redirects, rewrites, clean URLs, trailing slashes
- **[FUNCTIONS.md](references/FUNCTIONS.md)** - Memory, duration, regions, failover
- **[IMAGES.md](references/IMAGES.md)** - Image optimization settings
- **[CRONS.md](references/CRONS.md)** - Scheduled functions

## Common Patterns

**SPA Fallback:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**API Proxy:**

```json
{
  "rewrites": [{
    "source": "/api/:path*",
    "destination": "https://backend.example.com/:path*"
  }]
}
```

**Geo-based Routing:**

```json
{
  "redirects": [{
    "source": "/:path((?!uk/).*)",
    "has": [{ "type": "header", "key": "x-vercel-ip-country", "value": "GB" }],
    "destination": "/uk/:path*"
  }]
}
```

## Templates

See `assets/` for complete configuration templates:

- `assets/nextjs-basic.json` - Minimal Next.js config
- `assets/nextjs-production.json` - Production-ready with security
- `assets/nextjs-advanced.json` - Full-featured configuration
