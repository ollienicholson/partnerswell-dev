import { 
  createTRPCRouter, 
  publicProcedure,
 } from "~/server/api/trpc";

 import { z } from "zod";


// Static data array
const partnerAccounts = [
  {
    id: 1,
    accountName: "Accenture",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 2,
    accountName: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 3,
    accountName: "Accenture",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 4,
    accountName: "AWS",
    contact: "Reid Hoffman",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 5,
    accountName: "AWS",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 6,
    accountName: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
  {
    id: 7,
    accountName: "Google",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
    updatedAt: "10/08/2024 7:20PM",
  },
];

export const partnerAccountRouter = createTRPCRouter({
  getPartnerAccounts: publicProcedure.query(() => {
    return partnerAccounts;
  }),

  getPartnerAccountById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return partnerAccounts.find((account) => account.id === input.id);
    }),
});