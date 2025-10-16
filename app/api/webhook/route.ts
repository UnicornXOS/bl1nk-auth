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

function resolveClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;
  return request.ip ?? 'unknown';
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
