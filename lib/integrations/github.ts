import { Octokit } from '@octokit/rest';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';

type GithubPayload = {
  action?: string;
  issue?: {
    number: number;
  };
  repository?: {
    name: string;
    owner?: { login?: string };
  };
};

let cachedOctokit: Octokit | null = null;

function getOctokit(): Octokit {
  if (!ENV.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }
  if (!cachedOctokit) {
    cachedOctokit = new Octokit({ auth: ENV.GITHUB_TOKEN });
  }
  return cachedOctokit;
}

export async function processGithubWebhook(payload: unknown): Promise<void> {
  if (typeof payload !== 'object' || payload === null) {
    logger.warn('GitHub webhook payload is not an object');
    return;
  }

  const data = payload as GithubPayload;
  const repository = data.repository;
  const issue = data.issue;
  const action = data.action;

  if (!repository?.owner?.login || !repository.name || !issue?.number) {
    logger.info('GitHub webhook missing actionable fields', { action });
    return;
  }

  if (action !== 'opened') {
    logger.debug('GitHub webhook ignored - unsupported action', { action });
    return;
  }

  const octokit = getOctokit();
  const owner = repository.owner.login;
  const repo = repository.name;

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: issue.number,
    body: 'ขอบคุณที่สร้าง issue! ทีมงานจะรีวิวเร็วๆ นี้',
  });

  logger.info('Posted GitHub issue acknowledgement', { owner, repo, issue: issue.number });
}
