import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

const idSchema = z.object({
  partnerAccountId: z.number(),
});

const acccountSchema = z.object({
  partnerAccountName: z.string(),
});

const partnerAccountSchema = z.object({
  accountName: z.string(),
  contactName: z.string(),
  createdBy: z.string(),
});

const partnerAccountUpdateSchema = z.object({
  partnerAccountId: z.number(),
  accountName: z.string(),
  contactName: z.string(),
});

export const partnerAccountRouter = createTRPCRouter({
  // get all partner accounts
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.partnerAccount.findMany();
  }),

  // get partner account by id
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.partnerAccount.findUnique({
      where: idSchema.parse(input),
    });
  }),

  // get partner account by name
  getAccountByName: publicProcedure
    .input(acccountSchema)
    .query(({ input, ctx }) => {
      return ctx.db.partnerAccount.findFirst({
        where: { accountName: input.partnerAccountName },
      });
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

  //update partnerAccount
  updatePartnerAccount: publicProcedure
    .input(partnerAccountUpdateSchema)
    .mutation(({ input, ctx }) => {
      console.log("Received input", input);
      z.object({
        id: z.number(),
      });
      return ctx.db.partnerAccount.update({
        where: {
          partnerAccountId: input.partnerAccountId,
        },
        data: partnerAccountUpdateSchema.parse({
          ...input,
          createdBy: ctx.user?.firstName + " " + ctx.user?.lastName,
        }),
      });
    }),

  //delete partnerAccount
  deletePartnerAccount: publicProcedure
    .input(idSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.partnerAccount.delete({
        where: idSchema.parse(input),
      });
    }),
});
