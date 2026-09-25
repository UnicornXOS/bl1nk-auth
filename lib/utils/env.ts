function validateEnv() {
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return;
  }

  const requiredVars = ["AUTH_PRIVATE_KEY_PEM", "AUTH_PUBLIC_KEY_PEM"];
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (!process.env.PRISMA_DATABASE_URL && !process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    missing.push("PRISMA_DATABASE_URL / DATABASE_URL");
  }

  if (missing.length > 0) {
    const message = `[env] Critical: Missing environment variables: ${missing.join(", ")}`;
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PHASE !== "phase-production-build"
    ) {
      throw new Error(message);
    }
    // biome-ignore lint/suspicious/noConsole: env warning output
    console.warn(message);
  }
}

validateEnv();

export const ENV = {
  ISSUER: process.env.AUTH_ISSUER ?? "http://localhost:3000",
  AUD: process.env.AUTH_AUDIENCE ?? "auth",
  GITHUB_ID: process.env.GITHUB_CLIENT_ID ?? process.env.GITHUB_ID ?? "",
  GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET ?? process.env.GITHUB_SECRET ?? "",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? process.env.GITHUB_ID ?? "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? process.env.GITHUB_SECRET ?? "",
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_ID ?? "",
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_SECRET ?? "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_SECRET ?? "",
  PRIV: process.env.AUTH_PRIVATE_KEY_PEM ?? "",
  PUB: process.env.AUTH_PUBLIC_KEY_PEM ?? "",
  KID: process.env.AUTH_KEY_KID ?? "dev-key-1",
  JWT_SECRET: process.env.JWT_SECRET ?? process.env.AUTH_PRIVATE_KEY_PEM ?? "fallback-secret",
  PRISMA_DATABASE_URL:
    process.env.PRISMA_DATABASE_URL ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "",
  DATABASE_URL:
    process.env.PRISMA_DATABASE_URL ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "",
  LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN ?? "",
  UPSTASH_REDIS_URL:
    process.env.UPSTASH_REDIS_URL ??
    process.env.KV_REST_API_URL ??
    process.env.KV_URL ??
    process.env.REDIS_URL ??
    "",
  UPSTASH_REDIS_TOKEN: process.env.UPSTASH_REDIS_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "",
};
