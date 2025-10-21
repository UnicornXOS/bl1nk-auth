import { NextResponse } from 'next/server';

import { createWorker } from '@/lib/queue';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_PROCESSING_TIME = 9000;

export async function GET(): Promise<NextResponse> {
  const start = Date.now();
  const worker = createWorker();
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
    await worker.close();
  }
}
