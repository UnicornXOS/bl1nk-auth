import { NextRequest, NextResponse } from 'next/server';
import { ENV } from '@/lib/env';
import { getClient, isReturnAllowed } from '@/lib/clients';

type Provider = 'github' | 'google';

function resolveProvider(raw: string | null): Provider | null {
  if (!raw) return 'github';
  const normalized = raw.toLowerCase();
  if (normalized === 'github' || normalized === 'google') return normalized;
  return null;
}

export async function GET(req: NextRequest){
  const url = new URL(req.url);
  const client = url.searchParams.get('client') || 'note';
  const ret = url.searchParams.get('return') || '';
  const provider = resolveProvider(url.searchParams.get('provider'));
  if (!provider) {
    return NextResponse.json({ error: 'unsupported_provider' }, { status: 400 });
  }

  const cfg = getClient(client);
  if(!cfg || !isReturnAllowed(cfg, ret)) {
    return NextResponse.json({error:'invalid_client_or_return'}, {status:400});
  }

  if (provider === 'github' && (!ENV.GITHUB_ID || !ENV.GITHUB_SECRET)) {
    return NextResponse.json({ error: 'provider_not_configured' }, { status: 500 });
  }
  if (provider === 'google' && (!ENV.GOOGLE_ID || !ENV.GOOGLE_SECRET)) {
    return NextResponse.json({ error: 'provider_not_configured' }, { status: 500 });
  }

  const state = Buffer.from(JSON.stringify({client, ret, provider, ts: Date.now()})).toString('base64url');
  const redirectUri = `${ENV.ISSUER.replace(/\/$/, '')}/api/oauth/callback`;

  if (provider === 'github') {
    const gh = new URL('https://github.com/login/oauth/authorize');
    gh.searchParams.set('client_id', ENV.GITHUB_ID);
    gh.searchParams.set('redirect_uri', redirectUri);
    gh.searchParams.set('scope', 'read:user public_repo');
    gh.searchParams.set('state', state);
    return NextResponse.redirect(gh);
  }

  const google = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  google.searchParams.set('client_id', ENV.GOOGLE_ID);
  google.searchParams.set('redirect_uri', redirectUri);
  google.searchParams.set('response_type', 'code');
  google.searchParams.set('scope', 'openid email profile');
  google.searchParams.set('state', state);
  google.searchParams.set('prompt', 'consent');
  google.searchParams.set('access_type', 'online');
  return NextResponse.redirect(google);
}
