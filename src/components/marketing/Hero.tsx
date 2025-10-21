import Link from 'next/link';
import type { JSX } from 'react';
import { designTokens } from '@/theme/tokens';

const primaryCta = {
  href: '/auth/login',
  labelTh: 'เริ่มต้นทดลองใช้งาน',
  labelEn: 'Start free trial',
  analyticsId: 'hero-primary-cta'
};

const secondaryCta = {
  href: '/contact',
  labelTh: 'นัดเดโมกับทีมงาน',
  labelEn: 'Book a live demo',
  analyticsId: 'hero-secondary-cta'
};

export default function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-hero-gradient opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative container flex flex-col gap-8 py-24">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1 text-xs uppercase tracking-wide"
          style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <span>Identity · Webhook · Dashboard</span>
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            แพลตฟอร์มยืนยันตัวตนสำหรับทีมที่ต้องการความรวดเร็วและไว้วางใจได้
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Connect OAuth, customer onboarding, and operational dashboards in minutes.
            ใช้งานร่วมกับระบบที่คุณมีอยู่แล้วได้ทันที พร้อมทีมสนับสนุนภาษาไทย.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={primaryCta.href}
            data-analytics-id={primaryCta.analyticsId}
            className="rounded-full px-6 py-3 text-sm font-semibold text-background"
            style={{
              backgroundColor: designTokens.colors.primary,
              color: designTokens.colors.primaryForeground,
              boxShadow: designTokens.shadows.glow
            }}
          >
            {primaryCta.labelTh} · {primaryCta.labelEn}
          </Link>
          <Link
            href={secondaryCta.href}
            data-analytics-id={secondaryCta.analyticsId}
            className="rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            style={{ borderColor: designTokens.colors.border }}
          >
            {secondaryCta.labelTh}
            <span className="ml-2 text-xs uppercase tracking-wide text-white/60">
              {secondaryCta.labelEn}
            </span>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <MetricCard
            value="3x"
            labelTh="เร่งความเร็วการเชื่อมระบบ"
            labelEn="Faster partner rollouts"
          />
          <MetricCard
            value="15 min"
            labelTh="ค่าเฉลี่ยการตั้งค่าครั้งแรก"
            labelEn="Average initial setup"
          />
          <MetricCard
            value="99.95%"
            labelTh="อัปไทม์ตลอด 12 เดือน"
            labelEn="Last 12 months uptime"
          />
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  value,
  labelTh,
  labelEn
}: {
  value: string;
  labelTh: string;
  labelEn: string;
}): JSX.Element {
  return (
    <div
      className="rounded-2xl border p-6 shadow-lg"
      style={{
        borderColor: designTokens.colors.border,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        boxShadow: designTokens.shadows.overlay
      }}
    >
      <span className="text-3xl font-semibold text-white">{value}</span>
      <p className="mt-2 text-sm text-white/80">{labelTh}</p>
      <p className="text-xs uppercase tracking-wide text-white/60">{labelEn}</p>
    </div>
  );
}
