function validateEnv() {
  const requiredVars = ['AUTH_PRIVATE_KEY_PEM', 'AUTH_PUBLIC_KEY_PEM'];
  const missing = requiredVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }
}

validateEnv();

export const ENV = {
  ISSUER: process.env.AUTH_ISSUER ?? 'http://localhost:8787',
  AUD: process.env.AUTH_AUDIENCE ?? 'bl1nk-note',
  GITHUB_ID: process.env.GITHUB_ID ?? process.env.GITHUB_CLIENT_ID ?? '',
  GITHUB_SECRET: process.env.GITHUB_SECRET ?? process.env.GITHUB_CLIENT_SECRET ?? '',
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? '',
  PRIV: process.env.AUTH_PRIVATE_KEY_PEM ?? '',
  PUB: process.env.AUTH_PUBLIC_KEY_PEM ?? '',
  KID: process.env.AUTH_KEY_KID ?? 'dev-key-1',
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ?? '',
  UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL ?? '',
  UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN ?? '',
  NOTION_API_KEY: process.env.NOTION_API_KEY ?? '',
  NOTION_TASKS_DB_ID: process.env.NOTION_TASKS_DB_ID ?? '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN ?? '',
  LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN ?? '',
};
