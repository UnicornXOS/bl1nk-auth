import type { NextRequest } from "next/server";
import { createCorsResponse, createLogoutResponse } from "@/lib/auth/core/session";

export async function POST(_req: NextRequest) {
  return createLogoutResponse();
}

export async function OPTIONS(_req: NextRequest) {
  return createCorsResponse({}, 200);
}
