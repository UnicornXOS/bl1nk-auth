import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';

export type RateLimitContext = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

const redis = ENV.UPSTASH_REDIS_URL && ENV.UPSTASH_REDIS_TOKEN
  ? new Redis({ url: ENV.UPSTASH_REDIS_URL, token: ENV.UPSTASH_REDIS_TOKEN })
  : null;

const limiter = redis
  ? new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'),
    analytics: true,
    prefix: '@webhook/ratelimit',
  })
  : null;

export async function limit(identifier: string): Promise<RateLimitContext> {
  if (!limiter) {
    logger.warn('Rate limiter disabled - missing Upstash credentials');
    const now = Date.now();
    return { success: true, limit: 0, remaining: 0, reset: now };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
