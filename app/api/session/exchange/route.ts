import { AUTH_CONFIG } from "@/lib/auth/core/config";
import { handleAuthError } from "@/lib/auth/core/errors";
import { createCorsResponse } from "@/lib/auth/core/session";
import { createSessionJWT, verifyAuthToken } from "@/lib/auth/core/token";
import { AuthError, AuthErrorCode } from "@/lib/auth/core/types";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  ott: z.string(),
  audience: z.string().default(AUTH_CONFIG.audience),
});

export async function POST(req: NextRequest) {
  const body = Body.safeParse(await req.json());
  if (!body.success) {
    return createCorsResponse({ error: "bad_request" }, 400, req.headers.get("origin"));
  }

  try {
    // Verify the one-time token
    const ottPayload = await verifyAuthToken(body.data.ott, "ott");

    // Create session JWT
    const jwt = await createSessionJWT(String(ottPayload.sub), body.data.audience);

    return createCorsResponse({ jwt }, 200, req.headers.get("origin"));
  } catch (error) {
    return handleAuthError("session-exchange", error);
  }
}

// Handle preflight requests
export async function OPTIONS(req: NextRequest) {
  return createCorsResponse({}, 200, req.headers.get("origin"));
}
