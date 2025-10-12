import Link from 'next/link';
import type { JSX } from 'react';

export function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient blur-3xl opacity-60" />
      <div className="container py-24 relative">
        <span className="inline-flex px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          Webhook + Auth Toolkit
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-xl">
          เชื่อม GitHub OAuth, Webhook, และ Chat Agent ในที่เดียว
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
          ใช้ Next.js App Router, NextAuth และแชตลอยเพื่อรับ webhook แล้วส่งต่อไปยัง assistant ได้ทันทีบน Vercel.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href="/docs/getting-started" className="px-6 py-2 rounded bg-primary text-primary-foreground font-medium">
            เริ่มต้นใช้งาน
          </Link>
          <Link href="/login" className="px-6 py-2 rounded border font-medium text-primary">
            ล็อกอินด้วย GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
