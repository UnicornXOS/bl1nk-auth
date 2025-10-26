import Link from 'next/link';
import type { JSX } from 'react';
import type { LocaleCode } from '@/theme/tokens';
import { designTokens } from '@/theme/tokens';

type PricingTier = {
  name: Record<LocaleCode, string>;
  price: string;
  description: Record<LocaleCode, string>;
  cta: {
    href: string;
    label: Record<LocaleCode, string>;
  };
  benefits: string[];
  highlighted?: boolean;
};

const tiers: PricingTier[] = [
  {
    name: { th: 'Starter', en: 'Starter' },
    price: '฿0 / เดือน',
    description: {
      th: 'สำหรับทีมทดลองและโปรเจ็กต์ขนาดเล็ก',
      en: 'Ideal for evaluation and small projects'
    },
    cta: { href: '/auth/login', label: { th: 'เริ่มใช้งานฟรี', en: 'Activate free tier' } },
    benefits: [
      'ผู้ใช้แอคทีฟ 1,000 คน/เดือน',
      'OAuth กับ GitHub และ Google',
      'Queue & webhook analytics พื้นฐาน',
      'อีเมลสนับสนุนในวันทำการ'
    ]
  },
  {
    name: { th: 'Growth', en: 'Growth' },
    price: '฿6,900 / เดือน',
    description: {
      th: 'ครอบคลุมทีมที่ต้องการ SLA และการติดตั้งที่กำหนดเอง',
      en: 'For scaling teams needing SLAs and tailored setup'
    },
    cta: { href: '/contact', label: { th: 'คุยกับฝ่ายขาย', en: 'Talk to sales' } },
    benefits: [
      'ผู้ใช้แอคทีฟ 25,000 คน/เดือน',
      'เชื่อมต่อ SAML/SCIM และ Directory',
      'แดชบอร์ดปรับแต่ง + export อัตโนมัติ',
      'ทีม Customer Success ภาษาไทย',
      'ช่องทางสนับสนุนผ่าน Slack'
    ],
    highlighted: true
  },
  {
    name: { th: 'Enterprise', en: 'Enterprise' },
    price: 'ปรึกษาเรา',
    description: {
      th: 'สำหรับองค์กรที่ต้องการการันตี compliance',
      en: 'Enterprise-grade controls and compliance'
    },
    cta: { href: '/contact', label: { th: 'จัดทำข้อเสนอ', en: 'Request proposal' } },
    benefits: [
      'รองรับผู้ใช้ระดับล้านบัญชี',
      'Deployment แบบ Hybrid / VPC isolation',
      'การันตี SLA 99.99% พร้อม credits',
      'ที่ปรึกษาด้าน security & audit',
      'ฝึกอบรมทีมและ white-glove onboarding'
    ]
  }
];

export default function PricingPlans(): JSX.Element {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold">แพ็กเกจที่ยืดหยุ่นสำหรับทุกทีม</h2>
        <p className="mt-4 text-white/80">
          Transparent pricing with Thai-baht billing and invoices ready for your finance team.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name.en}
            className="flex h-full flex-col gap-6 rounded-2xl border p-6"
            style={{
              borderColor: tier.highlighted ? designTokens.colors.accent : designTokens.colors.border,
              backgroundColor: 'rgba(15,23,42,0.35)',
              boxShadow: tier.highlighted ? designTokens.shadows.glow : 'none'
            }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">{tier.name.th} · {tier.name.en}</h3>
              <p className="text-white/80">{tier.description.th}</p>
              <p className="text-xs uppercase tracking-wide text-white/60">{tier.description.en}</p>
              <div className="text-2xl font-semibold text-white">{tier.price}</div>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span
                    className="mt-1 inline-block h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: tier.highlighted
                        ? designTokens.colors.accent
                        : designTokens.colors.secondary
                    }}
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              href={tier.cta.href}
              className="mt-auto inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                backgroundColor: tier.highlighted ? designTokens.colors.accent : 'transparent',
                color: tier.highlighted ? designTokens.colors.accentForeground : designTokens.colors.primaryForeground,
                border: `1px solid ${tier.highlighted ? 'transparent' : designTokens.colors.border}`
              }}
            >
              {tier.cta.label.th}
              <span className="ml-2 text-xs uppercase tracking-wide text-white/60">
                {tier.cta.label.en}
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
