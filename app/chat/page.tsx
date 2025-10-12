import type { JSX } from 'react';

import IconSidebar from '@/components/icon-sidebar';

export default function ChatPage(): JSX.Element {
  return (
    <div className="md:pl-12">
      <IconSidebar />
      <div className="container py-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          <div className="glass rounded-xl border border-white/10 p-3">📄 Docs</div>
          <div className="glass rounded-xl border border-white/10 p-3">👤 Profile</div>
          <div className="glass rounded-xl border border-white/10 p-3">🗂️ Files</div>
        </aside>
        <main className="space-y-4">
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="token mb-3 w-fit">Hello! How can I assist you today</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 text-base font-semibold">Summary</h3>
              <p className="text-sm text-white/80">This is a summary of the notes…</p>
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 text-base font-semibold">Country</h3>
              <div className="h-24 rounded bg-gradient-to-tr from-blue-600/30 to-violet-600/30" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['AI', 'Save', 'Run', 'New'].map((label) => (
              <button
                key={label}
                type="button"
                className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-xs"
                aria-label={label}
              >
                {label.charAt(0)}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
