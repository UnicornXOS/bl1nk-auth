import { exportPKCS8, exportSPKI, generateKeyPair } from "jose";

async function generateKeys() {
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const _priv = await exportPKCS8(privateKey);
  const _pub = await exportSPKI(publicKey);
}

generateKeys();
