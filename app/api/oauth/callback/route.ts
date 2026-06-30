import { handleAuthError } from "@/lib/auth/core/errors";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import type { OAuthState } from "@/lib/auth/core/types";
import { getCallbackHandler } from "@/lib/auth/providers";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ────────────────────────────────────────────────
// OAuth Callback Handler
// Routes to the appropriate provider callback handler
// ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const stateEncoded = url.searchParams.get("state");

  if (!code || !stateEncoded) {
    return NextResponse.json({ error: AuthErrorCode.MISSING_CODE_OR_STATE }, { status: 400 });
  }

  try {
    // Decode state
    const stateString = Buffer.from(stateEncoded, "base64url").toString("utf8");
    const state: OAuthState = JSON.parse(stateString);

    // Get provider callback handler
    const handler = getCallbackHandler(state.provider);
    if (!handler) {
      throw new AuthError(
        AuthErrorCode.UNSUPPORTED_PROVIDER,
        `Unsupported provider: ${state.provider}`,
        400,
      );
    }

    // Handle callback
    const result = await handler.handle(code, state);

    if (!result.success || !result.redirectUrl) {
      throw (
        result.error ??
        new AuthError(AuthErrorCode.AUTHENTICATION_FAILED, "Authentication failed", 500)
      );
    }

    return NextResponse.redirect(result.redirectUrl);
  } catch (error) {
    return handleAuthError("oauth-callback", error, {
      provider: url.searchParams.get("state")?.substring(0, 20),
    });
  }
}
