# bl1nk-auth Product Overview

## Purpose
bl1nk-auth is a centralized OAuth gateway that provides authentication services for multiple applications. It serves as a single sign-on (SSO) solution that issues JWT tokens, refresh tokens, and provides JWKS (JSON Web Key Set) endpoints for token verification.

## Key Features

### Authentication & Authorization
- Multi-provider OAuth support (GitHub, Google)
- JWT token generation and validation
- Refresh token management with secure cookie storage
- JWKS endpoint for public key distribution
- Session management with logout functionality

### Webhook Processing System
- Rate-limited webhook endpoint with secret validation
- BullMQ-based job queue for asynchronous processing
- Worker API for processing queued jobs (Cloudflare Cron compatible)
- Dashboard UI for monitoring queue statistics and errors
- Integration with Notion, GitHub, and custom providers

### Dashboard & Monitoring
- Real-time queue statistics and job monitoring
- Error tracking and debugging interface
- API usage analytics and cost savings metrics
- Settings management interface

### Developer Experience
- Comprehensive documentation pages
- Marketing pages with pricing and features
- Chat interface for support
- Agent-based assistance panel

## Target Users

### Primary Users
- **Development Teams**: Need centralized authentication for multiple applications
- **System Administrators**: Require webhook processing and job queue management
- **Product Teams**: Want analytics and monitoring capabilities

### Use Cases
- **Multi-application SSO**: Single authentication point for multiple services
- **Webhook Processing**: Automated handling of external service notifications
- **API Gateway**: Centralized token validation and user session management
- **Development Workflow**: Integration with GitHub and Notion for project management

## Value Proposition
- **Simplified Authentication**: One system handles all OAuth flows and token management
- **Scalable Webhook Processing**: Reliable job queue system with monitoring
- **Developer-Friendly**: Comprehensive APIs and documentation
- **Production-Ready**: Built with Next.js 15, TypeScript, and enterprise-grade dependencies