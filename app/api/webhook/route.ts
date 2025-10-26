import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addWebhookToQueue, SupportedProvider } from '@/lib/queue';
import { limit } from '@/lib/ratelimiter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function resolveProvider(raw: string | null): SupportedProvider | null {
  if (!raw) return null;
  const normalized = raw.toLowerCase();
  if (normalized === 'github' || normalized === 'notion' || normalized === 'custom' || normalized === 'slack') {
    return normalized;
  }
  return null;
}

function resolveClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;
  return 'unknown';
}

function verifySlackSignature(body: string, signature: string, secret: string, timestamp: string): boolean {
  if (!secret) return false;

  const basestring = `v0:${timestamp}:${body}`;
  const expectedSignature = createHmac('sha256', secret)
    .update(basestring, 'utf8')
    .digest('hex');

  return signature === `v0=${expectedSignature}`;
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

  const provider = resolveProvider(request.headers.get('x-provider'));

  // Slack uses signature verification instead of secret header
  let payload: unknown;
  if (provider === 'slack') {
    const slackSignature = request.headers.get('x-slack-signature');
    const slackTimestamp = request.headers.get('x-slack-request-timestamp');

    if (!slackSignature || !slackTimestamp) {
      logger.error('Missing Slack signature headers', { ip });
      return NextResponse.json({ error: 'missing_slack_headers' }, { status: 401 });
    }

    // Check timestamp to prevent replay attacks (5 minutes tolerance)
    const now = Math.floor(Date.now() / 1000);
    const timestamp = parseInt(slackTimestamp, 10);
    if (Math.abs(now - timestamp) > 300) {
      logger.error('Slack timestamp too old', { ip, timestamp, now });
      return NextResponse.json({ error: 'timestamp_too_old' }, { status: 401 });
    }

    const body = await request.text();
    if (!verifySlackSignature(body, slackSignature, ENV.SLACK_SIGNING_SECRET, slackTimestamp)) {
      logger.error('Invalid Slack signature', { ip });
      return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
    }

    // Parse payload from body since we consumed it
    try {
      payload = body ? JSON.parse(body) : {};
    } catch (err) {
      const error = err as Error;
      logger.error('Failed to parse Slack webhook payload', { ip, error: error.message });
      return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }
  } else {
    const secret = request.headers.get('x-webhook-secret');
    if (!secret) {
      logger.error('Missing webhook secret header', { ip });
      return NextResponse.json({ error: 'missing_secret' }, { status: 401 });
    }

    // Use timing-safe comparison to prevent timing attacks
    const expectedSecret = Buffer.from(ENV.WEBHOOK_SECRET);
    const receivedSecret = Buffer.from(secret);

    if (expectedSecret.length !== receivedSecret.length ||
        !timingSafeEqual(expectedSecret, receivedSecret)) {
      logger.error('Invalid webhook secret received', { ip });
      return NextResponse.json({ error: 'invalid_secret' }, { status: 401 });
    }

    try {
      const buffer = await request.arrayBuffer();
      const text = new TextDecoder().decode(buffer);
      payload = text ? JSON.parse(text) : {};
    } catch (err) {
      const error = err as Error;
      logger.error('Failed to parse webhook payload', { ip, error: error.message });
      return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }
  }

  // Provider validation is already done above
  if (!provider) {
    logger.warn('Unsupported webhook provider', { provider: request.headers.get('x-provider') });
    return NextResponse.json(
      {
        error: 'unsupported_provider',
        supported: ['github', 'notion', 'custom', 'slack'],
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
