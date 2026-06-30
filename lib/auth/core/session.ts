import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "./config";
import { verifyAuthToken } from "./token";
import {
  AuthError,
  AuthErrorCode,
  type AuthSession,
  type CookieOptions,
  DEFAULT_REFRESH_COOKIE_OPTIONS,
} from "./types";

// ────────────────────────────────────────────────
// Read Refresh Token from Cookie
// ────────────────────────────────────────────────
export async function readRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const entry = cookieStore.get(AUTH_CONFIG.cookie.refreshName);
  return entry?.value ?? null;
}

// ────────────────────────────────────────────────
// Set Refresh Token Cookie
// ────────────────────────────────────────────────
export async function setRefreshTokenCookie(
  token: string,
  options?: Partial<CookieOptions>,
): Promise<void> {
  const cookieStore = await cookies();
  const opts = { ...DEFAULT_REFRESH_COOKIE_OPTIONS, ...options };
  cookieStore.set(AUTH_CONFIG.cookie.refreshName, token, opts);
}

// ────────────────────────────────────────────────
// Clear Refresh Token Cookie
// ────────────────────────────────────────────────
export async function clearRefreshTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.cookie.refreshName);
}

// ────────────────────────────────────────────────
// Get Current Session
// ────────────────────────────────────────────────
export async function getSession(): Promise<AuthSession | null> {
  const token = await readRefreshToken();
  if (!token) return null;

  try {
    const payload = await verifyAuthToken(token, "refresh");
    return {
      user: {
        id: payload.sub,
        name: typeof payload.name === "string" ? payload.name : undefined,
        email: payload.email,
        role: payload.role,
      },
      provider: typeof payload.provider === "string" ? payload.provider : undefined,
    };
  } catch (error) {
    console.error("[auth:session] Failed to verify session:", error);
    return null;
  }
}

// ────────────────────────────────────────────────
// Sign Out
// ────────────────────────────────────────────────
export async function signOut(): Promise<void> {
  await clearRefreshTokenCookie();
}

// ────────────────────────────────────────────────
// Create CORS Response
// ────────────────────────────────────────────────
export function createCorsResponse(
  body: unknown,
  status: number,
  origin?: string | null,
): NextResponse {
  const response = NextResponse.json(body, { status });
  response.headers.set("Access-Control-Allow-Origin", origin ?? "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// ────────────────────────────────────────────────
// Create Session Response (with refresh cookie)
// ────────────────────────────────────────────────
export async function createSessionResponse(
  refreshToken: string,
  body: unknown = { ok: true },
  status = 200,
): Promise<NextResponse> {
  const response = NextResponse.json(body, { status });
  response.cookies.set(AUTH_CONFIG.cookie.refreshName, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}

// ────────────────────────────────────────────────
// Create Logout Response
// ────────────────────────────────────────────────
export function createLogoutResponse(): NextResponse {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_CONFIG.cookie.refreshName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
