# bl1nk-auth (OAuth Gateway)

ศูนย์ล็อกอินกลางสำหรับหลายงาน ออก JWT + Refresh และ JWKS

## รันในเครื่อง
```bash
pnpm i
pnpm dev -p 8787
```
- เปิด `http://localhost:8787/login` เพื่อทดสอบ
- ใช้สคริปต์สร้างกุญแจ:
```
pnpm gen:key  # นำค่า PEM ไปใส่ใน .env.local
```

## ตั้งค่า .env.local
ดู `.env.example` แล้วใส่ค่า `GITHUB_*`, `GOOGLE_*` และ `AUTH_*` keys

## ระบบ Webhook แบบครบวงจร
- `POST /api/webhook` — ตรวจสอบ rate limit, ยืนยัน `x-webhook-secret` แล้วเพิ่มงานเข้า BullMQ queue
- `POST /api/slack/webhook` — Slack Events API endpoint พร้อม signature verification
- `GET /api/worker` — กระตุ้น worker ให้ประมวลผลงานที่รออยู่ภายใน 9 วินาที (เหมาะกับ Cron job ของ Cloudflare)
- `GET /api/dashboard` — ดึงสถิติคิวเพื่อใช้กับ UI dashboard (`/dashboard`)
- `/dashboard` — หน้า UI สำหรับดูจำนวนงานในคิวและข้อผิดพลาดล่าสุด

### Integrations ที่รองรับ
- **GitHub** — Issue comments, PR notifications, **Automated Code Review**
- **Notion** — Task creation, database updates
- **Slack** — Interactive bots, automated notifications, security alerts
- **Custom** — Generic webhook processing

### 🤖 Automated Code Review
ระบบบอทตรวจสอบโค้ดอัตโนมัติที่ช่วย:
- 🔍 **ตรวจสอบช่องโหว่ด้านความปลอดภัย** (SQL Injection, XSS, Hardcoded secrets)
- 🎨 **วิเคราะห์สไตล์โค้ด** (ESLint, Prettier, Stylelint)
- 🧠 **ตรวจสอบความซับซ้อน** (Function size, nesting depth)
- ⚡ **แนะนำการปรับปรุงประสิทธิภาพ**

**การใช้งาน:**
```bash
# ตรวจสอบ PR ด้วยตนเอง
npm run code-review -- --repo owner/repo --pr 123

# ผ่าน GitHub webhook (อัตโนมัติ)
# ตั้งค่า webhook ที่ Repository Settings > Webhooks
# Payload URL: https://your-domain.com/api/github/webhook
```

**Features:**
- 📊 ให้คะแนนคุณภาพโค้ด (0-100)
- 💬 คอมเมนต์ใน Pull Request ด้วยรายละเอียด
- 📢 แจ้งเตือนผ่าน Slack
- 🔧 สนับสนุนการตั้งค่า ESLint และ Prettier

### การตั้งค่าเพิ่มเติม
- เติมค่าต่อไปนี้ใน `.env.local` และใน Environment variables ของ Cloudflare หรือ Vercel:
  - `WEBHOOK_SECRET`
  - `UPSTASH_REDIS_URL`
  - `UPSTASH_REDIS_TOKEN`
  - `NOTION_API_KEY` และ `NOTION_TASKS_DB_ID`
  - `GITHUB_TOKEN`
  - `LOGTAIL_TOKEN` (ถ้าต้องการส่ง log ไป Logtail)
  - `SLACK_SIGNING_SECRET` และ `SLACK_BOT_TOKEN` (สำหรับ Slack integration)
  - `GITHUB_WEBHOOK_SECRET` (สำหรับ Code Review)
  - `CODE_REVIEW_ENABLED=true` (เปิดใช้งาน code review)
- ตั้ง Cron Trigger (เช่น ทุกนาที) ให้ยิง `GET /api/worker` เพื่อให้คิวถูกประมวลผลสม่ำเสมอ

### 🔧 Code Quality Tools
- **ESLint** — ตรวจสอบคุณภาพ JavaScript/TypeScript
- **Prettier** — จัดรูปแบบโค้ดอัตโนมัติ
- **Stylelint** — ตรวจสอบ CSS/SCSS

```bash
# ติดตั้ง dependencies
npm install

# ตรวจสอบและแก้ไขโค้ด
npm run lint:fix
npm run format
npm run stylelint:fix

# ตรวจสอบ code review
npm run code-review -- --repo owner/repo --pr 123
```

### การทดสอบเบื้องต้น
```bash
curl -X POST http://localhost:8787/api/webhook \
  -H "x-webhook-secret: $WEBHOOK_SECRET" \
  -H "x-provider: custom" \
  -H "content-type: application/json" \
  -d '{"message":"hello"}'
```
- เรียก `GET /api/dashboard` หรือเปิด `/dashboard` เพื่อตรวจสอบสถิติ

### Slack Integration
ระบบรองรับ Slack Events API พร้อม signature verification:

```bash
# ตั้งค่า Slack App และใส่ credentials ใน .env.local
# ดูคู่มือเต็มที่ /docs/slack-integration

# ทดสอบ Slack webhook
curl -X POST http://localhost:8787/api/slack/webhook \
  -H "content-type: application/json" \
  -d '{"type":"url_verification","challenge":"test_challenge"}'
```

**Features:**
- 🤖 Interactive bot commands (`@bot help`, `@bot status`)
- 🚨 Security event notifications
- 📝 Code review request notifications
- 🔄 Deployment status updates
- ⚠️ System monitoring alerts

## จุดเชื่อมต่อ

### Authentication API
- `GET /api/login?client=note&return=http://localhost:5173/cb`
- `GET /api/login?client=note&provider=google&return=http://localhost:5173/cb`
- `GET /api/oauth/callback`
- `POST /api/session/exchange`  body: `{ ott, audience }` → `{ jwt }`
- `POST /api/session/refresh`   ใช้คุกกี้ `bl1nk_refresh`
- `POST /api/session/logout`
- `GET /.well-known/jwks.json`

### Webhook API
- `POST /api/webhook` — Generic webhook endpoint
- `POST /api/slack/webhook` — Slack Events API
- `POST /api/github/webhook` — GitHub webhook (Code Review)
- `POST /api/code-review` — Manual code review trigger
- `GET /api/worker` — Trigger queue processing
- `GET /api/dashboard` — Queue statistics

### Documentation
- `/docs/slack-integration` — คู่มือ Slack integration
- `/docs/code-review-bot` — คู่มือ Code Review Bot
