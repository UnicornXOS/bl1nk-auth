import { AUTH_CONFIG } from "@/lib/auth/core/config";
import { handleAuthError } from "@/lib/auth/core/errors";
import { createSessionJWT, verifyAuthToken } from "@/lib/auth/core/token";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get(AUTH_CONFIG.cookie.refreshName)?.value;

  if (!refresh) {
    return NextResponse.json({ error: "no_refresh" }, { status: 401 });
  }

  try {
    // Verify refresh token
    const payload = await verifyAuthToken(refresh, "refresh");

    // Create new session JWT
    const jwt = await createSessionJWT(
      String(payload.sub),
      process.env.AUTH_AUDIENCE || "bl1nk-note",
    );

    return NextResponse.json({ jwt });
  } catch (error) {
    return handleAuthError("session-refresh", error);
  }
}
