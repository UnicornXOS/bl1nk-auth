# Vercel Deployment Guide

## Environment Variables ที่จำเป็นสำหรับ Vercel

### 🔴 Critical (จำเป็นต้องมี)

```bash
# Authentication Keys (สร้างด้วย npm run gen:key)
AUTH_PRIVATE_KEY_PEM="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
AUTH_PUBLIC_KEY_PEM="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
AUTH_KEY_KID="prod-key-1"

# OAuth Providers
GITHUB_CLIENT_ID="your_github_oauth_app_id"
GITHUB_CLIENT_SECRET="your_github_oauth_app_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Base Configuration
AUTH_ISSUER="https://your-app.vercel.app"
AUTH_AUDIENCE="bl1nk-note"
```

### 🟡 Optional (สำหรับ features เพิ่มเติม)

```bash
# Webhook System
WEBHOOK_SECRET="your-webhook-secret"

# Redis (สำหรับ rate limiting)
UPSTASH_REDIS_URL="redis://..."
UPSTASH_REDIS_TOKEN="your_token"

# External Integrations
NOTION_API_KEY="secret_..."
NOTION_TASKS_DB_ID="database_id"
GITHUB_TOKEN="ghp_..."
LOGTAIL_TOKEN="your_logtail_token"
```

## ขั้นตอนการ Deploy

### 1. สร้าง Cryptographic Keys

```bash
npm run gen:key
```

คัดลอกค่า PEM ที่ได้ไปใส่ใน Vercel Environment Variables

### 2. ตั้งค่า OAuth Apps

#### GitHub OAuth App

1. ไปที่ GitHub Settings > Developer settings > OAuth Apps
2. สร้าง New OAuth App:
   - Application name: `bl1nk-auth`
   - Homepage URL: `https://your-app.vercel.app`
   - Authorization callback URL: `https://your-app.vercel.app/api/oauth/callback`

#### Google OAuth App

1. ไปที่ Google Cloud Console
2. สร้าง OAuth 2.0 Client ID:
   - Authorized redirect URIs: `https://your-app.vercel.app/api/oauth/callback`

### 3. Deploy ไป Vercel

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. ตั้งค่า Environment Variables ใน Vercel Dashboard

1. ไปที่ Vercel Dashboard > Project Settings > Environment Variables
2. เพิ่มตัวแปรทั้งหมดจาก section Critical ข้างต้น

## การพัฒนาต่อ

### Phase 1: Core Functionality ✅

- [x] OAuth Authentication (GitHub, Google)
- [x] JWT Token Generation
- [x] JWKS Endpoint
- [x] Marketing Pages
- [x] Basic Dashboard

### Phase 2: Enhanced Features 🚧

- [ ] User Management Dashboard
- [ ] API Key Management
- [ ] Rate Limiting Dashboard
- [ ] Webhook Management UI
- [ ] Analytics & Monitoring

### Phase 3: Advanced Features 📋

- [ ] Multi-tenant Support
- [ ] Custom OAuth Providers
- [ ] Advanced Security Features
- [ ] API Documentation
- [ ] SDK Generation

## Recommended Next Steps

### 1. ปรับปรุง Security

```typescript
// เพิ่ม CORS configuration
// เพิ่ม rate limiting ทุก endpoint
// เพิ่ม input validation middleware
```

### 2. เพิ่ม Monitoring

```typescript
// เพิ่ม error tracking (Sentry)
// เพิ่ม performance monitoring
// เพิ่ม health check endpoints
```

### 3. ปรับปรุง UX

```typescript
// เพิ่ม loading states
// เพิ่ม error boundaries
// เพิ่ม responsive design
```

### 4. Database Integration

```typescript
// เพิ่ม user persistence
// เพิ่ม session management
// เพิ่ม audit logs
```

## Testing URLs

- Production: `https://your-app.vercel.app`
- Login: `https://your-app.vercel.app/login`
- JWKS: `https://your-app.vercel.app/.well-known/jwks.json`
- Dashboard: `https://your-app.vercel.app/dashboard`

## Troubleshooting

### Common Issues

1. **Keys not working**: ตรวจสอบ PEM format ใน environment variables
2. **OAuth errors**: ตรวจสอบ callback URLs ใน OAuth apps
3. **CORS errors**: ตรวจสอบ domain configuration
4. **Rate limiting**: ตรวจสอบ Redis connection
