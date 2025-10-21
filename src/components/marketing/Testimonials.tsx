import type { JSX } from 'react';
import type { LocaleCode } from '@/theme/tokens';
import { designTokens } from '@/theme/tokens';

type Testimonial = {
  quote: Record<LocaleCode, string>;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote: {
      th: '“bl1nk Auth ช่วยให้เราปรับใช้ webhook และ OAuth ได้ภายในสัปดาห์เดียว ทีมไม่ต้องปวดหัวกับ edge case อีกต่อไป.”',
      en: '"bl1nk Auth let us roll out OAuth and webhook orchestration in a single week—no more edge-case firefighting."'
    },
    author: 'Piyapong Chantana',
    role: 'CTO, FlowServe Asia'
  },
  {
    quote: {
      th: '“แดชบอร์ดใหม่เปิดมุมมองลูกค้าตามสิทธิ์เข้าใช้ได้ชัดเจน ทำให้ฝ่ายขายตอบลูกค้าองค์กรได้เร็วขึ้นมาก.”',
      en: '"The consolidated dashboard helps our sales team respond to enterprise security reviews in half the time."'
    },
    author: 'Natnicha Rattanakorn',
    role: 'Head of Customer Success, FinPeak'
  },
  {
    quote: {
      th: '“เราเลิกสร้างระบบยืนยันตัวตนเองเพราะทีม bl1nk ดูแลครบ ตั้งแต่ audit trail จนถึงการทดลองใช้งาน.”',
      en: '"We stopped reinventing identity in-house because bl1nk covers audit trails to free trials out of the box."'
    },
    author: 'Michael Reyes',
    role: 'VP Engineering, Arctiq Labs'
  }
];

export default function Testimonials(): JSX.Element {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold">องค์กรที่ไว้วางใจ bl1nk Auth</h2>
        <p className="mt-3 text-white/80">
          Trusted by teams that demand reliability, transparency, and local-language support.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.author}
            className="flex h-full flex-col justify-between gap-6 rounded-2xl border p-6 text-left"
            style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(15,23,42,0.35)' }}
          >
            <blockquote className="text-sm leading-relaxed text-white/80">
              <p>{item.quote.th}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-white/60">{item.quote.en}</p>
            </blockquote>
            <figcaption className="text-sm">
              <div className="font-semibold text-white">{item.author}</div>
              <div className="text-xs uppercase tracking-wide text-white/60">{item.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
