import Link from 'next/link';
import type { JSX } from 'react';
import type { LocaleCode } from '@/lib/theme/tokens';
import { designTokens } from '@/lib/theme/tokens';

type FooterColumn = {
  heading: Record<LocaleCode, string>;
  links: Array<{
    href: string;
    label: Record<LocaleCode, string>;
  }>;
};

const footerColumns: FooterColumn[] = [
  {
    heading: { th: 'ผลิตภัณฑ์', en: 'Product' },
    links: [
      { href: '/docs', label: { th: 'เอกสาร & API', en: 'Documentation & API' } },
      { href: '/quickstart', label: { th: 'คู่มือเริ่มต้น', en: 'Quickstart' } }
    ]
  },
  {
    heading: { th: 'ทรัพยากร', en: 'Resources' },
    links: [
      { href: '/status', label: { th: 'สถานะระบบ', en: 'System Status' } },
      { href: '/changelog', label: { th: 'อัปเดตล่าสุด', en: 'Changelog' } }
    ]
  },
  {
    heading: { th: 'บริษัท', en: 'Company' },
    links: [
      { href: 'mailto:support@bl1nk.site', label: { th: 'ติดต่อสนับสนุน', en: 'Support' } },
      { href: 'mailto:team@bl1nk.site', label: { th: 'ติดต่อทีมงาน', en: 'Team' } }
    ]
  },
  {
    heading: { th: 'กฎหมาย', en: 'Legal' },
    links: [
      { href: '/privacy', label: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy Policy' } },
      { href: '/terms', label: { th: 'ข้อกำหนดการใช้บริการ', en: 'Terms of Service' } }
    ]
  }
];

export default function SiteFooter(): JSX.Element {
  return (
    <footer
      className="mt-16 border-t"
      style={{ borderColor: designTokens.colors.border, backgroundColor: 'rgba(5, 11, 29, 0.8)' }}
    >
      <div className="container grid gap-12 py-12 md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold text-white">{designTokens.brand.name}</span>
          <p className="max-w-md text-sm text-white/70">{designTokens.brand.tagline.th}</p>
          <p className="max-w-md text-xs uppercase tracking-wide text-white/60">
            {designTokens.brand.tagline.en}
          </p>
          <div className="flex flex-col gap-1 text-xs text-white/60">
            <a href="https://bl1nk.site" className="hover:text-white/80 transition-colors">bl1nk.site</a>
            <a href="mailto:support@bl1nk.site" className="hover:text-white/80 transition-colors">support@bl1nk.site</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.heading.en} className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-wide text-white/60">
                {column.heading.th} · {column.heading.en}
              </span>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col gap-1 rounded-lg border border-transparent p-3 transition-colors hover:border-white/10 hover:bg-white/5"
                  >
                    <span className="font-medium text-white">
                      {link.label.th}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-white/60">
                      {link.label.en}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="border-t py-6 text-center text-xs text-white/50"
        style={{ borderColor: designTokens.colors.border }}
      >
        © {new Date().getFullYear()} {designTokens.brand.name}. สงวนลิขสิทธิ์ · All rights reserved.
      </div>
    </footer>
  );
}
