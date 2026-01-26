import type { JSX } from "react";

export default function Sidebar(): JSX.Element {
  return (
    <div className="surface-panel">
      <h2 className="panel-heading">Integration Playbook</h2>
      <p className="panel-subcopy">
        Your launch checklist for spinning up OAuth, secure webhooks, and
        realtime AI agents on Blink.
      </p>
      <ul className="list-dots">
        <li>Connect GitHub or Google OAuth clients with a single redirect.</li>
        <li>
          Verify webhook signatures and relay payloads to serverless workers.
        </li>
        <li>Stream AI responses into product surfaces with SSE endpoints.</li>
      </ul>
    </div>
  );
}
