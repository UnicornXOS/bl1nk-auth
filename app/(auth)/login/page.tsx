'use client';

import { useState } from 'react';
import type { JSX } from 'react';
import { signIn } from 'next-auth/react';

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('github', { callbackUrl: '/board' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container max-w-md py-16">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-white/70">
        เชื่อมต่อ GitHub เพื่อเข้าถึงแดชบอร์ดและทดสอบ webhook
      </p>
      <button
        type="button"
        className="mt-6 w-full h-10 rounded bg-primary text-primary-foreground glow"
        onClick={handleSignIn}
        disabled={loading}
      >
        {loading ? 'Connecting…' : 'Continue with GitHub'}
      </button>
    </section>
  );
}
