import { type NextRequest, NextResponse } from "next/server";
import { createCorsResponse, getSession } from "./session";
import type { AuthSession } from "./types";

// ────────────────────────────────────────────────
// Auth Middleware Handler
// ────────────────────────────────────────────────
type AuthMiddlewareOptions = {
  requireAuth?: boolean;
  allowedRoles?: string[];
};

export async function authMiddleware(
  req: NextRequest,
  options: AuthMiddlewareOptions = {},
): Promise<{ session: AuthSession | null; response?: NextResponse }> {
  const { requireAuth = false, allowedRoles } = options;
  const session = await getSession();

  if (requireAuth && !session) {
    return {
      session: null,
      response: createCorsResponse({ error: "unauthorized" }, 401),
    };
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    session?.user?.role &&
    !allowedRoles.includes(session.user.role)
  ) {
    return {
      session,
      response: createCorsResponse({ error: "forbidden" }, 403),
    };
  }

  return { session };
}

// ────────────────────────────────────────────────
// Protected Route Wrapper
// ────────────────────────────────────────────────
type Handler = (req: NextRequest, session: AuthSession) => Promise<NextResponse>;

export function withAuth(handler: Handler, options: AuthMiddlewareOptions = {}) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const { session, response } = await authMiddleware(req, options);

    if (response) {
      return response;
    }

    return handler(req, session!);
  };
}

// ────────────────────────────────────────────────
// Session GET Handler (for [...nextauth] route)
// ────────────────────────────────────────────────
const getHandler = async (): Promise<NextResponse> => {
  const session = await getSession();
  return NextResponse.json({ session });
};

const postHandler = async (): Promise<NextResponse> => {
  return NextResponse.json({ error: "not_supported" }, { status: 405 });
};

export const authHandlers = { GET: getHandler, POST: postHandler };
