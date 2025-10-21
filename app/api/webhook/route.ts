import { NextRequest, NextResponse } from 'next/server';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addWebhookToQueue, SupportedProvider } from '@/lib/queue';
import { limit } from '@/lib/ratelimiter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function resolveProvider(raw: string | null): SupportedProvider | null {
  if (!raw) return null;
  const normalized = raw.toLowerCase();
  if (normalized === 'github' || normalized === 'notion' || normalized === 'custom') {
    return normalized;
  }
  return null;
}

function sanitizeIp(ip: string): string {
  if (!ip) return '';
  // trim and remove surrounding quotes first
  let trimmed = ip.trim().replace(/^['"]+|['"]+$/g, '').trim();

  // If bracketed IPv6 like [::1] or [::1]:1234, extract inside brackets and drop zone id
  if (trimmed.startsWith('[')) {
    const closingIndex = trimmed.indexOf(']');
    if (closingIndex > 0) {
      const inside = trimmed.slice(1, closingIndex);
      return inside.split('%')[0]; // drop zone id if present
    }
  }

  // IPv4 with optional port (e.g. 1.2.3.4:5678) — validate octets <= 255
  const ipv4Match = trimmed.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?$/);
  if (ipv4Match) {
    const octets = ipv4Match[1].split('.').map(n => Number(n));
    if (octets.length === 4 && octets.every(o => o >= 0 && o <= 255)) {
      return octets.join('.');
    }
  }

  // Strip a trailing numeric port for non-bracketed addresses when clearly present
  const lastColon = trimmed.lastIndexOf(':');
  if (lastColon > -1) {
    const possiblePort = trimmed.slice(lastColon + 1);
    // If possiblePort is purely digits and there is at least one other colon (likely IPv6) treat port removal carefully:
    if (/^\d+$/.test(possiblePort) && trimmed.indexOf(':') !== lastColon) {
      trimmed = trimmed.slice(0, lastColon);
    } else if (/^\d+$/.test(possiblePort) && trimmed.indexOf(':') === lastColon) {
      // non-colon separated (unlikely) but remove port if it appears to be appended to IPv4
      trimmed = trimmed.slice(0, lastColon);
    }
  }

  // Remove zone id if present (e.g. fe80::1%eth0)
  trimmed = trimmed.split('%')[0];

  // Remove any remaining surrounding brackets and return
  return trimmed.replace(/^\[|\]$/g, '').trim();
}

function firstHeaderValue(header: string | null): string | null {
  if (!header) return null;
  for (const segment of header.split(',')) {
    const candidate = segment.trim();
    if (candidate) {
      const sanitized = sanitizeIp(candidate);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return null;
}

function parseForwarded(header: string | null): string | null {
  if (!header) return null;
  const entries = header.split(',');
  for (const entry of entries) {
    const match = entry.match(/for=([^;]+)/i);
    if (match?.[1]) {
      const sanitized = sanitizeIp(match[1]);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return null;
}

function resolveClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const forwarded = request.headers.get('forwarded');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const xRealIp = request.headers.get('x-real-ip');
  const xClientIp = request.headers.get('x-client-ip');

  const headerOrder: Array<() => string | null> = [
    () => firstHeaderValue(xForwardedFor),
    () => parseForwarded(forwarded),
    () => firstHeaderValue(cfConnectingIp),
    () => firstHeaderValue(xRealIp),
    () => firstHeaderValue(xClientIp),
  ];

  for (const resolver of headerOrder) {
    const value = resolver();
    if (value) {
      return value;
    }
  }

  return 'unknown';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!ENV.WEBHOOK_SECRET) {
    logger.error('Webhook secret is not configured');
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }

  const ip = resolveClientIp(request);
  const rateResult = await limit(ip);
  if (!rateResult.success) {
    logger.warn('Rate limit exceeded', { ip, limit: rateResult.limit, reset: rateResult.reset });
    return NextResponse.json(
      {
        error: 'rate_limit_exceeded',
        reset: new Date(rateResult.reset).toISOString(),
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(rateResult.limit),
          'X-RateLimit-Remaining': String(rateResult.remaining),
          'X-RateLimit-Reset': String(rateResult.reset),
        },
      },
    );
  }

  const secret = request.headers.get('x-webhook-secret');
  if (secret !== ENV.WEBHOOK_SECRET) {
    logger.error('Invalid webhook secret received', { ip });
    return NextResponse.json({ error: 'invalid_secret' }, { status: 401 });
  }

  let payload: unknown;
  try {
    const buffer = await request.arrayBuffer();
    const text = new TextDecoder().decode(buffer);
    payload = text ? JSON.parse(text) : {};
  } catch (err) {
    const error = err as Error;
    logger.error('Failed to parse webhook payload', { ip, error: error.message });
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const providerHeader = request.headers.get('x-provider');
  const provider = resolveProvider(providerHeader);
  if (!provider) {
    logger.warn('Unsupported webhook provider', { provider: providerHeader });
    return NextResponse.json(
      {
        error: 'unsupported_provider',
        supported: ['github', 'notion', 'custom'],
      },
      { status: 400 },
    );
  }

  try {
    await addWebhookToQueue({
      provider,
      payload,
      ip,
      timestamp: Date.now(),
    });
  } catch (err) {
    const error = err as Error;
    logger.error('Failed to enqueue webhook job', { error: error.message, provider });
    return NextResponse.json({ error: 'enqueue_failed' }, { status: 500 });
  }

  return NextResponse.json(
    {
      status: 'accepted',
      message: 'Webhook enqueued for processing',
    },
    { status: 202 },
  );
}
