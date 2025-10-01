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

## จุดเชื่อมต่อ
- `GET /api/login?client=note&return=http://localhost:5173/cb`
- `GET /api/login?client=note&provider=google&return=http://localhost:5173/cb`
- `GET /api/oauth/callback`
- `POST /api/session/exchange`  body: `{ ott, audience }` → `{ jwt }`
- `POST /api/session/refresh`   ใช้คุกกี้ `bl1nk_refresh`
- `POST /api/session/logout`
- `GET /.well-known/jwks.json`
