import { NextResponse } from 'next/server';

import type { Worker } from 'bullmq';

import { createWorker, type WebhookJob } from '@/lib/queue';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_PROCESSING_TIME = 9000;

export async function GET(): Promise<NextResponse> {
  const start = Date.now();
  let worker: Worker<WebhookJob> | null = null;

  try {
    worker = createWorker();
  } catch (err) {
    const error = err as Error;
    logger.error('Unable to start worker - queue unavailable', { error: { message: error.message, stack: error.stack } });
    return NextResponse.json({ error: 'queue_unavailable' }, { status: 503 });
  }

  if (!worker) {
    return NextResponse.json({ error: 'queue_unavailable' }, { status: 503 });
  }

  let processed = 0;

  worker.on('completed', () => {
    processed += 1;
  });

  try {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, MAX_PROCESSING_TIME);

      worker.on('drained', () => {
        clearTimeout(timer);
        resolve();
      });

      worker
        .run()
        .then(() => {
          clearTimeout(timer);
          resolve();
        })
        .catch((err) => {
          logger.error('Worker runtime error', { error: (err as Error).message });
          clearTimeout(timer);
          resolve();
        });
    });

    const duration = Date.now() - start;
    logger.info('Worker processed jobs', { processed, duration });

    return NextResponse.json(
      {
        status: 'success',
        processed,
        duration,
      },
      { status: 200 },
    );
  } catch (err) {
    const error = err as Error;
    logger.error('Worker processing failed', { error: error.message });
    return NextResponse.json({ error: 'worker_failed' }, { status: 500 });
  } finally {
    if (worker) {
      try {
        await worker.close();
      } catch (err) {
        const error = err as Error;
        logger.error('Failed to close worker', { error: { message: error.message, stack: error.stack } });
      }
    }
  }
}
