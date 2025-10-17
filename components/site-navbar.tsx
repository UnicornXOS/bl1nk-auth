'use client';

import Link from 'next/link';
import type { JSX } from 'react';

/**
 * Top navigation bar containing the brand, primary site links, and a login action.
 *
 * The bar is sticky to the top with a translucent background and backdrop blur. The
 * main navigation links are hidden on small screens and shown at medium screen sizes
 * and above.
 *
 * @returns A header element containing the site navigation and login action as JSX.
 */
export function SiteNavbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-background/60 backdrop-blur border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">YourBrand</Link>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/quickstart">Quickstart</Link>
          <Link href="/development">Development</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/status">Status</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="px-3 py-2 rounded border">Log in</Link>
        </div>
      </div>
    </header>
  );
}