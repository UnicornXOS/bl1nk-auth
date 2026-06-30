import type { JWTPayload } from "jose";

// ────────────────────────────────────────────────
// User Profile (from OAuth providers)
// ────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: string;
  providerAccountId: string;
}

// ────────────────────────────────────────────────
// Token Payload
// ────────────────────────────────────────────────
export interface AuthTokenPayload extends JWTPayload {
  sub: string;
  email?: string;
  role?: string;
  type: "access" | "refresh" | "ott";
  scope?: string[];
}

// ────────────────────────────────────────────────
// Session
// ────────────────────────────────────────────────
export interface AuthSession {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };
  provider?: string;
  expires?: Date;
}

// ────────────────────────────────────────────────
// OAuth State
// ────────────────────────────────────────────────
export interface OAuthState {
  client: string;
  ret: string;
  provider: string;
  ts: number;
}

// ────────────────────────────────────────────────
// Provider Configuration
// ────────────────────────────────────────────────
export interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authorizationUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
}

// ────────────────────────────────────────────────
// Provider Strategy Interface
// ────────────────────────────────────────────────
export interface ProviderStrategy {
  name: string;
  getConfig(): ProviderConfig;
  getAuthorizationUrl(state: string): string;
  exchangeCode(code: string): Promise<string>;
  fetchProfile(accessToken: string): Promise<UserProfile>;
}

// ────────────────────────────────────────────────
// Callback Result
// ────────────────────────────────────────────────
export interface CallbackResult {
  success: boolean;
  profile?: UserProfile;
  error?: AuthError;
  redirectUrl?: string;
}

// ────────────────────────────────────────────────
// Auth Error
// ────────────────────────────────────────────────
export enum AuthErrorCode {
  MISSING_PARAMS = "missing_params",
  INVALID_CLIENT = "invalid_client",
  INVALID_RETURN = "invalid_return",
  PROVIDER_NOT_CONFIGURED = "provider_not_configured",
  UNSUPPORTED_PROVIDER = "unsupported_provider",
  TOKEN_EXCHANGE_FAILED = "token_exchange_failed",
  PROFILE_FETCH_FAILED = "profile_fetch_failed",
  AUTHENTICATION_FAILED = "authentication_failed",
  INVALID_TOKEN = "invalid_token",
  TOKEN_EXPIRED = "token_expired",
  MISSING_CODE_OR_STATE = "missing_code_or_state",
  INVALID_STATE = "invalid_state",
}

export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    message: string,
    public statusCode = 400,
    public detail?: string,
  ) {
    super(message);
    this.name = "AuthError";
  }

  toJSON() {
    return {
      error: this.code,
      message: this.message,
      ...(this.detail && { detail: this.detail }),
    };
  }
}

// ────────────────────────────────────────────────
// Callback Handler Interface
// ────────────────────────────────────────────────
export interface CallbackHandler {
  handle(code: string, state: OAuthState): Promise<CallbackResult>;
}

// ────────────────────────────────────────────────
// Auth Response Format
// ────────────────────────────────────────────────
export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    detail?: string;
  };
}

// ────────────────────────────────────────────────
// Cookie Options
// ────────────────────────────────────────────────
export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
  maxAge: number;
}

export const DEFAULT_REFRESH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days
};
