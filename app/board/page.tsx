import type { JSX } from 'react';
import Link from 'next/link';

import AssistantPanel from '@/components/assistant-panel';
import FileBoard from '@/components/file-board';

const tasks = [
  'Sync latest Notion docs after deploy.',
  'Confirm webhook retries succeeded overnight.',
  'Share dashboard snapshot with teammates.'
];

export default function BoardPage(): JSX.Element {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-header__eyebrow">Workspace</span>
        <h1 className="page-header__title">Operate your automation library</h1>
        <p className="page-header__subtitle">
          Access every document, checklist, and automation blueprint in one glowing cockpit. Changes flow
          in right after you commit.
        </p>
      </header>

      <section className="neon-grid">
        <FileBoard files={['playbooks/rotation.md', 'docs/oauth.md', 'webhooks/retry-guide.md', 'agents/roadmap.md', 'handoff.txt', 'metrics.csv']} />
        <AssistantPanel />
      </section>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Operator to-dos</h2>
        <p className="surface-panel__muted">
          Use this run queue to keep your automation surface fresh. Items clear when you update the docs in
          GitHub.
        </p>
        <ul className="list-dots">
          {tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
        <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '1.5rem' }}>
          <Link href="/docs" className="pill-link">
            Open docs
          </Link>
          <Link href="/chat" className="pill-link">
            Ask the assistant
          </Link>
        </div>
      </section>
    </div>
  );
}
