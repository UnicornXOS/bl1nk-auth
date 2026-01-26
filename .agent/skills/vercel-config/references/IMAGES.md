# Image Optimization

Configure Vercel's native Image Optimization API.

## Basic Configuration

```json
{
  "images": {
    "sizes": [256, 640, 1080, 2048, 3840],
    "formats": ["image/webp"],
    "minimumCacheTTL": 60
  }
}
```

## Allowed Sizes

Define allowed image widths. The API returns an error if `w` parameter is not in this list.

```json
{
  "images": {
    "sizes": [256, 640, 1080, 2048, 3840]
  }
}
```

## Allowed Qualities

Define allowed quality values. The API returns an error if `q` parameter is not in this list.

```json
{
  "images": {
    "qualities": [25, 50, 75, 90]
  }
}
```

## Output Formats

Supported formats: `image/avif` and/or `image/webp`

```json
{
  "images": {
    "formats": ["image/avif", "image/webp"]
  }
}
```

## Local Patterns

Allow-list local image paths:

```json
{
  "images": {
    "localPatterns": [
      {
        "pathname": "^/assets/.*$",
        "search": ""
      }
    ]
  }
}
```

## Remote Patterns

Allow-list external domains:

```json
{
  "images": {
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "cdn.example.com",
        "port": "",
        "pathname": "^/images/.*$",
        "search": ""
      }
    ]
  }
}
```

## Cache TTL

Cache duration in seconds for optimized images:

```json
{
  "images": {
    "minimumCacheTTL": 86400
  }
}
```

Common values:

- `60` - 1 minute
- `3600` - 1 hour
- `86400` - 1 day
- `604800` - 1 week

## SVG Support

Allow SVG input (disabled by default for security):

```json
{
  "images": {
    "dangerouslyAllowSVG": true,
    "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;"
  }
}
```

## Content Disposition

Control the `Content-Disposition` header:

```json
{
  "images": {
    "contentDispositionType": "inline"
  }
}
```

Values:

- `inline` - Display in browser
- `attachment` - Download file

## Complete Example

```json
{
  "images": {
    "sizes": [256, 640, 1080, 2048, 3840],
    "qualities": [50, 75, 90],
    "formats": ["image/avif", "image/webp"],
    "localPatterns": [
      {
        "pathname": "^/assets/.*$",
        "search": ""
      }
    ],
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "cdn.example.com",
        "pathname": "^/images/.*$"
      }
    ],
    "minimumCacheTTL": 86400,
    "dangerouslyAllowSVG": false,
    "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;",
    "contentDispositionType": "inline"
  }
}
```
