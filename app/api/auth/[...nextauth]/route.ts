import { authHandlers } from "@/lib/auth/middleware";

export const runtime = "nodejs";

export const { GET, POST } = authHandlers;
