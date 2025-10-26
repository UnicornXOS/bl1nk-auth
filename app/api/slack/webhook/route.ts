import { NextRequest, NextResponse } from 'next/server';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addWebhookToQueue } from '@/lib/queue';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function resolveClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;
  return 'unknown';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!ENV.SLACK_SIGNING_SECRET) {
    logger.error('Slack signing secret is not configured');
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
  }

  try {
    const body = await request.text();
    const payload = JSON.parse(body);

    // Handle Slack URL verification challenge
    if (payload.challenge) {
      logger.info('Slack URL verification challenge received');
      return NextResponse.json({ challenge: payload.challenge });
    }

    // Only process event_callback type events
    if (payload.type !== 'event_callback') {
      logger.debug('Ignoring non-event_callback payload', { type: payload.type });
      return NextResponse.json({ ok: true });
    }

    // Verify the request token matches our app
    if (payload.token && payload.token !== ENV.SLACK_BOT_TOKEN?.split('-')[0]) {
      logger.error('Invalid Slack token', { receivedToken: payload.token });
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }

    // Add to queue for processing
    await addWebhookToQueue({
      provider: 'slack',
      payload,
      ip: resolveClientIp(request),
      timestamp: Date.now(),
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    logger.error('Slack webhook processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}