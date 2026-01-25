---
description: Configure Vercel project settings with vercel.json or vercel.ts
argument-hint: [config-type] - 'json' for static config, 'ts' for programmatic config
allowed-tools: write_to_file, view_file, read_url_content
---

# Vercel Project Configuration

Creates or updates Vercel project configuration with best practices for Next.js deployments.

## Usage

`/vercel-config [json|ts]`

## Process

1. Determine configuration type (vercel.json for static, vercel.ts for programmatic)
2. Check existing configuration if any
3. Create comprehensive configuration with:
   - Build and install commands
   - Framework detection
   - Health check endpoints
   - Security headers
   - Function configuration
   - Image optimization settings
   - Redirects and rewrites if needed
4. Add health check API endpoint if not exists
5. Validate configuration syntax

## Configuration Properties

**Essential Settings:**

- `buildCommand` - Override build command
- `framework` - Specify framework preset (nextjs, vite, etc.)
- `installCommand` - Override package install
- `outputDirectory` - Build output location

**Deployment Checks:**

- `checks.paths` - Health check endpoints for deployment validation

**Security:**

- `headers` - Custom HTTP headers (CSP, CORS, security headers)

**Performance:**

- `images` - Image optimization config
- `functions` - Memory, duration, runtime settings
- `regions` - Deploy to specific regions

**Routing:**

- `redirects` - URL redirects
- `rewrites` - Proxy requests
- `cleanUrls` - Remove .html extensions
- `trailingSlash` - URL trailing slash behavior

## Examples

**Basic Next.js config:**

```
/vercel-config json
```

**Programmatic config with environment-based settings:**

```
/vercel-config ts
```

## Notes

- Only one config file (vercel.json OR vercel.ts) per project
- vercel.ts allows dynamic configuration at build time
- Always include health check endpoint for deployment validation
- Security headers are recommended for production
- Use $schema property for IDE autocomplete in vercel.json
