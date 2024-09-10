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
        console.log("Fetched Transcript Data:", transcript); // log
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
      // Log backend type and content of the speakers input
      console.log("Backend: type:", typeof input.speakers);
      console.log("Backend: Is an array:", Array.isArray(input.speakers));
      console.log("Backend: content:", input.speakers);
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
});
