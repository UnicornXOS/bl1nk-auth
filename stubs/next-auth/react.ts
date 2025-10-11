'use client';

interface SignInOptions {
  callbackUrl?: string;
  clientId?: string;
}

// Default clientId used when callers do not provide one. Override via
// NEXT_PUBLIC_DEFAULT_OAUTH_CLIENT_ID to match the OAuth client registered
// for the deployment.
const DEFAULT_CLIENT_ID =
  process.env.NEXT_PUBLIC_DEFAULT_OAUTH_CLIENT_ID ?? 'note';

export async function signIn(provider: string, options?: SignInOptions): Promise<void> {
  if (provider !== 'github') {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  const callbackUrl = options?.callbackUrl ?? '/';
  const clientId = options?.clientId ?? DEFAULT_CLIENT_ID;
  const target = `/api/login?client=${encodeURIComponent(clientId)}&provider=github&return=${encodeURIComponent(callbackUrl)}`;
  window.location.href = target;
}

export async function signOut(): Promise<void> {
  window.location.href = '/api/session/logout';
}
