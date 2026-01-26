import {
  generateKeyPair,
  exportJWK,
  SignJWT,
  jwtVerify,
  importPKCS8,
  importSPKI,
} from "jose";
import type { KeyLike, JWTPayload } from "jose";
import { UserRole } from "@/lib/auth/roles";

export interface TokenPayload extends JWTPayload {
  sub: string;
  email?: string;
  role?: UserRole;
  type: "access" | "refresh";
}

let privateKey: KeyLike | null = null;
let publicKey: KeyLike | null = null;
let kid = "dev-key-1";

async function ensureKeys() {
  if (privateKey && publicKey) return;
  const privPem = process.env.AUTH_PRIVATE_KEY_PEM;
  const pubPem = process.env.AUTH_PUBLIC_KEY_PEM;
  kid = process.env.AUTH_KEY_KID || "dev-key-1";

  try {
    if (privPem && pubPem) {
      privateKey = (await importPKCS8(
        privPem,
        "RS256",
      )) as unknown as CryptoKey;
      publicKey = (await importSPKI(pubPem, "RS256")) as unknown as CryptoKey;
      return;
    }
    const { publicKey: pub, privateKey: prv } = await generateKeyPair("RS256");
    privateKey = prv;
    publicKey = pub;
  } catch (error) {
    console.error("Failed to initialize cryptographic keys:", error);
    throw new Error("Cryptographic key initialization failed");
  }
}

export async function jwks() {
  await ensureKeys();
  const jwk = await exportJWK(publicKey!);
  (jwk as any).use = "sig";
  (jwk as any).kid = kid;
  (jwk as any).alg = "RS256";
  (jwk as any).kty = "RSA";
  return { keys: [jwk] };
}

export async function signJWT(
  payload: TokenPayload,
  _unused_secret: string, // Kept for interface compatibility but using RS256 keys
  { aud, iss, expiresIn }: { aud: string; iss: string; expiresIn: string },
) {
  try {
    await ensureKeys();
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "RS256", kid })
      .setIssuedAt()
      .setIssuer(iss)
      .setAudience(aud)
      .setExpirationTime(expiresIn)
      .sign(privateKey!);
  } catch (error) {
    console.error("JWT signing failed:", error);
    throw new Error("Failed to sign JWT token");
  }
}

export async function verifyJWT(
  token: string,
  { aud, iss }: { aud: string; iss: string },
) {
  try {
    await ensureKeys();
    const { payload } = await jwtVerify(token, publicKey!, {
      algorithms: ["RS256"],
      audience: aud,
      issuer: iss,
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Failed to verify JWT token");
  }
}
