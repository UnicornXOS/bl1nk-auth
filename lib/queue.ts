import { Queue, Worker, type Job } from 'bullmq';
import IORedis from 'ioredis';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import {
  processCustomWebhook,
  processGithubWebhook,
  processNotionWebhook,
} from '@/lib/integrations';

export type SupportedProvider = 'github' | 'notion' | 'custom';

export type WebhookJob = {
  provider: SupportedProvider;
  payload: unknown;
  ip: string;
  timestamp: number;
};

let missingRedisWarningLogged = false;

function createRedisConnection(): IORedis | null {
  if (!ENV.UPSTASH_REDIS_URL || !ENV.UPSTASH_REDIS_TOKEN) {
    if (!missingRedisWarningLogged) {
      logger.warn('Queue disabled - missing Upstash Redis credentials');
      missingRedisWarningLogged = true;
    }
    return null;
  }

  return new IORedis(ENV.UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
    tls: ENV.UPSTASH_REDIS_URL.startsWith('rediss://') ? {} : undefined,
  });
}

function createQueue(): Queue<WebhookJob> | null {
  const connection = createRedisConnection();
  if (!connection) {
    return null;
  }

  return new Queue<WebhookJob>('webhook-queue', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 20,
    },
  });
}

export const webhookQueue = createQueue();

export async function addWebhookToQueue(job: WebhookJob): Promise<void> {
  if (!webhookQueue) {
    throw new Error('Queue is disabled - missing Upstash Redis credentials');
  }

  await webhookQueue.add('webhook-job', job);
}

export function createWorker(): Worker<WebhookJob> {
  const connection = createRedisConnection();
  if (!connection) {
    throw new Error('Queue is disabled - cannot create worker');
  }

  const worker = new Worker<WebhookJob>(
    'webhook-queue',
    async (job) => {
      logger.info('Processing webhook job', {
        jobId: job.id,
        provider: job.data.provider,
        attempts: job.attemptsMade,
      });

      switch (job.data.provider) {
        case 'github':
          await processGithubWebhook(job.data.payload);
          break;
        case 'notion':
          await processNotionWebhook(job.data.payload);
          break;
        case 'custom':
          await processCustomWebhook(job.data.payload);
          break;
        default:
          throw new Error(`Unsupported provider: ${job.data.provider}`);
      }

      logger.info('Webhook processed successfully', {
        jobId: job.id,
        provider: job.data.provider,
      });
    },
    {
      autorun: false,
      connection,
    },
  );

  worker.on('failed', (job, err) => {
    if (!job) return;
    logger.error('Webhook job failed', {
      jobId: job.id,
      provider: job.data.provider,
      error: err.message,
    });
  });

  return worker;
}

export async function getQueueStats(): Promise<{
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  total: number;
}> {
  if (!webhookQueue) {
    throw new Error('Queue is disabled - missing Upstash Redis credentials');
  }

  const [waiting, active, completed, failed] = await Promise.all([
    webhookQueue.getWaitingCount(),
    webhookQueue.getActiveCount(),
    webhookQueue.getCompletedCount(),
    webhookQueue.getFailedCount(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    total: waiting + active + completed + failed,
  };
}

export async function getRecentFailedJobs(limit: number): Promise<Job<WebhookJob>[]> {
  if (!webhookQueue) {
    throw new Error('Queue is disabled - missing Upstash Redis credentials');
  }

  const end = Math.max(limit - 1, 0);
  return webhookQueue.getFailed(0, end);
}
