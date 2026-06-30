import { getAvailableProviders, getProvider } from "@/lib/auth";
import { AUTH_CONFIG } from "@/lib/auth/core/config";
import { handleAuthError } from "@/lib/auth/core/errors";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import { getClient, isReturnAllowed } from "@/lib/utils/clients";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ────────────────────────────────────────────────
// Login Route Handler
// Initiates OAuth flow for the specified provider
// ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientParam = url.searchParams.get("client");
  const returnParam = url.searchParams.get("return");
  const providerParam = url.searchParams.get("provider");

  // Validate required parameters
  if (!clientParam || !returnParam || !providerParam) {
    return NextResponse.json({ error: AuthErrorCode.MISSING_PARAMS }, { status: 400 });
  }

  try {
    // Validate client and return URL
    const clientConfig = getClient(clientParam);
    if (!clientConfig || !isReturnAllowed(clientConfig, returnParam)) {
      throw new AuthError(AuthErrorCode.INVALID_CLIENT, "Invalid client or return URL", 400);
    }

    // Get provider strategy
    const strategy = getProvider(providerParam);
    if (!strategy) {
      throw new AuthError(
        AuthErrorCode.UNSUPPORTED_PROVIDER,
        `Unsupported provider: ${providerParam}`,
        400,
      );
    }

    // Build OAuth state
    const stateObj = {
      client: clientParam,
      ret: returnParam,
      provider: providerParam,
      ts: Date.now(),
    };

    const stateString = JSON.stringify(stateObj);
    const stateEncoded = Buffer.from(stateString).toString("base64url");

    // Get authorization URL from provider
    const redirectUrl = strategy.getAuthorizationUrl(stateEncoded);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return handleAuthError("login", error, { provider: providerParam });
  }
}
