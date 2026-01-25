import { NextRequest, NextResponse } from 'next/server';
import { getClient, isReturnAllowed } from '@/lib/clients';
import { ENV } from '@/lib/env';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const clientParam = url.searchParams.get('client');
    const returnParam = url.searchParams.get('return');
    const providerParam = url.searchParams.get('provider');

    if (!clientParam || !returnParam || !providerParam) {
        return NextResponse.json({ error: 'missing_params' }, { status: 400 });
    }

    const clientConfig = getClient(clientParam);
    if (!clientConfig || !isReturnAllowed(clientConfig, returnParam)) {
        return NextResponse.json({ error: 'invalid_client_or_return' }, { status: 400 });
    }

    const stateObj = {
        client: clientParam,
        ret: returnParam,
        provider: providerParam,
        ts: Date.now()
    };

    const stateString = JSON.stringify(stateObj);
    // Using Buffer for base64url encoding (Node.js runtime)
    const stateEncoded = Buffer.from(stateString).toString('base64url');

    const callbackUrl = `${ENV.ISSUER.replace(/\/$/, '')}/api/oauth/callback`;

    let redirectUrl = '';

    if (providerParam === 'github') {
        if (!ENV.GITHUB_ID) {
            console.error('[Login] GitHub provider not configured');
            return NextResponse.json({ error: 'provider_not_configured' }, { status: 500 });
        }
        const params = new URLSearchParams({
            client_id: ENV.GITHUB_ID,
            redirect_uri: callbackUrl,
            scope: 'read:user user:email',
            state: stateEncoded,
        });
        redirectUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    } else if (providerParam === 'google') {
        if (!ENV.GOOGLE_ID) {
            console.error('[Login] Google provider not configured');
            return NextResponse.json({ error: 'provider_not_configured' }, { status: 500 });
        }
        const params = new URLSearchParams({
            client_id: ENV.GOOGLE_ID,
            redirect_uri: callbackUrl,
            response_type: 'code',
            scope: 'openid email profile',
            state: stateEncoded,
            access_type: 'offline',
        });
        redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    } else {
        return NextResponse.json({ error: 'unsupported_provider' }, { status: 400 });
    }

    return NextResponse.redirect(redirectUrl);
}
