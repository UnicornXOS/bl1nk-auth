import Link from 'next/link';
import type { JSX } from 'react';

export default function Hero(): JSX.Element {
  return (
    <section
      style={{
        padding: '96px 24px',
        display: 'grid',
        gap: '24px',
        justifyItems: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '720px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '999px',
            background: '#EEF2FF',
            color: '#3730A3',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          Webhook + Auth Toolkit
        </span>
        <h1
          style={{
            marginTop: '24px',
            fontSize: '48px',
            lineHeight: 1.1,
            fontWeight: 700,
            color: '#0F172A'
          }}
        >
          เชื่อม GitHub OAuth, Webhook, และ Chat Agent ในที่เดียว
        </h1>
        <p
          style={{
            marginTop: '16px',
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#334155'
          }}
        >
          ใช้ Next.js App Router, NextAuth และ Server-Sent Events เพื่อรับ webhook แล้วส่งต่อไปยังแชตลอยได้ทันทีบน
          Vercel.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/docs/getting-started"
          style={{
            padding: '12px 24px',
            borderRadius: '999px',
            background: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          เริ่มต้นใช้งาน
        </Link>
        <Link
          href="/login"
          style={{
            padding: '12px 24px',
            borderRadius: '999px',
            border: '1px solid #CBD5F5',
            color: '#1D4ED8',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          ล็อกอินด้วย GitHub
        </Link>
      </div>
    </section>
  );
}
