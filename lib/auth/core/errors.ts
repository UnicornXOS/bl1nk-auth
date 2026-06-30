import { NextResponse } from "next/server";
import { AuthError, AuthErrorCode } from "./types";

// ────────────────────────────────────────────────
// Error Response Helper
// ────────────────────────────────────────────────
export function createErrorResponse(error: AuthError | Error, statusCode?: number): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json(error.toJSON(), {
      status: error.statusCode,
    });
  }

  return NextResponse.json(
    {
      error: AuthErrorCode.AUTHENTICATION_FAILED,
      message: error.message || "An unexpected error occurred",
    },
    { status: statusCode ?? 500 },
  );
}

// ────────────────────────────────────────────────
// Error Logging Helper
// ────────────────────────────────────────────────
export function logAuthError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>,
): void {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  const errorStack = error instanceof Error ? error.stack : undefined;

  console.error(`[auth:${context}] Error:`, {
    message: errorMessage,
    stack: errorStack,
    ...additionalInfo,
  });
}

// ────────────────────────────────────────────────
// Handle Auth Error
// ────────────────────────────────────────────────
export function handleAuthError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>,
): NextResponse {
  logAuthError(context, error, additionalInfo);

  if (error instanceof AuthError) {
    return createErrorResponse(error);
  }

  return createErrorResponse(
    new AuthError(
      AuthErrorCode.AUTHENTICATION_FAILED,
      "An unexpected error occurred",
      500,
      error instanceof Error ? error.message : undefined,
    ),
  );
}
