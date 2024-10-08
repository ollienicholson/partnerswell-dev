import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { partnerAccountRouter } from "./routers/partner-accounts";
import { integrationRouter } from "./routers/integration";
import { transcriptRouter } from "./routers/transcripts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partnerAccountRouter: partnerAccountRouter,
  integrationRouter: integrationRouter,
  transcriptRouter: transcriptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
