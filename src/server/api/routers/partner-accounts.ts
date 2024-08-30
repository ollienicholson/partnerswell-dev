import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

import { partnerAccounts } from "~/lib/partner-accounts";

export const partnerAccountRouter = createTRPCRouter({
  // getPartnerAccounts: publicProcedure.query(() => {
  //   return partnerAccounts;
  // }),

  // Ollie db test
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.partnerAccount.findMany();
  }),

  getPartnerAccountById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return partnerAccounts.find((account) => account.id === input.id);
    }),
});
