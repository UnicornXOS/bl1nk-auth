import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { JSX } from 'react';

const metrics = [
  { label: 'Connected clients', value: '12', detail: 'GitHub, Google, GraphicAI' },
  { label: 'Verified webhooks (24h)', value: '348', detail: '0 signature failures' },
  { label: 'Active agents', value: '5', detail: 'Streaming responses live' }
];

const upcoming = [
  'Rotate signing key and publish JWKS metadata.',
  'Enable rate limits on /api/webhooks for partner tier.',
  'Invite teammates to monitor dashboards in real-time.'
];

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const displayName = session.user?.name ?? 'Operator';

  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-header__eyebrow">Control Center</span>
        <h1 className="page-header__title">Welcome back, {displayName}</h1>
        <p className="page-header__subtitle">
          Observe OAuth handshakes, webhook relays, and agent streaming from one command surface. Secrets
          stored in your environment power each module instantly.
        </p>
      </header>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Live status</h2>
        <p className="surface-panel__muted">
          Snapshot of your most important automation metrics. Numbers update automatically once your
          secrets are configured.
        </p>
        <div className="surface-panel__grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-chip">
              <span className="metric-chip__label">{metric.label}</span>
              <span className="metric-chip__value">{metric.value}</span>
              <span className="panel-subcopy">{metric.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Next actions</h2>
        <p className="surface-panel__muted">
          Keep automations humming—rotate keys, confirm webhook secrets, and onboard team members to your
          dashboard.
        </p>
        <ul className="list-dots">
          {upcoming.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="hero-actions" style={{ justifyContent: 'flex-start', marginTop: '1.5rem' }}>
          <Link href="/docs/getting-started" className="pill-link">
            Review deployment guide
          </Link>
          <Link href="/login" className="pill-link">
            Manage sessions
          </Link>
        </div>
      </section>
    </div>
  );
}
