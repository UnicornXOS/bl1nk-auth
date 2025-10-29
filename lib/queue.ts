import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import {
  processCustomWebhook,
  processGithubWebhook,
  processNotionWebhook,
  processSlackWebhook,
  processCodeReviewWebhook,
} from '@/lib/integrations';

export type SupportedProvider = 'github' | 'notion' | 'custom' | 'slack' | 'code-review';

export type WebhookJob = {
  provider: SupportedProvider;
  payload: unknown;
  ip: string;
  timestamp: number;
};

export type CodeReviewJob = {
  provider: 'code-review';
  repository: string;
  pullRequest: number;
  author: string;
  branch: string;
  baseBranch: string;
  changedFiles: Array<{
    filename: string;
    status: 'added' | 'modified' | 'deleted' | 'renamed';
    additions: number;
    deletions: number;
    patch?: string;
  }>;
  timestamp: number;
};

function createRedisConnection(): IORedis {
  if (!ENV.UPSTASH_REDIS_URL || ENV.UPSTASH_REDIS_URL.includes('your_')) {
    throw new Error('UPSTASH_REDIS_URL environment variable is not properly configured');
  }

  if (!ENV.UPSTASH_REDIS_TOKEN || ENV.UPSTASH_REDIS_TOKEN.includes('your_')) {
    throw new Error('UPSTASH_REDIS_TOKEN environment variable is not properly configured');
  }

  return new IORedis(ENV.UPSTASH_REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
    tls: ENV.UPSTASH_REDIS_URL.startsWith('rediss://') ? {} : undefined,
  });
}

export const webhookQueue = new Queue<WebhookJob>('webhook-queue', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 20,
  },
});

export const codeReviewQueue = new Queue<CodeReviewJob>('code-review-queue', {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: 50,
    removeOnFail: 10,
  },
});

export async function addWebhookToQueue(job: WebhookJob): Promise<void> {
  await webhookQueue.add('webhook-job', job);
}

export async function addCodeReviewToQueue(job: CodeReviewJob): Promise<void> {
  await codeReviewQueue.add('code-review-job', job);
}

export function createWorker(): Worker<WebhookJob> {
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
        case 'slack':
          await processSlackWebhook(job.data.payload);
          break;
        case 'code-review':
          await processCodeReviewWebhook(job.data as unknown as CodeReviewJob);
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
      connection: createRedisConnection(),
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

export async function getCodeReviewQueueStats(): Promise<{
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  total: number;
}> {
  const [waiting, active, completed, failed] = await Promise.all([
    codeReviewQueue.getWaitingCount(),
    codeReviewQueue.getActiveCount(),
    codeReviewQueue.getCompletedCount(),
    codeReviewQueue.getFailedCount(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    total: waiting + active + completed + failed,
  };
}
