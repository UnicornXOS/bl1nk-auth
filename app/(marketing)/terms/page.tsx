import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - bl1nk-auth',
  description: 'ข้อกำหนดการใช้บริการของ bl1nk-auth',
};

export default function TermsPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <h1 className="page-header__title">ข้อกำหนดการใช้บริการ</h1>
        <p className="page-header__subtitle">
          อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="surface-panel">
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. การยอมรับข้อกำหนด</h2>
            <p className="text-muted-foreground leading-relaxed">
              การใช้บริการ bl1nk-auth แสดงว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดการใช้บริการนี้ 
              หากคุณไม่ยอมรับข้อกำหนดเหล่านี้ กรุณาหยุดการใช้บริการทันที
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">2. คำอธิบายบริการ</h2>
            <p className="text-muted-foreground leading-relaxed">
              bl1nk-auth เป็นบริการ OAuth gateway ที่ให้บริการ:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>Single Sign-On (SSO) authentication</li>
              <li>JWT token generation และ management</li>
              <li>OAuth integration กับ GitHub และ Google</li>
              <li>JWKS endpoint สำหรับ token verification</li>
              <li>Session และ refresh token management</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">3. การใช้บริการที่ยอมรับได้</h2>
            <p className="text-muted-foreground leading-relaxed">
              คุณตกลงที่จะ:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>ใช้บริการตามกฎหมายและข้อกำหนดนี้</li>
              <li>ให้ข้อมูลที่ถูกต้องและเป็นปัจจุบัน</li>
              <li>รักษาความปลอดภัยของบัญชีและ credentials</li>
              <li>แจ้งเราทันทีหากพบการใช้งานที่ไม่ได้รับอนุญาต</li>
              <li>ไม่แชร์ access tokens หรือ credentials กับผู้อื่น</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">4. การใช้บริการที่ห้าม</h2>
            <p className="text-muted-foreground leading-relaxed">
              คุณตกลงที่จะไม่:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>ใช้บริการเพื่อวัตถุประสงค์ที่ผิดกฎหมาย</li>
              <li>พยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</li>
              <li>รบกวนหรือทำลายการทำงานของบริการ</li>
              <li>ใช้ automated tools เพื่อ scrape หรือ abuse API</li>
              <li>แอบอ้างเป็นบุคคลหรือองค์กรอื่น</li>
              <li>ละเมิดสิทธิ์ทางปัญญาของผู้อื่น</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">5. API Rate Limits</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราใช้ rate limiting เพื่อรักษาคุณภาพบริการ:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>Authentication endpoints: จำกัดตามจำนวน requests ต่อนาที</li>
              <li>Token refresh: จำกัดตามจำนวน requests ต่อชั่วโมง</li>
              <li>การละเมิด rate limits อาจส่งผลให้บัญชีถูกระงับชั่วคราว</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">6. ความรับผิดชอบและการจำกัดความรับผิด</h2>
            <p className="text-muted-foreground leading-relaxed">
              บริการนี้ให้บริการ "ตามสภาพที่เป็น" (AS IS) โดย:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>เราไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาดหรือหยุดชะงัก</li>
              <li>เราไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้บริการ</li>
              <li>คุณรับผิดชอบในการสำรองข้อมูลของคุณเอง</li>
              <li>เราอาจหยุดหรือเปลี่ยนแปลงบริการได้ตลอดเวลา</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">7. ความเป็นส่วนตัวและข้อมูล</h2>
            <p className="text-muted-foreground leading-relaxed">
              การใช้ข้อมูลของคุณเป็นไปตาม{' '}
              <a href="/privacy" className="text-primary hover:underline">
                นโยบายความเป็นส่วนตัว
              </a>{' '}
              ของเรา กรุณาอ่านและทำความเข้าใจก่อนใช้บริการ
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">8. การยกเลิกบัญชี</h2>
            <p className="text-muted-foreground leading-relaxed">
              คุณสามารถยกเลิกบัญชีได้ทุกเมื่อ เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีที่:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground ml-4">
              <li>ละเมิดข้อกำหนดการใช้บริการ</li>
              <li>ใช้บริการในทางที่ผิด</li>
              <li>ไม่ได้ใช้งานเป็นเวลานาน</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">9. การเปลี่ยนแปลงข้อกำหนด</h2>
            <p className="text-muted-foreground leading-relaxed">
              เราอาจปรับปรุงข้อกำหนดนี้เป็นครั้งคราว การใช้บริการต่อไปหลังจากมีการเปลี่ยนแปลง
              แสดงว่าคุณยอมรับข้อกำหนดใหม่
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">10. กฎหมายที่ใช้บังคับ</h2>
            <p className="text-muted-foreground leading-relaxed">
              ข้อกำหนดนี้อยู่ภายใต้กฎหมายของประเทศไทย ข้อพิพาทใดๆ จะอยู่ในเขตอำนาจของศาลไทย
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">11. ติดต่อเรา</h2>
            <p className="text-muted-foreground leading-relaxed">
              หากมีคำถามเกี่ยวกับข้อกำหนดการใช้บริการ กรุณาติดต่อ:
            </p>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>Email: support@bl1nk.site</p>
              <p>Website: https://support.bl1nk.site</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
