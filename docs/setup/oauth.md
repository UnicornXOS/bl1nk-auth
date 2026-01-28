# OAuth Setup Guide

## 🔑 คุณมี Keys แล้ว ✅

- AUTH_PRIVATE_KEY_PEM ✅
- AUTH_PUBLIC_KEY_PEM ✅

## 📋 ขั้นตอนถัดไป: สร้าง OAuth Apps

### 1. GitHub OAuth App

1. ไป https://github.com/settings/developers
2. คลิก "New OAuth App"
3. กรอกข้อมูล:
   \`\`\`
   Application name: bl1nk-auth-dev
   Homepage URL: https://bl1nk.site
   Authorization callback URL: http://localhost:8787/api/oauth/callback
   \`\`\`
4. คัดลอก Client ID และ Client Secret ใส่ใน `.env`:
   \`\`\`bash
   GITHUB_CLIENT_ID=your_actual_client_id
   GITHUB_CLIENT_SECRET=your_actual_client_secret
   \`\`\`

### 2. Google OAuth App

1. ไป https://console.cloud.google.com/apis/credentials
2. สร้าง Project ใหม่ (ถ้ายังไม่มี)
3. เปิดใช้งาน Google+ API
4. สร้าง OAuth 2.0 Client ID:
   \`\`\`
   Application type: Web application
   Name: bl1nk-auth-dev
   Authorized redirect URIs: http://localhost:8787/api/oauth/callback
   \`\`\`
5. คัดลอก Client ID และ Client Secret ใส่ใน `.env`:
   \`\`\`bash
   GOOGLE_CLIENT_ID=your_actual_client_id
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   \`\`\`

### 3. ทดสอบ

\`\`\`bash
npm run dev
\`\`\`

- เปิด http://localhost:8787/login
- ทดสอบ login ด้วย GitHub และ Google

### 4. สำหรับ Production (bl1nk.site)

เมื่อ deploy ไป production:

1. สร้าง OAuth Apps ใหม่สำหรับ production
2. เปลี่ยน callback URL เป็น: `https://auth.bl1nk.site/api/oauth/callback`
3. ใส่ credentials ใน Vercel Environment Variables
4. ตั้งค่า custom domain ใน Vercel: `auth.bl1nk.site`

## 🚀 พร้อม Deploy แล้ว!

เมื่อตั้งค่า OAuth เสร็จ คุณสามารถ:

- รันใน development: `npm run dev`
- Deploy ไป Vercel: `vercel --prod`
