# Cron Jobs

Schedule functions to run at specific times.

## Basic Configuration

```json
{
  "crons": [{
    "path": "/api/cron/daily",
    "schedule": "0 0 * * *"
  }]
}
```

## Cron Object

- `path` (required) - API route to invoke (must start with `/`)
- `schedule` (required) - Cron expression

Limits:

- Max 512 characters for `path`
- Max 256 characters for `schedule`

## Cron Expressions

Format: `minute hour day month weekday`

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Weekday (0-7, 0 and 7 = Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

## Common Schedules

### Every Minute

```json
{
  "crons": [{
    "path": "/api/cron/every-minute",
    "schedule": "* * * * *"
  }]
}
```

### Every Hour

```json
{
  "crons": [{
    "path": "/api/cron/hourly",
    "schedule": "0 * * * *"
  }]
}
```

### Every Day at Midnight (UTC)

```json
{
  "crons": [{
    "path": "/api/cron/daily",
    "schedule": "0 0 * * *"
  }]
}
```

### Every Monday at 9 AM

```json
{
  "crons": [{
    "path": "/api/cron/weekly",
    "schedule": "0 9 * * 1"
  }]
}
```

### First Day of Month

```json
{
  "crons": [{
    "path": "/api/cron/monthly",
    "schedule": "0 0 1 * *"
  }]
}
```

### Every 15 Minutes

```json
{
  "crons": [{
    "path": "/api/cron/quarter-hour",
    "schedule": "*/15 * * * *"
  }]
}
```

### Business Hours (9 AM - 5 PM, Mon-Fri)

```json
{
  "crons": [{
    "path": "/api/cron/business-hours",
    "schedule": "0 9-17 * * 1-5"
  }]
}
```

## Multiple Cron Jobs

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/backup",
      "schedule": "0 3 * * 0"
    },
    {
      "path": "/api/cron/notifications",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

## Cron Handler Example

Create the API route that will be invoked:

```typescript
// app/api/cron/daily/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Your cron logic here
  console.log('Daily cron job executed');

  return NextResponse.json({ success: true });
}
```

## Security

Always verify cron requests:

1. Set `CRON_SECRET` environment variable
2. Check `authorization` header in your handler
3. Return 401 for unauthorized requests

## Timezone

All cron schedules use UTC timezone. Convert your local time to UTC when setting schedules.

## Testing

Test cron jobs locally by calling the API route directly:

```bash
curl http://localhost:3000/api/cron/daily \
  -H "Authorization: Bearer your-secret"
```
