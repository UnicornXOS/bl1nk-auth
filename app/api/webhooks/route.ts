import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';

function getSecret(): string {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('WEBHOOK_SECRET is not configured');
  }
  return secret;
}

function isValidSignature(signature: string | null, secret: string): boolean {
  if (!signature) {
    return false;
  }
  const expected = Buffer.from(secret);
  const received = Buffer.from(signature);
  if (expected.length !== received.length) {
    return false;
  }
  try {
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let secret: string;
  try {
    secret = getSecret();
  } catch (error) {
    logger.error('Webhook misconfiguration', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: 'webhooks'
    });
    return NextResponse.json({ ok: false, error: 'misconfigured' }, { status: 500 });
  }

  const signature = req.headers.get('x-webhook-signature');
  if (!isValidSignature(signature, secret)) {
    logger.warn('Invalid webhook signature', {
      endpoint: 'webhooks',
      hasSignature: !!signature
    });
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let event: unknown;
  try {
    event = await req.json();
  } catch (error) {
    logger.error('Invalid JSON payload in webhook', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: 'webhooks'
    });
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const type = typeof (event as { type?: unknown }).type === 'string'
    ? (event as { type: string }).type
    : 'unknown';

  logger.info('Webhook event received', {
    type,
    endpoint: 'webhooks'
  });

  return NextResponse.json({ ok: true });
}
