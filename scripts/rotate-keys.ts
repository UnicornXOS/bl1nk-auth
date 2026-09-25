import { exportPKCS8, exportSPKI, generateKeyPair } from "jose";

async function rotateKeys() {
  const kid = `key-${Date.now()}`;
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const privatePem = await exportPKCS8(privateKey);
  const publicPem = await exportSPKI(publicKey);

  // biome-ignore lint/suspicious/noConsole: CLI key generator output
  console.log(`Generated new RSA Keypair with kid: ${kid}\n`);
  // biome-ignore lint/suspicious/noConsole: CLI key generator output
  console.log(`AUTH_KEY_KID="${kid}"`);
  // biome-ignore lint/suspicious/noConsole: CLI key generator output
  console.log(`AUTH_PRIVATE_KEY_PEM="${privatePem.replace(/\n/g, "\\n")}"`);
  // biome-ignore lint/suspicious/noConsole: CLI key generator output
  console.log(`AUTH_PUBLIC_KEY_PEM="${publicPem.replace(/\n/g, "\\n")}"`);
}

rotateKeys();
