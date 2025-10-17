import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

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
    console.error('[webhook] misconfiguration', error);
    return NextResponse.json({ ok: false, error: 'misconfigured' }, { status: 500 });
  }

  const signature = req.headers.get('x-webhook-signature');
  if (!isValidSignature(signature, secret)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let event: unknown;
  try {
    event = await req.json();
  } catch (error) {
    console.error('[webhook] invalid json payload', error);
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const type = typeof (event as { type?: unknown }).type === 'string'
    ? (event as { type: string }).type
    : 'unknown';
  console.info('[webhook] event received', { type });
  return NextResponse.json({ ok: true });
}
