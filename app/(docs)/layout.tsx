import { ChatFloating } from '@/components/docs/chat-floating';
import Sidebar from '@/components/ui/sidebar';
import Link from 'next/link';
import type { ReactNode, JSX } from 'react';

export default function DocsLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex">
      <aside className="hidden md:block w-64 border-r p-4 text-sm space-y-2">
        <Sidebar />
        <nav className="space-y-2">
          <Link href="/docs">Introduction</Link>
          <Link href="/docs/getting-started">Getting Started</Link>
        </nav>
      </aside>
      <div className="flex-1 min-h-dvh p-6">
        {children}
        <ChatFloating />
      </div>
    </div>
  );
}
