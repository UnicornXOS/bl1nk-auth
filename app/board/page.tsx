import type { JSX } from 'react';

import AssistantPanel from '@/components/assistant-panel';
import FileBoard from '@/components/file-board';
import IconSidebar from '@/components/icon-sidebar';

export default function BoardPage(): JSX.Element {
  return (
    <div className="md:pl-12">
      <IconSidebar />
      <div className="container py-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <section className="space-y-4">
          <h1 className="text-xl font-semibold">Board</h1>
          <FileBoard files={['file1.txt', 'file2.txt', 'file3.txt', 'tasks.md', 'outline.md', 'notes.txt']} />
          <div className="glass rounded-xl border border-white/10 p-4">
            <h2 className="mb-2 text-sm font-medium">Chat</h2>
            <div className="token mb-3 w-fit">Choosing an AI agent</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
              Hello! How can I assist you today?
            </div>
            <form className="mt-3">
              <input
                className="w-full rounded-lg border border-white/10 bg-black/30 p-3 outline-none"
                placeholder="Type a message..."
                autoComplete="off"
                type="text"
                name="board-message"
                aria-label="Type a message"
              />
            </form>
          </div>
          <div className="glass rounded-xl border border-white/10 p-4">
            <h2 className="text-sm font-medium">Agent</h2>
            <button
              type="button"
              className="mt-3 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              + Add document
            </button>
          </div>
        </section>
        <aside className="space-y-4">
          <AssistantPanel />
        </aside>
      </div>
    </div>
  );
}
