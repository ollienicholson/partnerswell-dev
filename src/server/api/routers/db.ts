import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dbRouter = createTRPCRouter({
  getCompletedJobsDb: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx);
    return null;
  }),
});
