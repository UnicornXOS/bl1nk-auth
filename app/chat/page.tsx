import type { JSX } from 'react';

const quickActions = ['Summarise', 'Plan rollout', 'Draft email', 'Sync notes'];

const threadItems = [
  {
    title: 'Summary',
    message: 'Your GitHub OAuth app is wired correctly. Clients refresh tokens every 30 minutes.'
  },
  {
    title: 'Next deployment',
    message: 'Schedule runtime key rotation before promoting the next build to production.'
  },
  {
    title: 'Country insights',
    message: 'Top traffic originates from 🇺🇸 🇩🇪 🇯🇵. Latency under 140ms across regions.'
  }
];

export default function ChatPage(): JSX.Element {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-header__eyebrow">Assistant</span>
        <h1 className="page-header__title">Converse with your Blink co-pilot</h1>
        <p className="page-header__subtitle">
          Stream responses, orchestrate tasks, and export answers across your workspace—all in the dark neon
          canvas.
        </p>
      </header>

      <section className="surface-panel">
        <div className="token" style={{ justifySelf: 'flex-start' }}>
          Connected · Streaming
        </div>
        <div className="surface-panel__grid" style={{ marginTop: '1.5rem' }}>
          {threadItems.map((item) => (
            <div key={item.title} className="metric-chip">
              <span className="metric-chip__label">{item.title}</span>
              <span className="panel-subcopy">{item.message}</span>
            </div>
          ))}
        </div>
        <form className="assistant-form" style={{ marginTop: '1.6rem' }}>
          <input
            className="assistant-input"
            placeholder="Ask Blink to draft a webhook retry policy or summarise incident notes..."
            autoComplete="off"
            type="text"
            name="chat-message"
            aria-label="Send a prompt to the Blink assistant"
          />
        </form>
      </section>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Quick actions</h2>
        <p className="surface-panel__muted">
          Jump straight into curated agent flows. Each action dispatches a streaming response the moment you
          select it.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          {quickActions.map((action) => (
            <button key={action} type="button" className="pill-link">
              {action}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
