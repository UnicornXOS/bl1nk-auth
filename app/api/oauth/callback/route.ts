import { NextRequest, NextResponse } from 'next/server';
import { ENV } from '@/lib/env';
import { signJWT } from '@/lib/crypto';
import { getClient, isReturnAllowed } from '@/lib/clients';

type Provider = 'github' | 'google';

type OAuthState = {
  client: string;
  ret: string;
  provider?: Provider;
  ts?: number;
};

const CALLBACK_URL = `${ENV.ISSUER.replace(/\/$/, '')}/api/oauth/callback`;

function parseState(raw: string): OAuthState | null {
  try {
    const decoded = JSON.parse(Buffer.from(raw, 'base64url').toString());
    if (!decoded || typeof decoded !== 'object') return null;
    const client = (decoded as any).client;
    const ret = (decoded as any).ret;
    const provider = (decoded as any).provider;
    const ts = (decoded as any).ts;
    if (typeof client !== 'string' || typeof ret !== 'string') return null;
    const state: OAuthState = { client, ret };
    if (provider === 'google' || provider === 'github') {
      state.provider = provider;
    }
    if (typeof ts === 'number') {
      state.ts = ts;
    }
    return state;
  } catch {
    return null;
  }
}

async function fetchGithubToken(code: string){
  const res = await fetch('https://github.com/login/oauth/access_token',{
    method:'POST',
    headers:{'Accept':'application/json','Content-Type':'application/json'},
    body: JSON.stringify({ client_id: ENV.GITHUB_ID, client_secret: ENV.GITHUB_SECRET, code, redirect_uri: CALLBACK_URL })
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json?.error_description || json?.error || 'token_request_failed');
  if(!json.access_token) throw new Error('no_token');
  return json.access_token as string;
}

async function fetchGithubUser(token: string){
  const res = await fetch('https://api.github.com/user',{ headers:{ Authorization:`Bearer ${token}`, 'User-Agent':'bl1nk-auth' } });
  const json = await res.json();
  if(!res.ok) throw new Error(json?.message || 'user_request_failed');
  return json;
}

async function fetchGoogleToken(code: string){
  const res = await fetch('https://oauth2.googleapis.com/token',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      client_id: ENV.GOOGLE_ID,
      client_secret: ENV.GOOGLE_SECRET,
      code,
      redirect_uri: CALLBACK_URL,
      grant_type: 'authorization_code'
    })
  });
  const json = await res.json();
  if(!res.ok) throw new Error(json?.error_description || json?.error || 'token_request_failed');
  if(!json.access_token) throw new Error('no_token');
  return { accessToken: json.access_token as string };
}

async function fetchGoogleUser(token: string){
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{ headers:{ Authorization:`Bearer ${token}` } });
  const json = await res.json();
  if(!res.ok) throw new Error(json?.error?.message || 'user_request_failed');
  return json;
}

export async function GET(req: NextRequest){
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const stateParam = url.searchParams.get('state');
  if(!code || !stateParam) return NextResponse.json({error:'invalid_code_or_state'},{status:400});

  const state = parseState(stateParam);
  if(!state) return NextResponse.json({error:'invalid_state'},{status:400});

  const provider: Provider = state.provider ?? 'github';
  const clientCfg = getClient(state.client);
  if(!clientCfg || !isReturnAllowed(clientCfg, state.ret)) {
    return NextResponse.json({error:'invalid_client_or_return'},{status:400});
  }

  try{
    let subject: string;

    if(provider === 'github'){
      if (!ENV.GITHUB_ID || !ENV.GITHUB_SECRET) throw new Error('provider_not_configured');
      const ghToken = await fetchGithubToken(code);
      const user = await fetchGithubUser(ghToken);
      const id = user?.id ?? user?.node_id;
      if(!id) throw new Error('missing_user_id');
      subject = String(id);
    }else{
      if (!ENV.GOOGLE_ID || !ENV.GOOGLE_SECRET) throw new Error('provider_not_configured');
      const googleToken = await fetchGoogleToken(code);
      const user = await fetchGoogleUser(googleToken.accessToken);
      const id = user?.id ?? user?.sub;
      if(!id) throw new Error('missing_user_id');
      subject = String(id);
    }

    const refreshPayload: Record<string, any> = { sub: subject, type:'refresh', provider };
    if(provider === 'github') refreshPayload.gh = true;

    const ottPayload: Record<string, any> = { sub: subject, type:'ott', client: state.client, provider };
    const refresh = await signJWT(refreshPayload, {aud:'auth', iss: ENV.ISSUER, expSeconds: 14*24*60*60});
    const ott = await signJWT(ottPayload, {aud:'auth', iss: ENV.ISSUER, expSeconds: 60});

    const redirectUrl = new URL(state.ret);
    redirectUrl.searchParams.set('ott', ott);

    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set('bl1nk_refresh', refresh, { httpOnly:true, secure:true, sameSite:'lax', path:'/', maxAge:14*24*60*60 });
    return res;
  }catch(e:any){
    return NextResponse.json({error:'oauth_failed', detail: e?.message},{status:400});
  }
}
