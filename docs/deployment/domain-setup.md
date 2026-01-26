# bl1nk.site Domain Configuration

## 🌐 Domain Structure

### Main Domain

- **Homepage**: `https://bl1nk.site`
- **Marketing**: Main landing page and product information

### Subdomains

- **Auth Service**: `https://auth.bl1nk.site`
- **API Gateway**: `https://api.bl1nk.site`
- **Dashboard**: `https://dashboard.bl1nk.site`
- **Docs**: `https://docs.bl1nk.site`

### Email Addresses

- **Support**: `support@bl1nk.site`
- **Team**: `team@bl1nk.site`
- **Security**: `security@bl1nk.site`
- **No-reply**: `noreply@bl1nk.site`

## 🔧 Vercel Configuration

### Custom Domain Setup

1. **เพิ่ม domain ใน Vercel ก่อน**:
   - ไปที่ Vercel Dashboard > Project Settings > Domains
   - เพิ่ม custom domain: `auth.bl1nk.site`
   - Vercel จะแสดง DNS record ที่ต้องตั้งค่า

2. **ตั้งค่า DNS records ใน domain provider**:

   ```
   Type: CNAME
   Name: auth
   Value: [ค่าที่ Vercel แสดงให้] เช่น cname.vercel-dns.com
   ```

   **หรือถ้า Vercel แสดง A record:**

   ```
   Type: A
   Name: auth
   Value: [IP ที่ Vercel แสดงให้] เช่น 76.76.19.61
   ```

### Environment Variables Update

```bash
# Production
AUTH_ISSUER=https://auth.bl1nk.site
NEXTAUTH_URL=https://auth.bl1nk.site
```

## 🔐 OAuth Configuration Update

### GitHub OAuth App (Production)

```
Application name: bl1nk-auth-prod
Homepage URL: https://bl1nk.site
Authorization callback URL: https://auth.bl1nk.site/api/oauth/callback
```

### Google OAuth App (Production)

```
Application type: Web application
Name: bl1nk-auth-prod
Authorized redirect URIs: https://auth.bl1nk.site/api/oauth/callback
```

## 📧 Email Configuration

### SMTP Settings (for notifications)

```bash
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your_resend_api_key
FROM_EMAIL=noreply@bl1nk.site
SUPPORT_EMAIL=support@bl1nk.site
```

## 🚀 Deployment Checklist

- [ ] ตั้งค่า DNS records สำหรับ auth.bl1nk.site
- [ ] เพิ่ม custom domain ใน Vercel
- [ ] อัปเดต OAuth apps ด้วย production URLs
- [ ] ตั้งค่า environment variables ใน Vercel
- [ ] ทดสอบ authentication flow
- [ ] ตั้งค่า email service (Resend/SendGrid)
- [ ] เพิ่ม SSL certificate verification

## 🔗 API Endpoints

### Authentication

- `POST https://auth.bl1nk.site/api/login`
- `GET https://auth.bl1nk.site/api/oauth/callback`
- `POST https://auth.bl1nk.site/api/session/exchange`
- `POST https://auth.bl1nk.site/api/session/refresh`
- `GET https://auth.bl1nk.site/.well-known/jwks.json`

### Webhooks

- `POST https://auth.bl1nk.site/api/webhook`
- `GET https://auth.bl1nk.site/api/worker`
- `GET https://auth.bl1nk.site/api/dashboard`

## 📊 Monitoring URLs

- **Status**: `https://auth.bl1nk.site/api/health`
- **Metrics**: `https://auth.bl1nk.site/dashboard`
- **Logs**: Vercel Analytics + Logtail integration
