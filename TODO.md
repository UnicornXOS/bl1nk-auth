# TODO: Secret & Integration Configuration

## Overview

เอกสารนี้รวบรวมขั้นตอนการตั้งค่า secrets และ integrations สำหรับโปรเจ็ค bl1nk-auth เพื่อให้ทีมสามารถดำเนินงานได้อย่างเป็นระบบ

---

## 1. สถานะ Integrations ปัจจุบัน

| Integration | Status | Environment Variables |
|-------------|--------|----------------------|
| Upstash for Redis | Connected | `KV_URL`, `KV_REST_API_TOKEN`, `REDIS_URL` |
| Neon (PostgreSQL) | Connected | `DATABASE_URL`, `POSTGRES_URL`, `PGHOST` |
| Supabase | Connected | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Vercel AI Gateway | Connected | (Zero config) |

---

## 2. Required Secrets (Critical)

### 2.1 Authentication Keys
- [ ] **AUTH_PRIVATE_KEY_PEM** - RSA Private Key สำหรับ sign JWT
- [ ] **AUTH_PUBLIC_KEY_PEM** - RSA Public Key สำหรับ verify JWT
- [ ] **AUTH_KEY_KID** - Key ID สำหรับ JWKS endpoint (default: `dev-key-1`)

**วิธีสร้าง:**
```bash
npm run gen:key
```

### 2.2 OAuth Providers
- [ ] **GITHUB_CLIENT_ID** - GitHub OAuth App Client ID
- [ ] **GITHUB_CLIENT_SECRET** - GitHub OAuth App Client Secret
- [ ] **GOOGLE_CLIENT_ID** - Google OAuth Client ID
- [ ] **GOOGLE_CLIENT_SECRET** - Google OAuth Client Secret

### 2.3 Base Configuration
- [ ] **AUTH_ISSUER** - Issuer URL (e.g., `https://auth.bl1nk.site`)
- [ ] **AUTH_AUDIENCE** - Audience identifier (default: `bl1nk-note`)
- [ ] **DATABASE_URL** - PostgreSQL connection string

---

## 3. Optional Secrets (Extended Features)

### 3.1 Webhook System
- [ ] **WEBHOOK_SECRET** - สำหรับ verify webhook signatures

### 3.2 Rate Limiting (Upstash Redis)
- [x] **KV_REST_API_URL** - Connected via Vercel integration
- [x] **KV_REST_API_TOKEN** - Connected via Vercel integration

### 3.3 External Integrations
- [ ] **NOTION_API_KEY** - สำหรับ Notion integration
- [ ] **NOTION_TASKS_DB_ID** - Database ID สำหรับ tasks
- [ ] **GITHUB_TOKEN** - Personal access token สำหรับ GitHub API
- [ ] **LOGTAIL_TOKEN** - สำหรับ logging service
- [ ] **SLACK_WEBHOOK_URL** - สำหรับ Slack notifications

---

## 4. Action Items

### Phase 1: Core Setup (Priority: HIGH)

- [ ] **Task 1.1**: Verify AUTH keys are properly configured
  - ตรวจสอบว่า `AUTH_PRIVATE_KEY_PEM` และ `AUTH_PUBLIC_KEY_PEM` ถูกต้อง
  - Test JWKS endpoint: `GET /.well-known/jwks.json`

- [ ] **Task 1.2**: Configure OAuth providers
  - สร้าง GitHub OAuth App ที่ https://github.com/settings/developers
  - สร้าง Google OAuth Client ที่ https://console.cloud.google.com
  - Callback URL: `https://<domain>/api/oauth/callback`

- [ ] **Task 1.3**: Update env.ts validation
  - เพิ่ม validation สำหรับ `GITHUB_CLIENT_ID` และ `GITHUB_CLIENT_SECRET`
  - แก้ไข inconsistency ระหว่าง `GITHUB_ID`/`GITHUB_SECRET` กับ `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`

### Phase 2: Database Integration (Priority: HIGH)

