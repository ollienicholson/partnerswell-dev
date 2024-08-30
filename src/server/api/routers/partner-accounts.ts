import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { partnerAccounts } from "~/lib/partner-accounts";

// const idSchema = z.object({
//   accountId: z.number(),
// });

const partnerAccountSchema = z.object({
  accountName: z.string(),
  contactName: z.string(),
  createdBy: z.string(),
});

// const partnerAccountUpdateSchema = z.object({
//   id: z.number(),
//   accountName: z.string(),
//   contact: z.string(),
//   createdBy: z.string(),
// });

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
    .input(partnerAccountSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.partnerAccount.create({
        data: partnerAccountSchema.parse({
          ...input,
          createdBy: ctx.user?.firstName + " " + ctx.user?.lastName,
        }),
      });
    }),

  // //update partnerAccount
  // updatePartnerAccount: publicProcedure
  //   .input(partnerAccountUpdateSchema)
  //   .mutation(({ input, ctx }) => {
  //     console.log("Received input", input);
  //     z.object({
  //       id: z.number(),
  //     });
  //     return ctx.db.partnerAccount.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: partnerAccountUpdateSchema.parse({
  //         ...input,
  //         createdBy: ctx.user?.firstName + " " + ctx.user?.lastName,
  //       }),
  //     });
  //   }),

  // //delete partnerAccount
  // deletePartnerAccount: publicProcedure
  //   .input(idSchema)
  //   .mutation(({ input, ctx }) => {
  //     return ctx.db.partnerAccount.delete({
  //       where: idSchema.parse(input),
  //     });
  //   }),
});
