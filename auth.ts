import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/crypto';
import { ENV } from '@/lib/env';

type JwtPayload = Record<string, unknown> & { sub?: string };

export interface Session {
  user?: {
    id?: string;
    name?: string;
  };
  provider?: string;
}

async function readRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const entry = cookieStore.get('bl1nk_refresh');
  if (!entry || !entry.value) {
    return null;
  }
  return entry.value;
}

function mapPayloadToSession(payload: JwtPayload): Session {
  const id = typeof payload.sub === 'string' ? payload.sub : undefined;
  const provider = typeof payload.provider === 'string' ? payload.provider : undefined;
  const name = typeof payload.name === 'string' ? payload.name : undefined;

  const user = id || name ? { id, name } : undefined;
  return {
    user,
    provider
  };
}

export async function auth(): Promise<Session | null> {
  const token = await readRefreshToken();
  if (!token) {
    return null;
  }
  try {
    const payload = await verifyJWT(token, { aud: 'auth', iss: ENV.ISSUER });
    if ((payload as JwtPayload)['type'] !== 'refresh') {
      return null;
    }
    return mapPayloadToSession(payload as JwtPayload);
  } catch (error) {
    console.error('[auth] failed to verify refresh token', error);
    return null;
  }
}

type Handler = (req: NextRequest) => Promise<NextResponse>;

const getHandler: Handler = async () => {
  const session = await auth();
  return NextResponse.json({ session });
};

const postHandler: Handler = async () => {
  return NextResponse.json({ error: 'not_supported' }, { status: 405 });
};

export const authHandlers = { GET: getHandler, POST: postHandler };

export async function signOut(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('bl1nk_refresh');
}
