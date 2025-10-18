'use client';

import { useState } from 'react';
import type { JSX } from 'react';

type TabId = 'Chat' | 'Planning' | 'Agent';

interface TabProps {
  id: TabId;
  active: TabId;
  onSelect: (value: TabId) => void;
}

function Tab({ id, active, onSelect }: TabProps): JSX.Element {
  const isActive = active === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`px-3 py-2 text-sm ${isActive ? 'text-white border-b border-white' : 'text-white/70'}`}
    >
      {id}
    </button>
  );
}

export default function AssistantPanel(): JSX.Element {
  const [tab, setTab] = useState<TabId>('Chat');

  return (
    <section className="glass rounded-xl border border-white/10 p-0">
      <header className="flex items-center gap-4 px-4 pt-3">
        <Tab id="Chat" active={tab} onSelect={setTab} />
        <Tab id="Planning" active={tab} onSelect={setTab} />
        <Tab id="Agent" active={tab} onSelect={setTab} />
      </header>
      <div className="space-y-3 p-4">
        <div className="token w-fit">Read the project files?</div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
          Certainly! I’ve read the contents of the project and can help when you need it.
        </div>
        <form className="mt-2">
          <input
            className="w-full rounded-lg border border-white/10 bg-black/30 p-3 outline-none"
            placeholder="Ask a question..."
            autoComplete="off"
            type="text"
            name="assistant-question"
            aria-label="Ask the assistant"
          />
        </form>
      </div>
    </section>
  );
}
