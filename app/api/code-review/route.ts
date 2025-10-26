import { NextRequest } from 'next/server';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addCodeReviewToQueue } from '@/lib/queue';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Check if code review is enabled
    if (!ENV.CODE_REVIEW_ENABLED || ENV.CODE_REVIEW_ENABLED === 'false') {
      return new Response(JSON.stringify({
        error: 'Code review is disabled',
        message: 'CODE_REVIEW_ENABLED environment variable is not set to true'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      logger.error('Invalid JSON in code review request', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return new Response(JSON.stringify({
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate required fields
    const { repository, pullRequest, author, branch, baseBranch } = body;

    if (!repository || !pullRequest || !author || !branch) {
      return new Response(JSON.stringify({
        error: 'Missing required fields',
        message: 'repository, pullRequest, author, and branch are required',
        received: { repository, pullRequest, author, branch }
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create code review job
    const job = {
      provider: 'code-review' as const,
      repository,
      pullRequest: parseInt(pullRequest.toString(), 10),
      author,
      branch,
      baseBranch: baseBranch || 'main',
      changedFiles: [], // Will be fetched by the worker
      timestamp: Date.now(),
    };

    // Enqueue the job
    await addCodeReviewToQueue(job);

    logger.info('Code review job enqueued successfully', {
      repository,
      pullRequest: job.pullRequest,
      author,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Code review job enqueued successfully',
      jobId: `code-review-${repository}-${pullRequest}-${Date.now()}`,
      estimatedTime: '2-5 minutes'
    }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Code review API error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to process code review request'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({
    service: 'Automated Code Review API',
    version: '1.0.0',
    status: ENV.CODE_REVIEW_ENABLED === 'false' ? 'disabled' : 'enabled',
    features: [
      'Security vulnerability detection',
      'Code style analysis',
      'Complexity analysis',
      'Performance optimization suggestions',
      'Slack integration',
      'GitHub PR comments'
    ],
    endpoints: {
      'POST /api/code-review': 'Submit code review request',
      'POST /api/github/webhook': 'GitHub webhook integration'
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}