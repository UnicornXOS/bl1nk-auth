import { AUTH_CONFIG, getCallbackUrl } from "@/lib/auth/core/config";
import type { ProviderConfig, ProviderStrategy, UserProfile } from "@/lib/auth/core/types";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import { ENV } from "@/lib/utils/env";

// ────────────────────────────────────────────────
// GitHub Provider Configuration
// ────────────────────────────────────────────────
export const GITHUB_CONFIG: ProviderConfig = {
  clientId: AUTH_CONFIG.providers.github.clientId,
  clientSecret: AUTH_CONFIG.providers.github.clientSecret,
  redirectUri: getCallbackUrl(),
  scopes: ["read:user", "user:email"],
  authorizationUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  userInfoUrl: "https://api.github.com/user",
};

// ────────────────────────────────────────────────
// GitHub Strategy
// ────────────────────────────────────────────────
export class GitHubStrategy implements ProviderStrategy {
  name = "github";

  getConfig(): ProviderConfig {
    return GITHUB_CONFIG;
  }

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: GITHUB_CONFIG.clientId,
      redirect_uri: GITHUB_CONFIG.redirectUri,
      scope: GITHUB_CONFIG.scopes.join(" "),
      state,
    });
    return `${GITHUB_CONFIG.authorizationUrl}?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<string> {
    const response = await fetch(GITHUB_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CONFIG.clientId,
        client_secret: GITHUB_CONFIG.clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      throw new AuthError(
        AuthErrorCode.TOKEN_EXCHANGE_FAILED,
        "GitHub token exchange failed",
        500,
        data.error_description || data.error,
      );
    }

    return data.access_token;
  }

  async fetchProfile(accessToken: string): Promise<UserProfile> {
    const userResponse = await fetch(GITHUB_CONFIG.userInfoUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      throw new AuthError(
        AuthErrorCode.PROFILE_FETCH_FAILED,
        "Failed to fetch GitHub profile",
        500,
      );
    }

    const userData = await userResponse.json();

    return {
      id: String(userData.id),
      email: userData.email,
      name: userData.name || userData.login,
      image: userData.avatar_url,
      provider: "github",
      providerAccountId: String(userData.id),
    };
  }
}

// ────────────────────────────────────────────────
// Export singleton instance
// ────────────────────────────────────────────────
export const githubStrategy = new GitHubStrategy();
