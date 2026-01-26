import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@/lib/utils/env";
import { verifyJWT, signJWT } from "@/lib/utils/crypto";

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get("bl1nk_refresh")?.value;
  if (!refresh)
    return NextResponse.json({ error: "no_refresh" }, { status: 401 });
  try {
    const payload = await verifyJWT(refresh, { aud: "auth", iss: ENV.ISSUER });
    if (payload["type"] !== "refresh") throw new Error("not_refresh");
    const jwt = await signJWT(
      {
        sub: String(payload.sub),
        scope: ["profile:read", "email:read", "github:public_repo"],
      },
      {
        aud: process.env.AUTH_AUDIENCE || "bl1nk-note",
        iss: ENV.ISSUER,
        expSeconds: 30 * 60,
      },
    );
    return NextResponse.json({ jwt });
  } catch (e: any) {
    return NextResponse.json(
      { error: "invalid_refresh", detail: e?.message },
      { status: 401 },
    );
  }
}
