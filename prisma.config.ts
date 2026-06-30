import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    adapter: () => {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      return new PrismaPg(pool);
    },
  },
});
