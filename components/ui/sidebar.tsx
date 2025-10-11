import type { JSX } from 'react';

export default function Sidebar(): JSX.Element {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      <div>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Docs
        </p>
        <p style={{ marginTop: '4px', fontSize: '14px', color: '#0F172A' }}>
          บริหาร OAuth, webhook และ SSE chat
        </p>
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Overview
          </p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '6px', fontSize: '14px' }}>
          <li>Authentication</li>
          <li>Webhook Relay</li>
          <li>Chat Streaming</li>
        </ul>
      </div>
    </div>
  );
}
