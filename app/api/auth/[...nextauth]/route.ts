import { authHandlers } from "@/lib/auth/core/middleware";

export const runtime = "nodejs";

export const { GET, POST } = authHandlers;
