import { ChatFloating } from '@/components/docs/chat-floating';
import Sidebar from '@/components/ui/sidebar';
import Link from 'next/link';
import type { ReactNode, JSX } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="docs-shell">
      <aside className="docs-shell__nav">
        <Sidebar />
        <div className="docs-nav__heading">Guides</div>
        <nav className="docs-nav__section">
          <Link className="docs-nav__link" href="/docs">
            Introduction
          </Link>
          <Link className="docs-nav__link" href="/docs/getting-started">
            Getting Started
          </Link>
        </nav>
      </aside>
      <main className="docs-shell__main">
        <div className="docs-article">{children}</div>
        <ChatFloating />
      </main>
    </div>
  );
}
