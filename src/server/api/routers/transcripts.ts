import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getTranscriptById, getTranscripts } from "../queries/getTranscripts";
import { OpenAI } from "openai";
const IIprompt = `You are a sales professional working in the B2B partnerships industry.
Your task is to analyse this call transcript to identify success factors related to a specific phase of the sales deal with  {pass in "influence indicator aka company name"}.
Your analysis of this call transcript data must be categorised into the following phases:
List of phases for influence indicator:
  Partner Lead Researching
  Partner Lead Cultivating
  Partner Opportunity Alignment
  Prove Partner Value
  Partner Opportunity Negotiation
  Partner Opportunity Closed

Return your response in .json format with the following key-value pairs:
  - phase_name: the phase of the sales deal
  - description: a description of what was discussed related to the specific phase`;

const MMprompt = `You are a sales professional working in the B2B partnerships industry.
Your task is to analyse this call transcript to identify success factors related to a specific phase of the partnership with {pass in Partner Account Name}.
Your analysis of this call transcript data must be categorised into the following phases:
List of phases for Maturity Map:
    Partner Qualification
    Joint Discovery
    Build Go-To-Market
    Sales Planning
    Delivery Readiness
    Partnership Launch
    Partnership Continous Improvement

Return your response in json format with the following key-value pairs:
  - phase_name: the phase of the partnership
  - description: a description of what was discussed related to the specific phase`;

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
        const userData = await ctx.db.userRoles.findFirst({
          where: { clerkId: ctx?.user?.id },
        });
        if (!userData?.firefliesApi) return;
        const transcript = await getTranscriptById(
          userData?.firefliesApi,
          input.id,
        );
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
  getAll: protectedProcedure.query(async ({ input, ctx }) => {
    try {
      const userData = await ctx.db.userRoles.findFirst({
        where: { clerkId: ctx?.user?.id },
      });
      if (!userData?.firefliesApi) return;
      const transcript = await getTranscripts(userData?.firefliesApi);
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
        // TODO: add gpt output as optional
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
          // TODO: add gpt output to mutation as optional
        },
      });
    }),
  getCapabilityData: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        indicator: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { type, indicator } = input;

      const apikey = process.env.OPENAI_API_KEY;
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      let prompt = "";
      if (type === "influenceIndicator") {
        prompt = IIprompt;
      } else if (type === "maturityMap") {
        prompt = MMprompt;
      }
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });
      console.log(
        "Response from OpenAI:",
        response?.choices[0]?.message.content,
      );
    }),

  deleteOne: protectedProcedure
    .input(
      z.object({
        callTranscriptId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Log frontend type and content of the speakers input
      // console.log("Frontend: type:", typeof input);
      // console.log("Frontend: Is an array:", Array.isArray(input));
      // console.log("Frontend: content:", input);
      if (!ctx?.user?.id) return;
      return ctx.db.callTranscriptData.delete({
        where: { callTranscriptId: input.callTranscriptId },
      });
    }),
});
