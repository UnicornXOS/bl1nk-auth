# Cloudflare DNS Setup สำหรับ bl1nk.site

## 🔧 ตั้งค่า DNS ใน Cloudflare

### ขั้นตอนที่ 1: เพิ่ม CNAME Record
1. เข้า Cloudflare Dashboard
2. เลือก domain `bl1nk.site`
3. ไปที่ **DNS** > **Records**
4. คลิก **Add record**

### ขั้นตอนที่ 2: กรอกข้อมูล DNS Record
```
Type: CNAME
Name: auth
Target: cname.vercel-dns.com
Proxy status: DNS only (สีเทา) ⚠️ สำคัญ!
TTL: Auto
```

### 🚨 สำคัญ: ปิด Cloudflare Proxy
- **ต้องเป็น "DNS only" (สีเทา)**
- **ห้ามเป็น "Proxied" (สีส้ม)**
- เพราะ Vercel ต้องการ direct connection

### ขั้นตอนที่ 3: ตรวจสอบ
หลังเพิ่ม record แล้ว:
1. รอ 2-5 นาที
2. ตรวจสอบ: `nslookup auth.bl1nk.site`
3. ควรได้ผลลัพธ์ที่ชี้ไป Vercel

### ขั้นตอนที่ 4: ตรวจสอบใน Vercel
1. กลับไปที่ Vercel Dashboard
2. ไปที่ Project Settings > Domains
3. ดู status ของ `auth.bl1nk.site`
4. ควรเป็น "Valid Configuration" หรือ "Ready"

## 🔍 Troubleshooting

### ถ้า Vercel ยังไม่เห็น domain:
1. ลบ domain ออกจาก Vercel
2. เพิ่มใหม่อีกครั้ง
3. รอ DNS propagation

### ถ้า SSL Error:
1. ตรวจสอบว่า Proxy status เป็น "DNS only"
2. รอให้ Vercel generate SSL certificate (5-10 นาที)

### ถ้ายังไม่ work:
ลองใช้ A Record แทน:
```
Type: A
Name: auth
IPv4 address: 76.76.19.61
Proxy status: DNS only (สีเทา)
TTL: Auto
```

## ✅ เมื่อเสร็จแล้ว
- `https://auth.bl1nk.site` ควรเข้าได้
- Vercel จะแสดง "Ready" ใน Domains section
- SSL certificate จะถูกสร้างอัตโนมัติ