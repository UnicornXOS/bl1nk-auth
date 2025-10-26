import { NextRequest } from 'next/server';
import { createHmac } from 'crypto';
import { timingSafeEqual } from 'crypto';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addCodeReviewToQueue } from '@/lib/queue';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Verify GitHub webhook signature
    const signature = req.headers.get('x-hub-signature-256');
    const body = await req.text();

    if (!signature || !ENV.GITHUB_WEBHOOK_SECRET) {
      logger.warn('Missing GitHub webhook signature or secret');
      return new Response('Unauthorized', { status: 401 });
    }

    // Verify signature
    const expectedSignature = createHmac('sha256', ENV.GITHUB_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    const expectedBuffer = Buffer.from(`sha256=${expectedSignature}`, 'ascii');
    const signatureBuffer = Buffer.from(signature, 'ascii');

    if (signatureBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(signatureBuffer, expectedBuffer)) {
      logger.warn('Invalid GitHub webhook signature');
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse webhook payload
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      logger.error('Invalid JSON in GitHub webhook payload', { error: error instanceof Error ? error.message : 'Unknown error' });
      return new Response('Bad Request', { status: 400 });
    }

    // Handle different GitHub webhook events
    const eventType = req.headers.get('x-github-event');

    switch (eventType) {
      case 'pull_request':
        await handlePullRequestEvent(payload);
        break;
      case 'push':
        await handlePushEvent(payload);
        break;
      case 'issues':
        await handleIssuesEvent(payload);
        break;
      default:
        logger.info('Unhandled GitHub webhook event', { eventType });
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    logger.error('GitHub webhook processing error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response('Internal Server Error', { status: 500 });
  }
}

async function handlePullRequestEvent(payload: any): Promise<void> {
  const action = payload.action;
  const pullRequest = payload.pull_request;
  const repository = payload.repository;

  if (!pullRequest || !repository) {
    logger.warn('Missing pull request or repository data in GitHub webhook');
    return;
  }

  logger.info('Processing GitHub pull request event', {
    action,
    repository: repository.full_name,
    pullRequest: pullRequest.number,
    author: pullRequest.user.login,
  });

  // Only process when PR is opened or synchronized (new commits)
  if (action === 'opened' || action === 'synchronize') {
    await enqueueCodeReview({
      repository: repository.full_name,
      pullRequest: pullRequest.number,
      author: pullRequest.user.login,
      branch: pullRequest.head.ref,
      baseBranch: pullRequest.base.ref,
      changedFiles: [], // Will be fetched by the worker
      timestamp: Date.now(),
    });
  }
}

async function handlePushEvent(payload: any): Promise<void> {
  const repository = payload.repository;
  const ref = payload.ref;

  if (!repository || !ref) {
    logger.warn('Missing repository or ref data in GitHub push webhook');
    return;
  }

  // Only process pushes to main branches
  if (!ref.endsWith('/main') && !ref.endsWith('/master') && !ref.endsWith('/develop')) {
    return;
  }

  logger.info('Processing GitHub push event', {
    repository: repository.full_name,
    ref,
    commits: payload.commits?.length || 0,
  });

  // Could trigger deployment notifications here
  // await sendDeploymentNotification('in-progress', {...});
}

async function handleIssuesEvent(payload: any): Promise<void> {
  const action = payload.action;
  const issue = payload.issue;
  const repository = payload.repository;

  if (!issue || !repository) {
    logger.warn('Missing issue or repository data in GitHub webhook');
    return;
  }

  logger.info('Processing GitHub issues event', {
    action,
    repository: repository.full_name,
    issue: issue.number,
    author: issue.user.login,
  });

  // Could trigger notifications for issue creation, etc.
}

async function enqueueCodeReview(job: any): Promise<void> {
  try {
    await addCodeReviewToQueue(job);
    logger.info('Code review job enqueued successfully', {
      repository: job.repository,
      pullRequest: job.pullRequest,
    });
  } catch (error) {
    logger.error('Failed to enqueue code review job', {
      error: error instanceof Error ? error.message : 'Unknown error',
      repository: job.repository,
      pullRequest: job.pullRequest,
    });
    throw error;
  }
}