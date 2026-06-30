import { AUTH_CONFIG, getCallbackUrl } from "@/lib/auth/core/config";
import type { ProviderConfig, ProviderStrategy, UserProfile } from "@/lib/auth/core/types";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import { ENV } from "@/lib/utils/env";

// ────────────────────────────────────────────────
// Google Provider Configuration
// ────────────────────────────────────────────────
export const GOOGLE_CONFIG: ProviderConfig = {
  clientId: AUTH_CONFIG.providers.google.clientId,
  clientSecret: AUTH_CONFIG.providers.google.clientSecret,
  redirectUri: getCallbackUrl(),
  scopes: ["openid", "email", "profile"],
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  userInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
};

// ────────────────────────────────────────────────
// Google Strategy
// ────────────────────────────────────────────────
export class GoogleStrategy implements ProviderStrategy {
  name = "google";

  getConfig(): ProviderConfig {
    return GOOGLE_CONFIG;
  }

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: GOOGLE_CONFIG.clientId,
      redirect_uri: GOOGLE_CONFIG.redirectUri,
      response_type: "code",
      scope: GOOGLE_CONFIG.scopes.join(" "),
      state,
      access_type: "offline",
    });
    return `${GOOGLE_CONFIG.authorizationUrl}?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<string> {
    const response = await fetch(GOOGLE_CONFIG.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: GOOGLE_CONFIG.clientId,
        client_secret: GOOGLE_CONFIG.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE_CONFIG.redirectUri,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      throw new AuthError(
        AuthErrorCode.TOKEN_EXCHANGE_FAILED,
        "Google token exchange failed",
        500,
        data.error_description || data.error,
      );
    }

    return data.access_token;
  }

  async fetchProfile(accessToken: string): Promise<UserProfile> {
    const userResponse = await fetch(GOOGLE_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      throw new AuthError(
        AuthErrorCode.PROFILE_FETCH_FAILED,
        "Failed to fetch Google profile",
        500,
      );
    }

    const userData = await userResponse.json();

    return {
      id: userData.sub,
      email: userData.email,
      name: userData.name,
      image: userData.picture,
      provider: "google",
      providerAccountId: userData.sub,
    };
  }
}

// ────────────────────────────────────────────────
// Export singleton instance
// ────────────────────────────────────────────────
export const googleStrategy = new GoogleStrategy();
