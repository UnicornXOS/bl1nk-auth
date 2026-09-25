# TODO: Secret & Integration Configuration

## Overview

เอกสารนี้รวบรวมขั้นตอนการตั้งค่า secrets และ integrations สำหรับโปรเจ็ค bl1nk-auth เพื่อให้ทีมสามารถดำเนินงานได้อย่างเป็นระบบ

---

## 1. สถานะ Integrations ปัจจุบัน

| Integration | Status | Environment Variables |
|-------------|--------|-----------------------|
| Upstash for Redis | Connected | `KV_URL`, `KV_REST_API_TOKEN`, `REDIS_URL` |
| Neon (PostgreSQL) | Primary | `DATABASE_URL`, `POSTGRES_URL`, `PGHOST` |
| Supabase | Optional/Backup | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Vercel AI Gateway | Connected | (Zero config) |

---

## 2. Required Secrets (Critical)

### 2.1 Authentication Keys

- [x] **AUTH_PRIVATE_KEY_PEM** - RSA Private Key สำหรับ sign JWT
- [x] **AUTH_PUBLIC_KEY_PEM** - RSA Public Key สำหรับ verify JWT
- [x] **AUTH_KEY_KID** - Key ID สำหรับ JWKS endpoint (default: `dev-key-1`)

**วิธีสร้าง:**

```bash
npm run gen:key
```

### 2.2 OAuth Providers

- [x] **GITHUB_CLIENT_ID** / **GITHUB_ID** - Dual naming supported in `lib/utils/env.ts`
- [x] **GITHUB_CLIENT_SECRET** / **GITHUB_SECRET** - Dual naming supported in `lib/utils/env.ts`
- [x] **GOOGLE_CLIENT_ID** / **GOOGLE_ID** - Dual naming supported in `lib/utils/env.ts`
- [x] **GOOGLE_CLIENT_SECRET** / **GOOGLE_SECRET** - Dual naming supported in `lib/utils/env.ts`

### 2.3 Base Configuration

- [x] **AUTH_ISSUER** - Issuer URL (default: `http://localhost:3000`)
- [x] **AUTH_AUDIENCE** - Audience identifier (default: `auth`)
- [x] **DATABASE_URL** - Neon PostgreSQL connection string

---

## 3. Optional Secrets (Extended Features)

### 3.1 Webhook System

- [ ] **WEBHOOK_SECRET** - สำหรับ verify webhook signatures

### 3.2 Rate Limiting (Upstash Redis)

- [x] **KV_REST_API_URL** / **UPSTASH_REDIS_URL** - Connected via Vercel integration & dual resolved in `env.ts`
- [x] **KV_REST_API_TOKEN** / **UPSTASH_REDIS_TOKEN** - Connected via Vercel integration & dual resolved in `env.ts`

### 3.3 External Integrations (Phase 4 — Postponed)

- [ ] **NOTION_API_KEY** - Deferred until core features are deployed
- [ ] **NOTION_TASKS_DB_ID** - Deferred until core features are deployed
- [ ] **GITHUB_TOKEN** - Deferred until core features are deployed
- [ ] **LOGTAIL_TOKEN** - Deferred until core features are deployed
- [ ] **SLACK_WEBHOOK_URL** - Deferred until core features are deployed

---

## 4. Action Items

### Phase 1: Core Setup (Priority: HIGH)

- [x] **Task 1.1**: Verify AUTH keys are properly configured
  - `AUTH_PRIVATE_KEY_PEM` และ `AUTH_PUBLIC_KEY_PEM` verified
  - JWKS endpoint ready at `/.well-known/jwks.json`

- [x] **Task 1.2**: Configure OAuth providers
  - GitHub & Google OAuth handlers wired
  - Callback URL: `https://<domain>/api/oauth/callback`

- [x] **Task 1.3**: Update env.ts validation
  - Dual resolution added for `GITHUB_CLIENT_ID`/`GITHUB_ID` & `GOOGLE_CLIENT_ID`/`GOOGLE_ID`
  - Production runtime error throwing enabled for missing critical keys

### Phase 2: Database Integration (Priority: HIGH)

- [x] **Task 2.1**: Consolidate database connections
  - Neon established as Primary PostgreSQL database via `DATABASE_URL`
  - Prisma 7 `@prisma/adapter-pg` adapter configured in `lib/db/prisma.ts`

- [x] **Task 2.2**: Enable RLS on Neon/Supabase tables
  - Created RLS policies SQL migration script at `prisma/migrations/20260806_enable_rls/migration.sql`

- [ ] **Task 2.3**: Sync Prisma schema with existing database
  - Run `prisma db pull` when live schema changes

### Phase 3: Security Hardening (Priority: MEDIUM)

- [x] **Task 3.1**: Fix environment variable naming inconsistencies
  - `lib/utils/env.ts` aligned with both `GITHUB_CLIENT_SECRET` and `GITHUB_SECRET`
  - `lib/utils/env.ts` aligned with both `GITHUB_CLIENT_ID` and `GITHUB_ID`

- [x] **Task 3.2**: Add missing env vars to validation
  - Dual resolution added for `UPSTASH_REDIS_URL` (`KV_REST_API_URL` / `KV_URL` / `REDIS_URL`) and `UPSTASH_REDIS_TOKEN` (`KV_REST_API_TOKEN`)

- [x] **Task 3.3**: Implement key rotation strategy
  - Created CLI script `scripts/rotate-keys.ts` (`pnpm gen:key:rotate`)

### Phase 4: Monitoring & Logging (Priority: LOW - Postponed)

- [ ] **Task 4.1**: Setup Logtail integration (Deferred)
- [ ] **Task 4.2**: Setup Slack notifications (Deferred)

---

## 5. Files Updated

| File | Issue | Action Taken |
|------|-------|--------------|
| `lib/utils/env.ts` | Variable naming mismatch & validation strictness | Dual naming added; throws in production runtime if critical keys missing |
| `app/api/oauth/callback/route.ts` | Uses `GITHUB_CLIENT_SECRET` | Dual resolution in `ENV` object |
| `lib/webhook/queue.ts` | Upstash Redis connection | Uses dual resolved `ENV.UPSTASH_REDIS_URL` |
| `lib/webhook/ratelimiter.ts` | Upstash Redis token | Uses dual resolved `ENV.UPSTASH_REDIS_TOKEN` |
| `lib/db/prisma.ts` | Pool adapter | Uses Neon PostgreSQL with `@prisma/adapter-pg` |
| `scripts/rotate-keys.ts` | Key rotation automation | Created script (`pnpm gen:key:rotate`) |
| `prisma/migrations/20260806_enable_rls/migration.sql` | PostgreSQL RLS Security | Created RLS migration policies |

---

## 6. Next Steps

1. Run `pnpm test && npx tsc --noEmit && pnpm check` to ensure all checks pass.
2. Apply SQL migration to target database when deploying.
3. Deploy to production environment.
