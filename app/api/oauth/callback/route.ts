import { NextRequest, NextResponse } from "next/server";
import { ENV } from "@/lib/utils/env";
import { signJWT } from "@/lib/utils/crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const stateEncoded = url.searchParams.get("state");

    if (!code || !stateEncoded) {
        return NextResponse.json({ error: "missing_code_or_state" }, { status: 400 });
    }

    try {
        const stateString = Buffer.from(stateEncoded, "base64url").toString("utf8");
        const state = JSON.parse(stateString);

        let profile: { id: string; email: string; name: string; image?: string };

        if (state.provider === "github") {
            const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    client_id: ENV.GITHUB_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                }),
            });
            const tokenData = await tokenRes.json();
            if (!tokenData.access_token) throw new Error("github_token_exchange_failed");

            const userRes = await fetch("https://api.github.com/user", {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const userData = await userRes.json();
            profile = {
                id: String(userData.id),
                email: userData.email,
                name: userData.name || userData.login,
                image: userData.avatar_url,
            };
        } else if (state.provider === "google") {
            const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: ENV.GOOGLE_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: `${ENV.ISSUER.replace(/\/$/, "")}/api/oauth/callback`,
                }),
            });
            const tokenData = await tokenRes.json();
            if (!tokenData.access_token) throw new Error("google_token_exchange_failed");

            const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const userData = await userRes.json();
            profile = {
                id: userData.sub,
                email: userData.email,
                name: userData.name,
                image: userData.picture,
            };
        } else {
            throw new Error("unsupported_provider");
        }

        // Sync User with Database
        const user = await prisma.user.upsert({
            where: { email: profile.email },
            update: {
                name: profile.name,
                image: profile.image,
            },
            create: {
                email: profile.email,
                name: profile.name,
                image: profile.image,
            },
        });

        // Create OTT (One Time Token)
        const ott = await signJWT(
            {
                sub: user.id,
                email: user.email ?? "",
                type: "ott" as any,
            },
            ENV.PRIV,
            {
                iss: ENV.ISSUER,
                aud: "auth",
                expiresIn: "1m",
            }
        );

        const redirectUrl = new URL(state.ret);
        redirectUrl.searchParams.set("ott", ott);

        return NextResponse.redirect(redirectUrl.toString());

    } catch (error: any) {
        console.error("[OAuth Callback] Error:", error.message);
        return NextResponse.json({ error: "authentication_failed", detail: error.message }, { status: 500 });
    }
}
