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

function stripWrappingCharacters(value: string): string {
  const trimmed = value.trim();
  let start = 0;
  let end = trimmed.length;

  // Only strip matching pairs: matching quotes or matching square brackets.
  while (start < end) {
    const startChar = trimmed[start];
    const endChar = trimmed[end - 1];

    if ((startChar === '"' && endChar === '"') ||
        (startChar === "'" && endChar === "'") ||
        (startChar === '[' && endChar === ']')) {
      start += 1;
      end -= 1;
      continue;
    }

    break;
  }

  return trimmed.slice(start, end).trim();
}

function extractIpv4(candidate: string): string | null {
  const trimmed = candidate.trim();

  // If it's a bracketed address (likely IPv6) don't treat it as IPv4.
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return null;
  }

  // Capture the address portion before an optional :port suffix (but avoid naive splitting that breaks on IPv6-like input).
  const hostMatch = trimmed.match(/^([^:]+)(?::\d+)?$/);
  if (!hostMatch) return null;
  const withoutPort = hostMatch[1];

  const parts = withoutPort.split('.');
  if (parts.length !== 4) return null;

  for (const part of parts) {
    // allow only 1-3 digit decimal parts
    if (!/^\d{1,3}$/.test(part)) return null;
    const value = Number(part);
    if (!Number.isInteger(value) || value < 0 || value > 255) return null;
  }

  return parts.join('.');
}

function sanitizeIp(ip: string): string {
  const trimmed = ip.trim();
  const unwrapped = stripWrappingCharacters(trimmed);
  const ipv4 = extractIpv4(unwrapped);
  if (ipv4) {
    return ipv4;
  }

  return unwrapped;
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
  for (const entry of header.split(',')) {
    const trimmedEntry = entry.trim();
    if (!trimmedEntry) continue;

    for (const part of trimmedEntry.split(';')) {
      const separatorIndex = part.indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }

      const key = part.slice(0, separatorIndex).trim().toLowerCase();
      if (key !== 'for') {
        continue;
      }

      const rawValue = part.slice(separatorIndex + 1).trim();
      if (!rawValue) {
        continue;
      }

      const sanitized = sanitizeIp(rawValue);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return null;
}

function resolveClientIp(request: NextRequest): string {
  const headerOrder = [
    () => firstHeaderValue(request.headers.get('x-forwarded-for')),
    () => parseForwarded(request.headers.get('forwarded')),
    () => firstHeaderValue(request.headers.get('cf-connecting-ip')),
    () => firstHeaderValue(request.headers.get('x-real-ip')),
    () => firstHeaderValue(request.headers.get('x-client-ip')),
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
