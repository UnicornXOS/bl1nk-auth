import { generateKeyPair, exportJWK, SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose';
import type { KeyLike } from 'jose';
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
  const { publicKey: pub, privateKey: prv } = await generateKeyPair('RS256');
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




