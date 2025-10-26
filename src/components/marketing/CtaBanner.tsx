import Link from 'next/link';
import type { JSX } from 'react';
import { designTokens } from '@/theme/tokens';

export default function CtaBanner(): JSX.Element {
  return (
    <section className="container pb-24">
      <div
        className="relative overflow-hidden rounded-3xl border px-8 py-12 text-center md:px-16"
        style={{
          borderColor: designTokens.colors.border,
          background: 'linear-gradient(135deg, rgba(83,99,220,0.35), rgba(15,23,42,0.85))',
          boxShadow: designTokens.shadows.overlay
        }}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <h2 className="text-3xl font-semibold text-white">
            พร้อมพาทีมของคุณสู่ประสบการณ์ยืนยันตัวตนที่เหนือกว่าแล้วหรือยัง?
          </h2>
          <p className="text-white/80">
            Join product and security teams delivering modern onboarding experiences backed by Thai support
            and enterprise-grade reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/login"
              className="rounded-full px-6 py-3 text-sm font-semibold"
              style={{
                backgroundColor: designTokens.colors.primary,
                color: designTokens.colors.primaryForeground,
                boxShadow: designTokens.shadows.glow
              }}
            >
              เริ่มใช้งานทันที · Launch now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ borderColor: designTokens.colors.border }}
            >
              ขอคำปรึกษา · Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
