import { WebClient } from '@slack/web-api';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';

type SlackPayload = {
  type?: string;
  event?: {
    type?: string;
    channel?: string;
    user?: string;
    text?: string;
    ts?: string;
  };
  challenge?: string;
  token?: string;
};

let cachedClient: WebClient | null = null;

function getSlackClient(): WebClient {
  if (!ENV.SLACK_BOT_TOKEN) {
    throw new Error('SLACK_BOT_TOKEN environment variable is not set');
  }
  if (!cachedClient) {
    cachedClient = new WebClient(ENV.SLACK_BOT_TOKEN);
  }
  return cachedClient;
}

export async function processSlackWebhook(payload: unknown): Promise<void> {
  if (typeof payload !== 'object' || payload === null) {
    logger.warn('Slack webhook payload is not an object');
    return;
  }

  const data = payload as SlackPayload;

  // Handle Slack URL verification challenge
  if (data.challenge) {
    logger.info('Slack URL verification challenge received');
    return; // The challenge response is handled by the route
  }

  // Handle different event types
  if (data.event?.type === 'message' && data.event.text) {
    await handleMessageEvent(data.event);
  } else if (data.event?.type === 'app_mention') {
    await handleAppMentionEvent(data.event);
  } else if (data.type === 'event_callback') {
    await handleEventCallback(data);
  }

  logger.info('Processed Slack webhook', { eventType: data.event?.type || data.type });
}

async function handleMessageEvent(event: SlackPayload['event']): Promise<void> {
  if (!event?.channel || !event?.user || !event?.text) return;

  // Example: Respond to security-related messages
  if (event.text.toLowerCase().includes('security') || event.text.toLowerCase().includes('breach')) {
    const slack = getSlackClient();
    await slack.chat.postMessage({
      channel: event.channel,
      text: '🚨 Security alert detected! Please check the dashboard for details.',
      thread_ts: event.ts,
    });
  }

  // Example: Respond to deployment status queries
  if (event.text.toLowerCase().includes('deploy') || event.text.toLowerCase().includes('status')) {
    const slack = getSlackClient();
    await slack.chat.postMessage({
      channel: event.channel,
      text: '🔄 Checking deployment status...',
      thread_ts: event.ts,
    });
  }
}

async function handleAppMentionEvent(event: SlackPayload['event']): Promise<void> {
  if (!event?.channel || !event?.text) return;

  const slack = getSlackClient();
  const helpText = `
🤖 *Webhook Bot Commands:*
• \`@bot status\` - Check system status
• \`@bot security\` - View security alerts
• \`@bot deploy <branch>\` - Trigger deployment
• \`@bot help\` - Show this help
  `;

  await slack.chat.postMessage({
    channel: event.channel,
    text: helpText,
    thread_ts: event.ts,
  });
}

async function handleEventCallback(data: SlackPayload): Promise<void> {
  // Handle other event types like reaction_added, etc.
  logger.info('Received Slack event callback', { eventType: data.event?.type });
}

// Utility functions for sending notifications
export async function sendSecurityNotification(message: string, channel?: string): Promise<void> {
  const slack = getSlackClient();
  const targetChannel = channel || ENV.SLACK_DEFAULT_CHANNEL || '#security';

  await slack.chat.postMessage({
    channel: targetChannel,
    text: `🚨 *Security Alert*\n${message}`,
  });

  logger.info('Sent security notification to Slack', { channel: targetChannel });
}

export async function sendCodeReviewNotification(pr: {
  repository: string;
  pullRequest: number;
  author: string;
  branch: string;
  analysis: {
    overallScore: number;
    securityIssues: Array<{ severity: string; message: string }>;
    summary: string;
  };
}, channel?: string): Promise<void> {
  const slack = getSlackClient();
  const targetChannel = channel || ENV.SLACK_DEFAULT_CHANNEL || '#code-review';

  const scoreEmoji = pr.analysis.overallScore >= 90 ? '🟢' :
                    pr.analysis.overallScore >= 70 ? '🟡' : '🔴';

  const criticalIssues = pr.analysis.securityIssues.filter(i => i.severity === 'critical').length;
  const highIssues = pr.analysis.securityIssues.filter(i => i.severity === 'high').length;

  let text = `🤖 *Automated Code Review*\n`;
  text += `*${pr.repository}* #${pr.pullRequest}\n`;
  text += `Branch: \`${pr.branch}\` | Author: ${pr.author}\n`;
  text += `${scoreEmoji} Score: **${pr.analysis.overallScore}/100**\n\n`;

  if (criticalIssues > 0 || highIssues > 0) {
    text += `⚠️ *Security Issues:*\n`;
    if (criticalIssues > 0) text += `• ${criticalIssues} Critical\n`;
    if (highIssues > 0) text += `• ${highIssues} High\n`;
    text += `\n`;
  }

  text += `*Summary:* ${pr.analysis.summary}\n\n`;
  text += `<${getPRUrl(pr.repository, pr.pullRequest)}|View Pull Request>`;

  await slack.chat.postMessage({
    channel: targetChannel,
    text,
  });

  logger.info('Sent code review notification to Slack', {
    channel: targetChannel,
    repository: pr.repository,
    pullRequest: pr.pullRequest,
    score: pr.analysis.overallScore,
  });
}

function getPRUrl(repository: string, pullRequest: number): string {
  return `https://github.com/${repository}/pull/${pullRequest}`;
}

export async function sendDeploymentNotification(status: 'success' | 'failed' | 'in-progress', details: {
  branch: string;
  commit: string;
  url?: string;
}, channel?: string): Promise<void> {
  const slack = getSlackClient();
  const targetChannel = channel || ENV.SLACK_DEFAULT_CHANNEL || '#deployments';

  const emoji = status === 'success' ? '✅' : status === 'failed' ? '❌' : '🔄';
  const statusText = status === 'success' ? 'Successful' : status === 'failed' ? 'Failed' : 'In Progress';

  await slack.chat.postMessage({
    channel: targetChannel,
    text: `${emoji} *Deployment ${statusText}*\nBranch: \`${details.branch}\`\nCommit: \`${details.commit.substring(0, 7)}\`${details.url ? `\n${details.url}` : ''}`,
  });

  logger.info('Sent deployment notification to Slack', { channel: targetChannel, status });
}