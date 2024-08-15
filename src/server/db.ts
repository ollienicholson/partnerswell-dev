import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const psClient = new Client({
  url: "postgres://default:uhCaRzK91vYq@ep-raspy-morning-a7vc0cka-pooler.ap-southeast-2.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
});
// const psClient = new Client({ url: env.DATABASE_URL });

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    adapter: new PrismaPlanetScale(psClient),
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
