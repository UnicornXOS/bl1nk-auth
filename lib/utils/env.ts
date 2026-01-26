function validateEnv() {
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    console.log("Skipping environment validation (build time)");
    return;
  }

  const requiredVars = ["AUTH_PRIVATE_KEY_PEM", "AUTH_PUBLIC_KEY_PEM", "DATABASE_URL"];
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`,
      );
    }
  }
}

validateEnv();

export const ENV = {
  ISSUER: process.env.AUTH_ISSUER ?? "http://localhost:3000",
  AUD: process.env.AUTH_AUDIENCE ?? "auth",
  GITHUB_ID: process.env.GITHUB_ID ?? "",
  GITHUB_SECRET: process.env.GITHUB_SECRET ?? "",
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  PRIV: process.env.AUTH_PRIVATE_KEY_PEM ?? "",
  PUB: process.env.AUTH_PUBLIC_KEY_PEM ?? "",
  KID: process.env.AUTH_KEY_KID ?? "dev-key-1",
  JWT_SECRET: process.env.JWT_SECRET ?? process.env.AUTH_PRIVATE_KEY_PEM ?? "fallback-secret",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
};
