'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import type { JSX } from 'react';
import Button from '@/components/ui/button';

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (): Promise<void> => {
    try {
      setLoading(true);
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('[login] sign-in failed', error);
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '80px 24px', display: 'grid', placeItems: 'center' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '24px',
          background: '#FFFFFF',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          padding: '32px',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)'
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Log in</h1>
        <p style={{ marginBottom: '24px', color: '#475569' }}>
          เชื่อมต่อ GitHub เพื่อเข้าถึงแดชบอร์ดและทดสอบ webhook
        </p>
        <Button
          style={{ width: '100%' }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Connecting…' : 'Continue with GitHub'}
        </Button>
      </div>
    </section>
  );
}
