import { signJWT, type TokenPayload, verifyJWT } from "@/lib/utils/crypto";
import { ENV } from "@/lib/utils/env";
import { AUTH_CONFIG } from "./config";
import { AuthError, AuthErrorCode, type AuthTokenPayload } from "./types";

// ────────────────────────────────────────────────
// Create Access Token
// ────────────────────────────────────────────────
export async function createAccessToken(payload: Omit<AuthTokenPayload, "type">): Promise<string> {
  try {
    return await signJWT(
      { ...payload, type: "access" } as unknown as TokenPayload,
      ENV.JWT_SECRET,
      {
        aud: AUTH_CONFIG.token.access.audience,
        iss: AUTH_CONFIG.issuer,
        expiresIn: AUTH_CONFIG.token.access.expiresIn,
      },
    );
  } catch (_error) {
    throw new AuthError(AuthErrorCode.AUTHENTICATION_FAILED, "Failed to create access token", 500);
  }
}

// ────────────────────────────────────────────────
// Create Refresh Token
// ────────────────────────────────────────────────
export async function createRefreshToken(payload: Omit<AuthTokenPayload, "type">): Promise<string> {
  try {
    return await signJWT(
      { ...payload, type: "refresh" } as unknown as TokenPayload,
      ENV.JWT_SECRET,
      {
        aud: AUTH_CONFIG.token.refresh.audience,
        iss: AUTH_CONFIG.issuer,
        expiresIn: AUTH_CONFIG.token.refresh.expiresIn,
      },
    );
  } catch (_error) {
    throw new AuthError(AuthErrorCode.AUTHENTICATION_FAILED, "Failed to create refresh token", 500);
  }
}

// ────────────────────────────────────────────────
// Create One-Time Token (OTT)
// ────────────────────────────────────────────────
export async function createOTT(payload: Omit<AuthTokenPayload, "type">): Promise<string> {
  try {
    return await signJWT({ ...payload, type: "ott" } as unknown as TokenPayload, ENV.PRIV, {
      aud: AUTH_CONFIG.token.ott.audience,
      iss: AUTH_CONFIG.issuer,
      expiresIn: AUTH_CONFIG.token.ott.expiresIn,
    });
  } catch (_error) {
    throw new AuthError(
      AuthErrorCode.AUTHENTICATION_FAILED,
      "Failed to create one-time token",
      500,
    );
  }
}

// ────────────────────────────────────────────────
// Verify Token
// ────────────────────────────────────────────────
export async function verifyAuthToken(
  token: string,
  expectedType?: "access" | "refresh" | "ott",
): Promise<AuthTokenPayload> {
  try {
    const payload = await verifyJWT(token, {
      aud: expectedType === "ott" ? AUTH_CONFIG.token.ott.audience : "auth",
      iss: AUTH_CONFIG.issuer,
    });

    const authPayload = payload as AuthTokenPayload;

    if (expectedType && authPayload.type !== expectedType) {
      throw new AuthError(
        AuthErrorCode.INVALID_TOKEN,
        `Expected ${expectedType} token, got ${authPayload.type}`,
        401,
      );
    }

    return authPayload;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError(
      AuthErrorCode.INVALID_TOKEN,
      "Token verification failed",
      401,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

// ────────────────────────────────────────────────
// Create Session JWT (for API access)
// ────────────────────────────────────────────────
export async function createSessionJWT(sub: string, audience?: string): Promise<string> {
  try {
    return await signJWT(
      {
        sub,
        type: "access",
        scope: ["profile:read", "email:read"],
      } as unknown as TokenPayload,
      ENV.JWT_SECRET,
      {
        aud: audience ?? AUTH_CONFIG.token.access.audience,
        iss: AUTH_CONFIG.issuer,
        expiresIn: "30m",
      },
    );
  } catch (_error) {
    throw new AuthError(AuthErrorCode.AUTHENTICATION_FAILED, "Failed to create session JWT", 500);
  }
}
