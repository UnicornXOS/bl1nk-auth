import type { JSX } from 'react';
import type { LocaleCode } from '@/theme/tokens';
import { designTokens } from '@/theme/tokens';

type Feature = {
  title: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  highlights: string[];
};

const features: Feature[] = [
  {
    title: { th: 'ศูนย์กลาง OAuth หลายผู้ให้บริการ', en: 'Unified OAuth gateway' },
    description: {
      th: 'รองรับ GitHub, Google และ SAML ภายใต้ชุดนโยบายเดียว พร้อม callback ที่ยืดหยุ่น.',
      en: 'Bring GitHub, Google, and SAML providers under a single policy with flexible callbacks.'
    },
    highlights: ['Zero-downtime key rotation', 'SDK ready for Next.js & Node', 'Session analytics dashboard']
  },
  {
    title: { th: 'Webhook ที่เชื่อถือได้', en: 'Reliable webhooks' },
    description: {
      th: 'จัดคิว ปรับ retry และตรวจสอบสถานะได้ในที่เดียว พร้อม log ที่ค้นหาได้.',
      en: 'Queued delivery with adaptive retries, status monitoring, and queryable logs in one place.'
    },
    highlights: ['BullMQ + Upstash Redis backbone', 'Signature verification templates', 'Realtime queue health']
  },
  {
    title: { th: 'แดชบอร์ดภาพรวมองค์กร', en: 'Operational dashboard' },
    description: {
      th: 'ดูภาพรวมลูกค้า สิทธิ์การเข้าใช้ และกิจกรรมล่าสุด พร้อมระบบแจ้งเตือน.',
      en: 'Monitor customer segments, access grants, and activity feed with proactive alerting.'
    },
    highlights: ['Role-based access control', 'Embeddable widgets', 'Audit-ready exports']
  }
];

export default function FeatureGrid(): JSX.Element {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold">ออกแบบเพื่อทีมที่ต้องเติบโตเร็ว</h2>
        <p className="mt-4 text-white/80">
          Built for product, security, and operations teams that need dependable identity workflows.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title.en}
            className="flex h-full flex-col gap-4 rounded-2xl border p-6 text-left transition-transform hover:-translate-y-1"
            style={{ borderColor: designTokens.colors.border, backgroundColor: designTokens.colors.card }}
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{feature.title.th}</h3>
              <p className="mt-2 text-sm text-white/80">{feature.description.th}</p>
              <p className="text-xs uppercase tracking-wide text-white/60">{feature.description.en}</p>
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/80">
              {feature.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span
                    className="inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: designTokens.colors.accent }}
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
