import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    console.error('[chat.ask] invalid json', error);
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const message = typeof (body as { message?: unknown }).message === 'string'
    ? (body as { message: string }).message.trim()
    : '';

  if (!message) {
    return NextResponse.json({ error: 'message_required' }, { status: 400 });
  }

  if (message.length > 500) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 422 });
  }

  const reply = `คุณถามว่า: "${message}". นี่คือคำตอบตัวอย่าง.`;
  return NextResponse.json({ reply });
}
