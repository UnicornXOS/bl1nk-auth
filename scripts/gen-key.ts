import { generateKeyPair, exportPKCS8, exportSPKI } from 'jose';

async function generateKeys() {
  const { publicKey, privateKey } = await generateKeyPair('RS256');
  const priv = await exportPKCS8(privateKey);
  const pub = await exportSPKI(publicKey);
  console.log('AUTH_PRIVATE_KEY_PEM=\n' + priv);
  console.log('AUTH_PUBLIC_KEY_PEM=\n' + pub);
  console.log('AUTH_KEY_KID=dev-key-1');
}

generateKeys();