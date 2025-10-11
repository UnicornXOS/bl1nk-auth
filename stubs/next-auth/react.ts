'use client';

interface SignInOptions {
  callbackUrl?: string;
  clientId?: string;
}

export async function signIn(provider: string, options?: SignInOptions): Promise<void> {
  if (provider !== 'github') {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  const callbackUrl = options?.callbackUrl ?? '/';
  const clientId = options?.clientId ?? 'note';
  const target = `/api/login?client=${encodeURIComponent(clientId)}&provider=github&return=${encodeURIComponent(callbackUrl)}`;
  window.location.href = target;
}

export async function signOut(): Promise<void> {
  window.location.href = '/api/session/logout';
}
