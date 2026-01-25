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
      className={`assistant-tab${isActive ? ' assistant-tab--active' : ''}`}
    >
      {id}
    </button>
  );
}

export default function AssistantPanel(): JSX.Element {
  const [tab, setTab] = useState<TabId>('Chat');

  return (
    <section className="surface-panel">
      <header className="assistant-tablist">
        <Tab id="Chat" active={tab} onSelect={setTab} />
        <Tab id="Planning" active={tab} onSelect={setTab} />
        <Tab id="Agent" active={tab} onSelect={setTab} />
      </header>
      <div className="assistant-content">
        <div className="token">Read the project files?</div>
        <div className="assistant-message">
          I’ve indexed the repository context—ask anything about auth flows, webhooks, or deployment steps.
        </div>
        <form className="assistant-form">
          <input
            className="assistant-input"
            placeholder="Ask how to rotate keys or inspect payloads..."
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
