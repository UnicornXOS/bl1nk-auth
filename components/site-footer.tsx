import Link from 'next/link';
import type { JSX } from 'react';

export function SiteFooter(): JSX.Element {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__brand">Blink Automation</span>
        <div className="site-footer__meta">
          <span>Powering OAuth, webhooks, and realtime agents.</span>
          <span>© {new Date().getFullYear()} Blink Labs.</span>
        </div>
        <div className="site-footer__links">
          <Link href="/docs" className="docs-nav__link">Docs</Link>
          <Link href="/pricing" className="docs-nav__link">Pricing</Link>
          <Link href="/status" className="docs-nav__link">Status</Link>
          <Link href="/login" className="docs-nav__link">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
