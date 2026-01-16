import type { JSX } from 'react';

export default function AssistantPanel(): JSX.Element {
  return (
    <div className="surface-panel">
      <h2 className="surface-panel__title">Assistant</h2>
      <p className="surface-panel__muted">AI assistant panel</p>
    </div>
  );
}