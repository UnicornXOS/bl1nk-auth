import { ENV } from "@/lib/utils/env";
import { AuthError, AuthErrorCode } from "./types";

// ────────────────────────────────────────────────
// Auth Configuration
// ────────────────────────────────────────────────
export const AUTH_CONFIG = {
  issuer: ENV.ISSUER,
  audience: ENV.AUD,
  callbackPath: "/api/oauth/callback",
  loginPath: "/api/login",

  token: {
    access: {
      expiresIn: "15m",
      audience: "auth",
    },
    refresh: {
      expiresIn: "7d",
      audience: "auth",
    },
    ott: {
      expiresIn: "1m",
      audience: "auth",
    },
  },

  cookie: {
    refreshName: "bl1nk_refresh",
  },

  providers: {
    github: {
      enabled: Boolean(ENV.GITHUB_ID),
      clientId: ENV.GITHUB_ID,
      clientSecret: ENV.GITHUB_SECRET,
    },
    google: {
      enabled: Boolean(ENV.GOOGLE_ID),
      clientId: ENV.GOOGLE_ID,
      clientSecret: ENV.GOOGLE_SECRET,
    },
  },
} as const;

// ────────────────────────────────────────────────
// Get Callback URL
// ────────────────────────────────────────────────
export function getCallbackUrl(): string {
  return `${AUTH_CONFIG.issuer.replace(/\/$/, "")}${AUTH_CONFIG.callbackPath}`;
}

// ────────────────────────────────────────────────
// Validate Provider Configuration
// ────────────────────────────────────────────────
export function validateProviderConfig(provider: string): void {
  const config = AUTH_CONFIG.providers[provider as keyof typeof AUTH_CONFIG.providers];
  if (!config || !config.enabled) {
    throw new AuthError(
      AuthErrorCode.PROVIDER_NOT_CONFIGURED,
      `Provider ${provider} is not configured`,
      500,
    );
  }
}

// ────────────────────────────────────────────────
// Get Available Providers
// ────────────────────────────────────────────────
export function getAvailableProviders(): string[] {
  return Object.entries(AUTH_CONFIG.providers)
    .filter(([, config]) => config.enabled)
    .map(([name]) => name);
}
