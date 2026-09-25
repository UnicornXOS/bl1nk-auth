import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    adapter: () => {
      const connectionString =
        process.env.PRISMA_DATABASE_URL ?? process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
      const pool = new Pool({ connectionString });
      return new PrismaPg(pool as unknown as ConstructorParameters<typeof PrismaPg>[0]);
    },
  },
} as unknown as Record<string, unknown>);
