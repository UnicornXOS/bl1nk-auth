# Functions Configuration

Configure Vercel Functions memory, duration, regions, and runtime behavior.

## Basic Configuration

```json
{
  "functions": {
    "api/heavy-task.ts": {
      "memory": 3008,
      "maxDuration": 60
    }
  }
}
```

## Memory Settings

Available memory sizes (MB): 128, 256, 512, 1024, 2048, 3008

```json
{
  "functions": {
    "api/*.ts": {
      "memory": 1024
    }
  }
}
```

**Note:** With Fluid compute enabled, memory cannot be set in `vercel.json`. Set it in the Functions tab of your project dashboard instead.

## Duration Settings

Maximum execution time in seconds.

Plan limits:

- **Hobby**: 10s default, 60s max
- **Pro**: 15s default, 300s max (5 minutes)
- **Enterprise**: 15s default, 900s max (15 minutes)

```json
{
  "functions": {
    "api/long-running.ts": {
      "maxDuration": 300
    }
  }
}
```

## Regions

Deploy functions to specific regions for lower latency.

```json
{
  "regions": ["sfo1", "iad1"]
}
```

Available regions: See [Vercel Regions](https://vercel.com/docs/edge-network/regions)

Common regions:

- `iad1` - Washington, D.C., USA (default)
- `sfo1` - San Francisco, USA
- `sin1` - Singapore
- `fra1` - Frankfurt, Germany

## Function Failover

Enterprise feature for automatic failover:

```json
{
  "functionFailoverRegions": ["iad1", "sfo1"]
}
```

Vercel automatically selects the geographically closest available region.

## Pattern Matching

### Glob Patterns

```json
{
  "functions": {
    "api/*.js": { "memory": 1024 },
    "api/**/*.ts": { "memory": 2048 },
    "api/specific.js": { "maxDuration": 30 }
  }
}
```

### ISR Configuration

```json
{
  "functions": {
    "pages/blog/[slug].tsx": {
      "memory": 1024
    },
    "src/pages/isr/**/*": {
      "maxDuration": 10
    }
  }
}
```

## Runtime Configuration

### Bun Runtime (Beta)

```json
{
  "bunVersion": "1.x",
  "functions": {
    "api/test.ts": {
      "memory": 1024
    }
  }
}
```

For Next.js with ISR, update `package.json`:

```json
{
  "scripts": {
    "dev": "bun run --bun next dev",
    "build": "bun run --bun next build"
  }
}
```

### Community Runtimes

```json
{
  "functions": {
    "api/test.php": {
      "runtime": "vercel-php@0.5.2"
    }
  }
}
```

## Advanced Options

### Request Cancellation

Node.js only:

```json
{
  "functions": {
    "api/cancelable.ts": {
      "supportsCancellation": true
    }
  }
}
```

### Include/Exclude Files

```json
{
  "functions": {
    "api/with-assets.ts": {
      "includeFiles": "assets/**",
      "excludeFiles": "**/*.test.ts"
    }
  }
}
```

**Note:** Not supported in Next.js. Use `outputFileTracingIncludes` and `outputFileTracingExcludes` in `next.config.js` instead.

## Fluid Compute

Enable Fluid compute for automatic scaling:

```json
{
  "fluid": true
}
```

Fluid compute is enabled by default for new projects (as of April 23, 2025).
