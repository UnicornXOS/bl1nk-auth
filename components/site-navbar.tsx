'use client';

import Link from 'next/link';
import type { JSX } from 'react';

const navLinks = [
  { label: 'Works', href: '/board' },
  { label: 'Matrix', href: '/agent' },
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' }
];

export function SiteNavbar(): JSX.Element {
  return (
    <header className="neon-navbar">
      <div className="container neon-navbar__inner">
        <Link href="/" className="neon-navbar__brand">
          <span className="neon-navbar__logo">✶</span>
          <span className="neon-navbar__wordmark">Blink</span>
        </Link>

        <nav className="neon-navbar__links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="neon-navbar__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="neon-navbar__cta">
          <Link href="/login" className="neon-navbar__primary">
            SSO Metrics
          </Link>
        </div>
      </div>
    </header>
  );
}
