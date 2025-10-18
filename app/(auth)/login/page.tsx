'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import type { JSX } from 'react';

type Provider = 'github' | 'google';

const providers: Array<{ id: Provider; label: string; description: string; accent: string }> = [
  {
    id: 'github',
    label: 'Continue with GitHub',
    description: 'Use your GitHub OAuth app configured in .env to provision refresh tokens.',
    accent: 'btn-gradient--violet'
  },
  {
    id: 'google',
    label: 'Continue with Google',
    description: 'Federate users via Google OAuth; requires GOOGLE_CLIENT_ID/SECRET.',
    accent: 'btn-gradient--cyan'
  }
];

export default function Login(): JSX.Element {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleSignIn = async (provider: Provider) => {
    setLoadingProvider(provider);
    try {
      await signIn(provider, { callbackUrl: '/dashboard' });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <span className="page-header__eyebrow">Access</span>
        <h1 className="page-header__title">Sign in to Blink</h1>
        <p className="page-header__subtitle">
          Choose your OAuth provider. Once your environment variables are present, authentication lights up
          instantly.
        </p>
      </header>

      <section className="surface-panel">
        <h2 className="surface-panel__title">Single sign-on</h2>
        <p className="surface-panel__muted">
          These buttons trigger the NextAuth handlers already wired into <code>/api/auth</code>. Ensure the
          provider credentials are set in <code>.env.local</code> or in your deployment dashboard.
        </p>
        <div className="surface-panel__grid">
          {providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className={`btn-gradient ${provider.accent}`}
              style={{ width: '100%' }}
              onClick={() => handleSignIn(provider.id)}
              disabled={loadingProvider !== null}
            >
              {loadingProvider === provider.id ? 'Connecting…' : provider.label}
            </button>
          ))}
        </div>
        <p className="panel-subcopy" style={{ marginTop: '1.5rem' }}>
          Looking to test locally? Run <code>npm run dev</code>, set your secrets, and try the flows above. Need an
          account? <Link href="/docs/getting-started">Follow the getting started guide</Link>.
        </p>
      </section>
    </div>
  );
}
