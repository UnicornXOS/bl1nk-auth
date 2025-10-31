# DNS Records สำหรับ bl1nk.site

## 🔧 DNS Records ที่ต้องเพิ่ม

### 😨 ขั้นตอนที่ 1: เพิ่ม Domain ใน Vercel ก่อน
1. ไปที่ Vercel Dashboard > Project Settings > Domains
2. คลิก "Add Domain"
3. ใส่: `auth.bl1nk.site`
4. Vercel จะแสดง DNS record ที่ต้องตั้งค่า

### 😨 ขั้นตอนที่ 2: ตั้งค่า DNS ตามที่ Vercel บอก

**ถ้า Vercel แสดง CNAME:**
```
Type: CNAME
Name: auth
Value: cname.vercel-dns.com
TTL: 300
```

**ถ้า Vercel แสดง A Record:**
```
Type: A
Name: auth  
Value: 76.76.19.61
TTL: 300
```

### 2. สำหรับ API Gateway (อนาคต)
```
Type: CNAME  
Name: api
Value: cname.vercel-dns.com
TTL: 300
```

### 3. สำหรับ Dashboard (อนาคต)
```
Type: CNAME
Name: dashboard  
Value: cname.vercel-dns.com
TTL: 300
```

### 4. สำหรับ Documentation (อนาคต)
```
Type: CNAME
Name: docs
Value: cname.vercel-dns.com  
TTL: 300
```

### 5. Email Records (MX Records)
```
Type: MX
Name: @
Value: mx1.forwardemail.net
Priority: 10
TTL: 300

Type: MX
Name: @  
Value: mx2.forwardemail.net
Priority: 20
TTL: 300
```

### 6. Email Forwarding (TXT Records)
```
Type: TXT
Name: @
Value: "forward-email=support@bl1nk.site:your-actual-email@gmail.com,team@bl1nk.site:your-team-email@gmail.com"
TTL: 300
```

### 7. SPF Record (Email Security)
```
Type: TXT
Name: @
Value: "v=spf1 include:_spf.forwardemail.net ~all"
TTL: 300
```

### 8. DMARC Record (Email Security)
```
Type: TXT
Name: _dmarc
Value: "v=DMARC1; p=quarantine; rua=mailto:security@bl1nk.site"
TTL: 300
```

## 📋 ขั้นตอนการตั้งค่า

### ขั้นตอนที่ 1: เข้า DNS Management
1. เข้าไปที่ domain provider (Namecheap, GoDaddy, Cloudflare, etc.)
2. ไปที่ DNS Management หรือ DNS Zone Editor
3. เพิ่ม records ตามรายการข้างต้น

### ขั้นตอนที่ 2: ตรวจสอบ DNS
```bash
# ตรวจสอบ CNAME record
nslookup auth.bl1nk.site

# ตรวจสอบ MX record  
nslookup -type=MX bl1nk.site

# ตรวจสอบ TXT record
nslookup -type=TXT bl1nk.site
```

### ขั้นตอนที่ 3: รอ DNS Propagation
- DNS propagation อาจใช้เวลา 5-60 นาที
- ตรวจสอบได้ที่: https://dnschecker.org

## 🚨 สำคัญ: เริ่มจาก Auth Service ก่อน

**เพิ่มทันที:**
```
Type: CNAME
Name: auth
Value: cname.vercel-dns.com
```

**เพิ่มทีหลัง (เมื่อพร้อม deploy):**
- api.bl1nk.site
- dashboard.bl1nk.site  
- docs.bl1nk.site
- Email records

## 🔍 ตรวจสอบหลังตั้งค่า
1. `ping auth.bl1nk.site` - ควรได้ IP ของ Vercel
2. `https://auth.bl1nk.site` - ควรเข้าได้หลัง deploy
3. Email forwarding - ทดสอบส่งเมลไป support@bl1nk.site