- [ ] **Task 2.1**: Consolidate database connections
  - ปัจจุบันมี Neon และ Supabase connected
  - ตัดสินใจว่าจะใช้ provider ไหนเป็นหลัก
  - อัพเดท `prisma.config.ts` ให้ใช้ connection ที่ถูกต้อง

- [ ] **Task 2.2**: Enable RLS on Neon/Supabase tables
  - ปัจจุบัน RLS disabled ทุกตาราง
  - สร้าง RLS policies สำหรับ user, session, account tables

- [ ] **Task 2.3**: Sync Prisma schema with existing database
  - รัน `prisma db pull` เพื่อ sync schema
  - อัพเดท `prisma/schema.prisma`

### Phase 3: Security Hardening (Priority: MEDIUM)

- [ ] **Task 3.1**: Fix environment variable naming inconsistencies
  - `lib/utils/env.ts` ใช้ `GITHUB_SECRET` แต่ actual env คือ `GITHUB_CLIENT_SECRET`
  - `lib/utils/env.ts` ใช้ `GITHUB_ID` แต่ actual env คือ `GITHUB_CLIENT_ID`

- [ ] **Task 3.2**: Add missing env vars to validation
  - เพิ่ม `WEBHOOK_SECRET` ในกรณีที่ต้องการใช้ webhook system
  - เพิ่ม `UPSTASH_REDIS_URL` และ `UPSTASH_REDIS_TOKEN` สำหรับ rate limiting

- [ ] **Task 3.3**: Implement key rotation strategy
  - สร้าง script สำหรับ rotate AUTH keys
  - Document key rotation process

### Phase 4: Monitoring & Logging (Priority: LOW)

- [ ] **Task 4.1**: Setup Logtail integration
  - Add `LOGTAIL_TOKEN` to environment
  - Enable structured logging

- [ ] **Task 4.2**: Setup Slack notifications
  - Add `SLACK_WEBHOOK_URL` for critical alerts
  - Implement notification service

---

## 5. Files ที่ต้องแก้ไข

| File | Issue | Action |
|------|-------|--------|
| `lib/utils/env.ts` | Variable naming mismatch | Align with actual env var names |
| `app/api/oauth/callback/route.ts` | Uses `GITHUB_CLIENT_SECRET` | OK, matches actual env |
| `lib/webhook/queue.ts` | Uses undefined `ENV.UPSTASH_REDIS_URL` | Add to ENV object |
| `lib/webhook/ratelimiter.ts` | Uses undefined `ENV.UPSTASH_REDIS_TOKEN` | Add to ENV object |
| `prisma/schema.prisma` | May not match live schema | Run `prisma db pull` |

---

## 6. Environment Variable Checklist

### Production Ready
```bash
# Critical (Required)
AUTH_PRIVATE_KEY_PEM=     # ✅ Available
AUTH_PUBLIC_KEY_PEM=      # ✅ Available
AUTH_KEY_KID=             # ✅ Available
GITHUB_CLIENT_ID=         # ✅ Available
GITHUB_CLIENT_SECRET=     # ✅ Available
DATABASE_URL=             # ✅ Available (via Neon/Supabase)

# OAuth (Check configuration)
AUTH_ISSUER=              # ⚠️ Verify correct domain
AUTH_AUDIENCE=            # ⚠️ Verify correct value

# Optional (For extended features)
WEBHOOK_SECRET=           # ❌ Not set
NOTION_API_KEY=           # ❌ Not set
GITHUB_TOKEN=             # ❌ Not set
LOGTAIL_TOKEN=            # ❌ Not set
SLACK_WEBHOOK_URL=        # ❌ Not set
```

---

## 7. Next Steps

1. **Immediate**: Run Phase 1 tasks to ensure core auth functionality
2. **This Week**: Complete Phase 2 for database integration
3. **Next Sprint**: Implement Phase 3 security hardening
4. **Future**: Setup Phase 4 monitoring

---

## 8. References

- OAuth Setup: `/docs/setup/oauth.md`
- Vercel Deployment: `/docs/deployment/vercel.md`
- Security Guidelines: `/docs/security/fixes.md`
- Agent Configuration: `/docs/development/agents.md`
