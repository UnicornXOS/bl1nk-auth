import { NextResponse } from 'next/server';

import { getQueueStats } from '@/lib/queue';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getQueueStats();
    return NextResponse.json({ status: 'ok', stats }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    logger.error('Failed to fetch queue stats', { error: error.message });
    return NextResponse.json({ error: 'stats_unavailable' }, { status: 500 });
  }
}
