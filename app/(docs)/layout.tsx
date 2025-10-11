import ChatFloating from '@/components/docs/chat-floating';
import Sidebar from '@/components/ui/sidebar';
import Link from 'next/link';
import type { ReactNode, JSX } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div style={{ display: 'flex', minHeight: '100dvh' }}>
      <aside
        style={{
          display: 'block',
          width: '260px',
          borderRight: '1px solid #E2E8F0',
          padding: '24px',
          background: '#F8FAFC'
        }}
        className="docs-sidebar"
      >
        <Sidebar />
        <nav style={{ marginTop: '24px', display: 'grid', gap: '12px', fontSize: '14px' }}>
          <Link href="/docs">Introduction</Link>
          <Link href="/docs/getting-started">Getting Started</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', position: 'relative' }}>
        {children}
        <ChatFloating />
      </main>
    </div>
  );
}
