# bl1nk-auth Product Overview

## Project Purpose
bl1nk-auth is a centralized OAuth gateway that serves as a unified authentication hub for multiple applications. It provides JWT token generation, refresh token management, and JWKS (JSON Web Key Set) endpoints, combined with a comprehensive marketing system.

## Core Value Proposition
- **Centralized Authentication**: Single sign-on solution for multiple client applications
- **JWT Token Management**: Secure token generation, validation, and refresh capabilities
- **Marketing Integration**: Built-in landing pages and product showcase functionality
- **Developer-Friendly**: Complete webhook system with queue management and dashboard monitoring

## Key Features & Capabilities

### Authentication System
- Multi-provider OAuth support (GitHub, Google)
- JWT token generation with configurable audiences
- Refresh token rotation and management
- JWKS endpoint for token verification
- Session management with secure cookie handling

### Marketing System
- Landing page with hero sections and feature grids
- Customer testimonials and pricing plans
- Product showcase and call-to-action banners
- Responsive design with theme support

### Webhook & Queue Management
- Rate-limited webhook endpoints with secret validation
- BullMQ integration for background job processing
- Worker system with Cloudflare Cron compatibility
- Real-time dashboard for queue monitoring and statistics

### Developer Experience
- TypeScript-first development
- Next.js 15 with App Router
- Comprehensive API routes
- Built-in development tools and key generation scripts

## Target Users & Use Cases

### Primary Users
- **Development Teams**: Need centralized authentication for microservices
- **Product Companies**: Require marketing pages with integrated auth flows
- **SaaS Providers**: Want unified login experience across multiple products

### Use Cases
- Single sign-on for multiple applications
- Marketing website with integrated authentication
- Webhook processing for external integrations
- JWT-based API authentication
- Multi-tenant authentication scenarios

## Technical Highlights
- Built on Next.js 15 with TypeScript
- Redis-based rate limiting and queue management
- Notion and GitHub integrations
- Vercel/Cloudflare deployment ready
- Comprehensive logging and monitoring