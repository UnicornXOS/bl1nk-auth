import type { JSX } from 'react';

import FlowCanvas from '@/components/flow-canvas';
import type { FlowEdge, FlowNode } from '@/components/flow-canvas';

const NODES: FlowNode[] = [
  { id: 'start', label: 'Start', x: 40, y: 20, type: 'input' },
  { id: 'msg1', label: 'Message', x: 40, y: 120 },
  { id: 'act1', label: 'Action', x: 260, y: 120 },
  { id: 'cond', label: 'Condition', x: 40, y: 230 },
  { id: 'msg2', label: 'Message', x: 260, y: 230 },
  { id: 'act2', label: 'Action', x: 40, y: 340 }
];

const EDGES: FlowEdge[] = [
  { id: 'e1', source: 'start', target: 'msg1' },
  { id: 'e2', source: 'msg1', target: 'act1' },
  { id: 'e3', source: 'msg1', target: 'cond' },
  { id: 'e4', source: 'cond', target: 'msg2', label: 'True' },
  { id: 'e5', source: 'cond', target: 'act2', label: 'False' }
];

export default function AgentPage(): JSX.Element {
  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-header__eyebrow">Agents</span>
        <h1 className="page-header__title">Design realtime agent flows</h1>
        <p className="page-header__subtitle">
          Prototype how messages route through actions, conditions, and webhooks. The canvas mirrors your
          production automation once environment secrets are live.
        </p>
      </header>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Flow canvas</h2>
        <p className="surface-panel__muted">
          Drag nodes to plan new behaviours, then commit the configuration to sync with your worker runtime.
        </p>
        <div style={{ marginTop: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(110,134,220,0.28)', padding: '1rem', background: 'rgba(9, 16, 36, 0.9)' }}>
          <div style={{ height: '520px', borderRadius: '1rem', overflow: 'hidden', background: '#0b1220', border: '1px solid rgba(82,108,220,0.25)' }}>
            <FlowCanvas nodes={NODES} edges={EDGES} />
          </div>
        </div>
      </section>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Agent assistant</h2>
        <p className="surface-panel__muted">
          Ask Blink to update prompts, change webhooks, or tune retries. Responses stream instantly with SSE.
        </p>
        <div className="assistant-message">
          Hello! Describe the agent behaviour you need and I’ll suggest the nodes to add or change.
        </div>
        <form className="assistant-form">
          <input
            className="assistant-input"
            placeholder="E.g. add a fallback webhook that notifies Slack if retries exceed 3"
            autoComplete="off"
            type="text"
            name="agent-message"
            aria-label="Type a message for the agent assistant"
          />
        </form>
      </section>
    </div>
  );
}
