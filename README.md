# bl1nk-auth (OAuth Gateway)

ศูนย์ล็อกอินกลางสำหรับหลายงาน ออก JWT + Refresh และ JWKS พร้อมระบบ Marketing

## ระบบหลัก
- **ระบบ Authentication**: ระบบล็อกอินกลางที่รองรับหลาย provider
- **ระบบ Marketing**: หน้าแนะนำผลิตภัณฑ์และบริการ

## โครงสร้างไดเรกทอรี
- `app/(auth)` - ส่วนของระบบ Authentication
- `app/(marketing)` - ส่วนของระบบ Marketing
- `components/marketing` - คอมโพเนนต์สำหรับหน้า Marketing

### Marketing Components
- `Hero.tsx` - ส่วนหัวหลักของ landing page
- `FeatureGrid.tsx` - แสดงคุณสมบัติหลักแบบ grid
- `Testimonials.tsx` - แสดงคำแนะนำจากลูกค้า
- `PricingPlans.tsx` - แสดงแผนราคาต่างๆ

## หน้า Homepage (/)
หน้าแรกของเว็บไซต์แสดงข้อมูลแนะนำผลิตภัณฑ์และบริการ ประกอบด้วย:
- ส่วน Hero แสดงข้อความหลักและ call-to-action
- ส่วนแสดงคุณสมบัติหลักของผลิตภัณฑ์
- ส่วนแสดงคำแนะนำจากลูกค้า
- ส่วนแสดงแผนราคาต่างๆ

## รันในเครื่อง
```bash
pnpm i
pnpm dev -p 8787
```
- เปิด `http://localhost:8787` เพื่อดูหน้า Marketing
- เปิด `http://localhost:8787/login` เพื่อทดสอบระบบ Authentication
- ใช้สคริปต์สร้างกุญแจ:
```
pnpm gen:key  # นำค่า PEM ไปใส่ใน .env.local
```

## ตั้งค่า .env.local
ดู `.env.example` แล้วใส่ค่า `GITHUB_*`, `GOOGLE_*` และ `AUTH_*` keys

## ระบบ Webhook แบบครบวงจร
- `POST /api/webhook` — ตรวจสอบ rate limit, ยืนยัน `x-webhook-secret` แล้วเพิ่มงานเข้า BullMQ queue
- `GET /api/worker` — กระตุ้น worker ให้ประมวลผลงานที่รออยู่ภายใน 9 วินาที (เหมาะกับ Cron job ของ Cloudflare)
- `GET /api/dashboard` — ดึงสถิติคิวเพื่อใช้กับ UI dashboard (`/dashboard`)
- `/dashboard` — หน้า UI สำหรับดูจำนวนงานในคิวและข้อผิดพลาดล่าสุด

### การตั้งค่าเพิ่มเติม
- เติมค่าต่อไปนี้ใน `.env.local` และใน Environment variables ของ Cloudflare หรือ Vercel:
  - `WEBHOOK_SECRET`
  - `UPSTASH_REDIS_URL`
  - `UPSTASH_REDIS_TOKEN`
  - `NOTION_API_KEY` และ `NOTION_TASKS_DB_ID`
  - `GITHUB_TOKEN`
  - `LOGTAIL_TOKEN` (ถ้าต้องการส่ง log ไป Logtail)
- ตั้ง Cron Trigger (เช่น ทุกนาที) ให้ยิง `GET /api/worker` เพื่อให้คิวถูกประมวลผลสม่ำเสมอ

### การทดสอบเบื้องต้น
```bash
curl -X POST http://localhost:8787/api/webhook \
  -H "x-webhook-secret: $WEBHOOK_SECRET" \
  -H "x-provider: custom" \
  -H "content-type: application/json" \
  -d '{"message":"hello"}'
```
- เรียก `GET /api/dashboard` หรือเปิด `/dashboard` เพื่อตรวจสอบสถิติ

## จุดเชื่อมต่อ
- `GET /api/login?client=note&return=http://localhost:5173/cb`
- `GET /api/login?client=note&provider=google&return=http://localhost:5173/cb`
- `GET /api/oauth/callback`
- `POST /api/session/exchange`  body: `{ ott, audience }` → `{ jwt }`
- `POST /api/session/refresh`   ใช้คุกกี้ `bl1nk_refresh`
- `POST /api/session/logout`
- `GET /.well-known/jwks.json`
