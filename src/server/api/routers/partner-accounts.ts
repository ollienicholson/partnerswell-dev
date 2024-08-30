import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { partnerAccounts } from "~/lib/partner-accounts";

const partneraccountSchema = z.object({
  accountName: z.string(),
  contactName: z.string(),
  createdBy: z.string(),
});

export const partnerAccountRouter = createTRPCRouter({
  getPartnerAccountById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return partnerAccounts.find((account) => account.id === input.id);
    }),

  // get all partner accounts
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.partnerAccount.findMany();
  }),

  //create new partner account
  createPartnerAccount: publicProcedure
    .input(partneraccountSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.partnerAccount.create({
        data: partneraccountSchema.parse({
          ...input,
          createdBy: ctx.user?.firstName + " " + ctx.user?.lastName,
        }),
      });
    }),
});
