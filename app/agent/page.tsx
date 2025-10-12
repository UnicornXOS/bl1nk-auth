import type { JSX } from 'react';

import FlowCanvas from '@/components/flow-canvas';
import type { FlowEdge, FlowNode } from '@/components/flow-canvas';
import IconSidebar from '@/components/icon-sidebar';

const NODES: FlowNode[] = [
  { id: 'start', label: 'Start', x: 40, y: 20, type: 'input' },
  { id: 'msg1', label: 'Message', x: 40, y: 120 },
  { id: 'act1', label: 'Action', x: 260, y: 120 },
  { id: 'cond', label: 'Condition', x: 40, y: 230 },
  { id: 'msg2', label: 'Message', x: 260, y: 230 },
  { id: 'act2', label: 'Action', x: 40, y: 340 },
];

const EDGES: FlowEdge[] = [
  { id: 'e1', source: 'start', target: 'msg1' },
  { id: 'e2', source: 'msg1', target: 'act1' },
  { id: 'e3', source: 'msg1', target: 'cond' },
  { id: 'e4', source: 'cond', target: 'msg2', label: 'True' },
  { id: 'e5', source: 'cond', target: 'act2', label: 'False' },
];

export default function AgentPage(): JSX.Element {
  return (
    <div className="md:pl-12">
      <IconSidebar />
      <div className="container py-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass glow rounded-xl border border-white/10 p-2">
          <div className="h-[520px] rounded-lg border border-white/10 bg-[#0b1220]">
            <FlowCanvas nodes={NODES} edges={EDGES} />
          </div>
        </div>
        <aside className="glass rounded-xl border border-white/10 p-4">
          <h3 className="mb-2 font-semibold">Chat</h3>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">Hello! How can I assist you today?</div>
          <form className="mt-3">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/30 p-3 outline-none"
              placeholder="Type a message..."
              autoComplete="off"
              type="text"
              name="agent-message"
              aria-label="Type a message for the agent"
            />
          </form>
        </aside>
      </div>
    </div>
  );
}
