import { logger } from '@/lib/logger';

type CustomPayload = Record<string, unknown>;

export async function processCustomWebhook(payload: unknown): Promise<void> {
  const data: CustomPayload | null =
    typeof payload === 'object' && payload !== null ? (payload as CustomPayload) : null;

  if (!data) {
    logger.warn('Custom webhook payload is not an object');
    return;
  }

  logger.info('Received custom webhook payload', data);
}
