import { generateKeyPair, exportJWK, SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose';
import type { KeyLike } from 'jose';
import { logger } from '@/lib/logger';

let privateKey: KeyLike | null = null;
let publicKey: KeyLike | null = null;
let kid = 'dev-key-1';

async function ensureKeys() {
  if (privateKey && publicKey) return;

  const privPem = process.env.AUTH_PRIVATE_KEY_PEM;
  const pubPem = process.env.AUTH_PUBLIC_KEY_PEM;
  kid = process.env.AUTH_KEY_KID || 'dev-key-1';

  if (privPem && pubPem) {
    privateKey = (await importPKCS8(privPem, 'RS256')) as unknown as CryptoKey;
    publicKey = (await importSPKI(pubPem, 'RS256')) as unknown as CryptoKey;
    return;
  }

  // Generate new key pair only if not already cached
  const { publicKey: pub, privateKey: prv } = await generateKeyPair('RS256');
  privateKey = prv;
  publicKey = pub;

  // Log key generation for security monitoring
  logger.warn('Generated new RSA key pair - this should only happen in development', {
    endpoint: 'crypto',
    action: 'key_generation'
  });
}

export async function jwks() {
  await ensureKeys();
  const jwk = await exportJWK(publicKey!);
  (jwk as any).use = 'sig'; (jwk as any).kid = kid; (jwk as any).alg = 'RS256'; (jwk as any).kty = 'RSA';
  return { keys: [jwk] };
}

export async function signJWT(payload: Record<string, any>, {aud,iss,expSeconds=1800}:{aud:string,iss:string,expSeconds?:number}){
  await ensureKeys();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg:'RS256', kid })
    .setIssuedAt()
    .setIssuer(iss)
    .setAudience(aud)
    .setExpirationTime(`${expSeconds}s`)
    .sign(privateKey!);
}

export async function verifyJWT(token: string, {aud,iss}:{aud:string,iss:string}){
  await ensureKeys();
  const { payload } = await jwtVerify(token, publicKey!, { algorithms:['RS256'], audience:aud, issuer:iss });
  return payload;
}




