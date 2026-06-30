import { createCorsResponse, createLogoutResponse } from "@/lib/auth/core/session";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  return createLogoutResponse();
}

export async function OPTIONS(_req: NextRequest) {
  return createCorsResponse({}, 200);
}
