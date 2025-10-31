import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - bl1nk-auth',
  description: 'นโยบายความเป็นส่วนตัวของ bl1nk-auth',
};

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <h1 className="page-header__title">นโยบายความเป็นส่วนตัว</h1>
        <p className="page-header__subtitle">
          อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="surface-panel">
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. ข้อมูลที่เราเก็บรวบรวม</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราเก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการ OAuth authentication รวมถึง:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>ข้อมูลโปรไฟล์จาก OAuth providers (GitHub, Google)</li>
              <li>Email address และชื่อผู้ใช้</li>
              <li>Session tokens และ refresh tokens</li>
              <li>IP address และข้อมูล browser สำหรับความปลอดภัย</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. การใช้ข้อมูล</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราใช้ข้อมูลของคุณเพื่อ:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>ให้บริการ authentication และ authorization</li>
              <li>สร้างและจัดการ JWT tokens</li>
              <li>ป้องกันการใช้งานที่ผิดกฎหมายและรักษาความปลอดภัย</li>
              <li>ปรับปรุงและพัฒนาบริการของเรา</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. การแชร์ข้อมูล</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราไม่ขาย แบ่งปัน หรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม ยกเว้น:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>เมื่อได้รับความยินยอมจากคุณ</li>
              <li>เพื่อปฏิบัติตามกฎหมายหรือคำสั่งศาล</li>
              <li>เพื่อป้องกันการฉ้อโกงหรือภัยคุกคามด้านความปลอดภัย</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. ความปลอดภัยของข้อมูล</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสม รวมถึง:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>การเข้ารหัสข้อมูลด้วย HTTPS/TLS</li>
              <li>JWT signing ด้วย RSA-256</li>
              <li>Rate limiting และ security monitoring</li>
              <li>การจัดเก็บข้อมูลบน infrastructure ที่ปลอดภัย</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. สิทธิของคุณ</h2>
            <p className="text-muted-foreground leading-relaxed">
              คุณมีสิทธิ์:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>เข้าถึงและขอสำเนาข้อมูลส่วนบุคคลของคุณ</li>
              <li>แก้ไขข้อมูลที่ไม่ถูกต้อง</li>
              <li>ขอลบข้อมูลของคุณ</li>
              <li>ถอนความยินยอมการใช้ข้อมูล</li>
              <li>ยกเลิกบัญชีและบริการได้ทุกเมื่อ</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">6. Cookies และ Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราใช้ cookies เพื่อ:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>จัดการ session authentication</li>
              <li>จดจำการตั้งค่าของคุณ</li>
              <li>วิเคราะห์การใช้งานเพื่อปรับปรุงบริการ</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">7. การเปลี่ยนแปลงนโยบาย</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว การเปลี่ยนแปลงที่สำคัญจะแจ้งให้คุณทราบผ่านอีเมลหรือประกาศบนเว็บไซต์
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">8. ติดต่อเรา</h2>
            <p className="text-muted-foreground leading-relaxed">
              หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:
            </p>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>Email: privacy@bl1nk.site</p>
              <p>Website: https://support.bl1nk.site</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
