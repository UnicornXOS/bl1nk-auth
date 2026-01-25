'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { JSX } from 'react';
import type { LocaleCode } from '@/lib/theme/tokens';
import { designTokens, getLocalizedText } from '@/lib/theme/tokens';
import ThemeToggle from '@/components/ui/theme-toggle';
import LiquidLogo from '@/components/ui/liquid-logo';

type NavigationLink = {
  href: string;
  label: Record<LocaleCode, string>;
  analyticsId: string;
};

const navigationLinks: NavigationLink[] = [
  {
    href: '/quickstart',
    label: { th: 'เริ่มต้นด่วน', en: 'Quickstart' },
    analyticsId: 'nav-quickstart'
  },
  {
    href: '/development',
    label: { th: 'สำหรับนักพัฒนา', en: 'Development' },
    analyticsId: 'nav-development'
  },
  {
    href: '/docs',
    label: { th: 'คู่มือเอกสาร', en: 'Documentation' },
    analyticsId: 'nav-docs'
  },
  {
    href: '/pricing',
    label: { th: 'ราคา', en: 'Pricing' },
    analyticsId: 'nav-pricing'
  },
  {
    href: '/changelog',
    label: { th: 'อัปเดตระบบ', en: 'Changelog' },
    analyticsId: 'nav-changelog'
  },
  {
    href: '/status',
    label: { th: 'สถานะระบบ', en: 'Status' },
    analyticsId: 'nav-status'
  },
  {
    href: '/blog',
    label: { th: 'บทความ', en: 'Blog' },
    analyticsId: 'nav-blog'
  }
];

const actionLinks = {
  login: {
    href: '/auth/login',
    label: { th: 'เข้าสู่ระบบ', en: 'Log in' },
    analyticsId: 'nav-login'
  },
  contact: {
    href: '/contact',
    label: { th: 'คุยกับทีมงาน', en: 'Contact Sales' },
    analyticsId: 'nav-contact'
  }
};

function DualLineLabel({ label }: { label: NavigationLink['label'] }): JSX.Element {
  return (
    <span className="flex flex-col leading-tight">
      <span className="text-sm font-medium text-white">{label.th}</span>
      <span className="text-xs uppercase tracking-wide text-white/60">{label.en}</span>
    </span>
  );
}

export default function SiteNavbar(): JSX.Element {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: designTokens.colors.border,
        backgroundColor: 'rgba(5, 11, 29, 0.7)'
      }}
    >
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <LiquidLogo size={32} />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">{designTokens.brand.name}</span>
            <span className="text-xs text-white/70">{designTokens.brand.tagline.th}</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navigationLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-analytics-id={item.analyticsId}
                className="relative flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <DualLineLabel label={item.label} />
                {isActive ? (
                  <span
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full"
                    style={{ backgroundColor: designTokens.colors.primary }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 text-sm bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Metrics Display */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">26.9K</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          <Link
            href={actionLinks.login.href}
            data-analytics-id={actionLinks.login.analyticsId}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            style={{
              borderColor: designTokens.colors.border,
              color: designTokens.colors.foreground
            }}
          >
            {actionLinks.login.label.th} · {actionLinks.login.label.en}
          </Link>
          <Link
            href={actionLinks.contact.href}
            data-analytics-id={actionLinks.contact.analyticsId}
            className="rounded-full px-4 py-2 text-sm font-semibold text-background transition-colors"
            style={{
              backgroundColor: designTokens.colors.primary,
              color: designTokens.colors.primaryForeground,
              boxShadow: designTokens.shadows.glow
            }}
          >
            {actionLinks.contact.label.th}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border"
          aria-controls="mobile-nav"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((previous) => !previous)}
          style={{ borderColor: designTokens.colors.border }}
        >
          <span className="sr-only">
            {mobileOpen
              ? getLocalizedText({ th: 'ปิดเมนูนำทาง', en: 'Close navigation' })
              : getLocalizedText({ th: 'เปิดเมนูนำทาง', en: 'Open navigation' })}
          </span>
          <div className="flex flex-col items-center justify-center" style={{ gap: '5px' }}>
            <span
              className="block w-6 transition-transform duration-200"
              style={{
                height: '2px',
                backgroundColor: designTokens.colors.foreground,
                transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'translateY(0)'
              }}
            />
            <span
              className="block w-6 transition-opacity duration-200"
              style={{
                height: '2px',
                backgroundColor: designTokens.colors.foreground,
                opacity: mobileOpen ? 0 : 1
              }}
            />
            <span
              className="block w-6 transition-transform duration-200"
              style={{
                height: '2px',
                backgroundColor: designTokens.colors.foreground,
                transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0)'
              }}
            />
          </div>
        </button>
      </div>

      <div
        id="mobile-nav"
        className="md:hidden"
        hidden={!mobileOpen}
        style={{
          borderTop: `1px solid ${designTokens.colors.border}`,
          backgroundColor: 'rgba(5, 11, 29, 0.92)'
        }}
      >
        <nav className="container flex flex-col gap-4 py-6">
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-analytics-id={`${item.analyticsId}-mobile`}
              className="flex flex-col rounded-lg border px-4 py-3"
              style={{ borderColor: designTokens.colors.border }}
            >
              <span className="text-sm font-semibold text-white">{item.label.th}</span>
              <span className="text-xs text-white/70">{item.label.en}</span>
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href={actionLinks.login.href}
              data-analytics-id={`${actionLinks.login.analyticsId}-mobile`}
              className="rounded-full border px-4 py-2 text-center text-sm font-medium"
              style={{ borderColor: designTokens.colors.border }}
            >
              {actionLinks.login.label.th} · {actionLinks.login.label.en}
            </Link>
            <Link
              href={actionLinks.contact.href}
              data-analytics-id={`${actionLinks.contact.analyticsId}-mobile`}
              className="rounded-full px-4 py-2 text-center text-sm font-semibold"
              style={{
                backgroundColor: designTokens.colors.secondary,
                color: designTokens.colors.secondaryForeground,
                boxShadow: designTokens.shadows.glow
              }}
            >
              {actionLinks.contact.label.th}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
