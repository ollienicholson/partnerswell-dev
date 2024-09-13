import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const integrationRouter = createTRPCRouter({
  getFireFliesKey: protectedProcedure.query(async ({ input, ctx }) => {
    const userData = await ctx.db.userRoles.findFirst({
      where: { clerkId: ctx?.user?.id },
    });
    return userData?.firefliesApi;
  }),

  upsertApiKey: protectedProcedure
    .input(
      z.object({
        api_key: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.user?.id) return;
      await ctx.db.userRoles.upsert({
        where: { clerkId: ctx?.user?.id },
        create: {
          clerkId: ctx?.user?.id,
          role: "GUEST",
          firefliesApi: input.api_key,
        },
        update: {
          clerkId: ctx?.user?.id,
          firefliesApi: input.api_key,
        },
      });
    }),
});
