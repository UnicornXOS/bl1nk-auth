import { validateProviderConfig } from "@/lib/auth/core/config";
import { createOTT } from "@/lib/auth/core/token";
import type {
  CallbackHandler,
  CallbackResult,
  OAuthState,
  UserProfile,
} from "@/lib/auth/core/types";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import { syncUser } from "@/lib/auth/core/user";
import { githubStrategy } from "./strategy";

// ────────────────────────────────────────────────
// GitHub Callback Handler
// ────────────────────────────────────────────────
export class GitHubCallbackHandler implements CallbackHandler {
  async handle(code: string, state: OAuthState): Promise<CallbackResult> {
    try {
      // Validate provider configuration
      validateProviderConfig("github");

      // Exchange code for access token
      const accessToken = await githubStrategy.exchangeCode(code);

      // Fetch user profile
      const profile = await githubStrategy.fetchProfile(accessToken);

      // Sync user with database
      const user = await syncUser(profile);

      // Create one-time token for session exchange
      const ott = await createOTT({
        sub: user.id,
        email: user.email ?? "",
      });

      // Build redirect URL with OTT
      const redirectUrl = new URL(state.ret);
      redirectUrl.searchParams.set("ott", ott);

      return {
        success: true,
        profile,
        redirectUrl: redirectUrl.toString(),
      };
    } catch (error) {
      console.error("[GitHub Callback] Error:", error);

      if (error instanceof AuthError) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: false,
        error: new AuthError(
          AuthErrorCode.AUTHENTICATION_FAILED,
          "GitHub authentication failed",
          500,
          error instanceof Error ? error.message : "Unknown error",
        ),
      };
    }
  }
}

// ────────────────────────────────────────────────
// Export singleton instance
// ────────────────────────────────────────────────
export const githubCallbackHandler = new GitHubCallbackHandler();
