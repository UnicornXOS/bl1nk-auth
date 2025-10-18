import type { JSX } from 'react';

export default function Sidebar(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase text-muted-foreground font-semibold tracking-tight">Docs</p>
        <p className="text-sm text-muted-foreground">บริหาร OAuth, webhook และ SSE chat</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase text-muted-foreground font-semibold tracking-tight">Overview</p>
        <ul className="space-y-2 text-sm text-foreground">
          <li>Authentication</li>
          <li>Webhook Relay</li>
          <li>Chat Streaming</li>
        </ul>
      </div>
    </div>
  );
}
