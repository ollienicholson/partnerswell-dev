import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getTranscriptById } from "../queries/getTranscripts";

export const transcriptRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().nullable().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.id) return;
      try {
        const transcript = await getTranscriptById(input.id);
        // console.log("Fetched Transcript Data:", transcript); // log
        if (transcript) {
          console.log("Transcript fetched successfully:");
          return transcript;
        } else {
          console.log("Transcript not found.");
        }
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
      return;
    }),

  create: protectedProcedure
    .input(
      z.object({
        callTranscriptId: z.string(),
        callTranscriptTitle: z.string(),
        partnerAccountId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.user?.id) return;
      return ctx.db.callTranscriptData.create({
        data: {
          callTranscriptId: input.callTranscriptId,
          callTranscriptTitle: input.callTranscriptTitle,
          accountId: input.partnerAccountId,
        },
      });
    }),
});
