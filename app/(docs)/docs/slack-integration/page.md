# Slack Integration Setup Guide

This guide will help you configure Slack integration for your webhook system, enabling automated notifications for security events, code review requests, and deployment status updates.

## Prerequisites

- A Slack workspace where you have admin privileges
- Node.js and npm installed
- Your webhook system deployed and accessible via HTTPS

## Step 1: Create a Slack App

1. Go to the [Slack API Apps page](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter your app name (e.g., "Webhook Bot")
5. Select your workspace
6. Click **"Create App"**

## Step 2: Configure App Settings

### Basic Information
1. In your app settings, go to **"Basic Information"**
2. Note down your **App ID** and **Client ID** for later use

### OAuth & Permissions
1. Go to **"OAuth & Permissions"** in the sidebar
2. Under **"Bot Token Scopes"**, add these permissions:
   - `chat:write` - Send messages
   - `chat:write.public` - Send messages to public channels
   - `channels:read` - View basic channel info
   - `groups:read` - View basic group info
   - `im:read` - View basic info about direct messages
   - `mpim:read` - View basic info about multiparty direct messages
   - `users:read` - View basic user info

### Event Subscriptions
1. Go to **"Event Subscriptions"** in the sidebar
2. Enable events by toggling **"Enable Events"**
3. Set **"Request URL"** to: `https://your-domain.com/api/slack/webhook`
4. Under **"Subscribe to bot events"**, add:
   - `message.channels`
   - `message.groups`
   - `message.im`
   - `message.mpim`
   - `app_mention`

## Step 3: Install the App

1. Go to **"OAuth & Permissions"**
2. Click **"Install App to Workspace"**
3. Review permissions and click **"Allow"**
4. Copy the **"Bot User OAuth Token"** (starts with `xoxb-`)

## Step 4: Get Your Signing Secret

1. Go to **"Basic Information"**
2. Scroll down to **"App Credentials"**
3. Copy the **"Signing Secret"**

## Step 5: Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Slack Integration
SLACK_SIGNING_SECRET=your_signing_secret_here
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
# Recommended: use a channel ID (e.g., C123456) for API calls to avoid ambiguity between names and IDs.
SLACK_DEFAULT_CHANNEL=C123456
```

Replace the placeholder values with your actual credentials.

## Step 6: Install Dependencies

Install the Slack Web API package:

```bash
npm install @slack/web-api
```

## Step 7: Deploy and Test

1. Deploy your updated webhook system
2. Test the integration by mentioning your bot in a Slack channel
3. Send a test webhook to verify everything works

## Usage Examples

### Security Notifications

```javascript
import { sendSecurityNotification } from '@/lib/integrations/slack';

// Send a security alert
await sendSecurityNotification(
  'Suspicious login detected from IP 192.168.1.100',
  '#security'
);
```

### Code Review Requests

```javascript
import { sendCodeReviewNotification } from '@/lib/integrations/slack';

// Send a code review request
await sendCodeReviewNotification({
  repository: 'owner/repo',
  pullRequest: 123,
  author: 'john_doe',
  branch: 'feature-branch',
  analysis: {
    overallScore: 85,
    securityIssues: [],
    summary: 'New PR opened for review'
  }
});
```

### Deployment Status Updates

```javascript
import { sendDeploymentNotification } from '@/lib/integrations/slack';

// Send deployment status
await sendDeploymentNotification('success', {
  branch: 'main',
  commit: 'a1b2c3d4e5f6',
  url: 'https://github.com/user/repo/commit/a1b2c3d4e5f6'
});
```

## Bot Commands

Your Slack bot responds to these commands when mentioned:

- `@bot status` - Check system status
- `@bot security` - View recent security alerts
- `@bot deploy <branch>` - Trigger deployment
- `@bot help` - Show available commands

## Security Considerations

1. **Keep secrets secure**: Never commit your signing secret or bot token to version control
2. **Verify requests**: The system automatically verifies Slack signatures to prevent spoofing
3. **Rate limiting**: Built-in rate limiting prevents abuse
4. **Replay protection**: Timestamp validation prevents replay attacks

## Troubleshooting

### Common Issues

1. **"Invalid signature" errors**
    - Verify your signing secret is correct
    - Check that the request URL matches exactly

2. **"Bot not responding"**
    - Ensure the bot is installed in the workspace
    - Check that the bot has necessary permissions
    - Verify the bot token is valid

3. **"Channel not found" errors**
    - Make sure the bot is added to the channel
    - Check channel permissions

### Debug Mode

Enable debug logging by setting:

```env
LOG_LEVEL=debug
```

Check the logs for detailed error information.

## Webhook Payload Format

Slack sends webhooks in this format:

```json
{
  "type": "event_callback",
  "token": "verification_token",
  "team_id": "T123456",
  "api_app_id": "A123456",
  "event": {
    "type": "message",
    "channel": "C123456",
    "user": "U123456",
    "text": "Hello bot!",
    "ts": "1609459200.000100"
  }
}
```

## Usage Examples

See `lib/integrations/slack-examples.ts` for comprehensive examples of how to use the Slack integration features:

- **Security Events**: Automated alerts for login attempts, suspicious activity, and policy violations
- **Code Reviews**: Notifications for pull requests, review requests, and review submissions
- **Deployments**: Status updates for deployment processes across different environments
- **System Monitoring**: Health checks and system alerts
- **User Management**: Onboarding notifications and user activity tracking

## Support

For issues with Slack integration:
1. Check the [Slack API documentation](https://api.slack.com/docs)
2. Review the logs in your webhook system dashboard
3. Verify all environment variables are set correctly
4. Test with the example functions in `lib/integrations/slack-examples.ts`