# Routing Configuration

Complete guide for redirects, rewrites, clean URLs, and trailing slashes.

## Redirects

Redirect users from one path to another with status codes.

### Permanent Redirects (308)

```json
{
  "redirects": [
    {
      "source": "/old-blog/:slug",
      "destination": "/blog/:slug",
      "permanent": true
    }
  ]
}
```

### Temporary Redirects (307)

```json
{
  "redirects": [
    {
      "source": "/maintenance",
      "destination": "/",
      "permanent": false
    }
  ]
}
```

### Custom Status Codes

```json
{
  "redirects": [
    {
      "source": "/moved",
      "destination": "/new-location",
      "statusCode": 301
    }
  ]
}
```

### Conditional Redirects

```json
{
  "redirects": [
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        {
          "type": "header",
          "key": "x-vercel-ip-country",
          "value": "GB"
        }
      ],
      "destination": "/uk/:path*",
      "permanent": false
    }
  ]
}
```

## Rewrites

Proxy requests to different paths or external URLs without changing the browser URL.

### Internal Rewrites

```json
{
  "rewrites": [
    {
      "source": "/blog/:slug",
      "destination": "/news/:slug"
    }
  ]
}
```

### External Proxies

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ]
}
```

### SPA Fallback

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Conditional Rewrites

```json
{
  "rewrites": [
    {
      "source": "/dashboard",
      "missing": [
        {
          "type": "cookie",
          "key": "auth_token"
        }
      ],
      "destination": "/login"
    }
  ]
}
```

## Clean URLs

Remove `.html` extensions from URLs.

```json
{
  "cleanUrls": true
}
```

With this enabled:

- `/about.html` → `/about` (automatic redirect)
- `/about` serves `about.html`

## Trailing Slashes

Control trailing slash behavior.

### Remove Trailing Slashes

```json
{
  "trailingSlash": false
}
```

- `/about/` → `/about` (308 redirect)

### Add Trailing Slashes

```json
{
  "trailingSlash": true
}
```

- `/about` → `/about/` (308 redirect)
- `/about/styles.css` → no redirect (files with extensions)

## Pattern Matching

### Wildcards

- `*` - Matches single path segment
- `**` - Matches multiple segments

```json
{
  "source": "/blog/:slug*",
  "destination": "/posts/:slug*"
}
```

### Regex

```json
{
  "source": "/post/:id(\\d{1,})",
  "destination": "/posts/:id"
}
```

### Negative Lookahead

```json
{
  "source": "/((?!maintenance).*)",
  "destination": "/maintenance"
}
```

## Conditional Matching

### Has Conditions

Match when properties are present:

```json
{
  "has": [
    {
      "type": "header",
      "key": "x-authorized",
      "value": "true"
    }
  ]
}
```

### Missing Conditions

Match when properties are absent:

```json
{
  "missing": [
    {
      "type": "cookie",
      "key": "session"
    }
  ]
}
```

### Value Matching

```json
{
  "has": [
    {
      "type": "header",
      "key": "X-Custom-Header",
      "value": {
        "pre": "valid",
        "suf": "value"
      }
    }
  ]
}
```

Conditions:

- `eq` - Equality
- `neq` - Inequality
- `inc` - Inclusion in array
- `ninc` - Not in array
- `pre` - Prefix
- `suf` - Suffix
- `re` - Regex match
- `gt/gte/lt/lte` - Numeric comparisons

## Bulk Redirects

For thousands of redirects, use bulk redirects:

```json
{
  "bulkRedirectsPath": "redirects.csv"
}
```

CSV format:

```csv
source,destination,permanent
/old-1,/new-1,true
/old-2,/new-2,false
```

Supports CSV, JSON, and JSONL formats.
