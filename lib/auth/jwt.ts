import { signJWT, verifyJWT, TokenPayload } from "@/lib/utils/crypto";
import { ENV } from "@/lib/utils/env";

export const JWT_CONFIG = {
    access: {
        expiresIn: "15m",
        audience: "auth",
    },
    refresh: {
        expiresIn: "7d",
        audience: "auth",
    },
};

export async function createAccessToken(payload: Omit<TokenPayload, "type" | "sub"> & { sub: string }): Promise<string> {
    return signJWT({ ...payload, type: "access" }, ENV.JWT_SECRET, {
        expiresIn: JWT_CONFIG.access.expiresIn,
        iss: ENV.ISSUER,
        aud: JWT_CONFIG.access.audience,
    });
}

export async function createRefreshToken(payload: Omit<TokenPayload, "type" | "sub"> & { sub: string }): Promise<string> {
    return signJWT({ ...payload, type: "refresh" }, ENV.JWT_SECRET, {
        expiresIn: JWT_CONFIG.refresh.expiresIn,
        iss: ENV.ISSUER,
        aud: JWT_CONFIG.refresh.audience,
    });
}

export async function verifyToken(token: string): Promise<TokenPayload> {
    const payload = await verifyJWT(token, {
        iss: ENV.ISSUER,
        aud: "auth",
    });
    return payload as TokenPayload;
}
