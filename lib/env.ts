export const ENV = {
  ISSUER: process.env.AUTH_ISSUER ?? 'http://localhost:8787',
  AUD: process.env.AUTH_AUDIENCE ?? 'bl1nk-note',
  GITHUB_ID: process.env.GITHUB_CLIENT_ID ?? '',
  GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  PRIV: process.env.AUTH_PRIVATE_KEY_PEM ?? '',
  PUB: process.env.AUTH_PUBLIC_KEY_PEM ?? '',
  KID: process.env.AUTH_KEY_KID ?? 'dev-key-1',
};
