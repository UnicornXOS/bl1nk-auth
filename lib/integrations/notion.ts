import { Client } from '@notionhq/client';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';

type NotionPayload = {
  type?: string;
  title?: string;
  properties?: Record<string, unknown>;
};

let cachedClient: Client | null = null;

function getClient(): Client {
  if (!ENV.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY environment variable is not set');
  }
  if (!cachedClient) {
    cachedClient = new Client({ auth: ENV.NOTION_API_KEY });
  }
  return cachedClient;
}

export async function processNotionWebhook(payload: unknown): Promise<void> {
  if (!ENV.NOTION_TASKS_DB_ID) {
    throw new Error('NOTION_TASKS_DB_ID environment variable is not set');
  }

  if (typeof payload !== 'object' || payload === null) {
    logger.warn('Notion webhook payload is not an object');
    return;
  }

  const data = payload as NotionPayload;

  if (data.type !== 'new_task' || !data.title) {
    logger.debug('Notion webhook ignored - unsupported payload', { type: data.type });
    return;
  }

  const notion = getClient();
  await notion.pages.create({
    parent: { database_id: ENV.NOTION_TASKS_DB_ID },
    properties: {
      Name: {
        title: [
          {
            text: { content: data.title },
          },
        ],
      },
      Status: {
        select: { name: 'Pending' },
      },
      ...(data.properties ?? {}),
    },
  });

  logger.info('Created Notion task from webhook', { title: data.title });
}
