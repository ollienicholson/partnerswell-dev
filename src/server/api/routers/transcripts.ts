import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getTranscriptById } from "../queries/getTranscripts";
// import { TGetTranscriptsByAccountId } from "~/lib/types";

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

  // get all transcripts by accountId
  getByAccountId: protectedProcedure
    .input(
      z.object({
        accountId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.accountId) {
        console.log("Partner Account Id is required.");
        return null;
      }
      try {
        const transcripts = await ctx.db.callTranscriptData.findMany({
          where: { accountId: input.accountId },
        });

        if (transcripts.length > 0) {
          console.log("transcripts fetched successfully", transcripts.keys);
          return transcripts;
        } else {
          console.log("Transcripts not found.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching transcripts:", error);
        throw new Error("Failed to fetch transcripts.");
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        partnerAccountId: z.number(),
        callTranscriptId: z.string(),
        callTranscriptTitle: z.string(),
        duration: z.number(),
        meetingDate: z.string(),
        speakers: z.array(z.object({ name: z.string() })), // array of objects with name field
        summary: z.object({ overview: z.string() }),
        sentences: z.array(
          z.object({ speaker_name: z.string(), text: z.string() }),
        ), // array of objects with speaker_name and text fields
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.user?.id) return;
      return ctx.db.callTranscriptData.create({
        data: {
          accountId: input.partnerAccountId,
          callTranscriptId: input.callTranscriptId,
          callTranscriptTitle: input.callTranscriptTitle,
          duration: input.duration,
          meetingDate: input.meetingDate,
          speakers: input.speakers,
          summary: input.summary,
          sentences: input.sentences,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(
      z.object({
        callTranscriptId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Log frontend type and content of the speakers input
      console.log("Frontend: type:", typeof input);
      console.log("Frontend: Is an array:", Array.isArray(input));
      console.log("Frontend: content:", input);
      if (!ctx?.user?.id) return;
      return ctx.db.callTranscriptData.delete({
        where: { callTranscriptId: input.callTranscriptId },
      });
    }),
});
