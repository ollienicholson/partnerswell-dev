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

const MaMaprompt = `You are a sales professional working in the B2B partnerships industry.
Your task is to analyse this call transcript to identify success factors related to a specific phase of the partnerships maturity map.
Your analysis of this call transcript data must be categorised into the following phases:
    Partner Qualification
    Joint Discovery
    Build Go-To-Market
    Sales Planning
    Delivery Readiness
    Partnership Launch
    Partnership Continous Improvement
    Return your response in json format with the following key-value pairs:
    - phase_name: the phase of the partnership.
    - description: a description of what was discussed related to the specific phase.
    Do not respond with anything other than json format, this is the expected response format example:
    [{
        phase_name: "text",
        description: "text"
      },
    {
        phase_name: "text",
        description: "text"
    }]`;

// function MMprompt(call_transcript: string[]) {
//   return `You are a sales professional working in the B2B partnerships industry.
// Your task is to analyse this call transcript to identify success factors related to a specific phase of the partnership with {pass in Partner Account Name}.
// Here is the transcript: ${call_transcript}
// Your analysis of this call transcript data must be categorised into the following phases:
// List of phases for Maturity Map:
//     Partner Qualification
//     Joint Discovery
//     Build Go-To-Market
//     Sales Planning
//     Delivery Readiness
//     Partnership Launch
//     Partnership Continous Improvement

// Return your response in json format with the following key-value pairs:
//   - phase_name: the phase of the partnership
//   - description: a description of what was discussed related to the specific phase`;}

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
        // input.id is correct
        // console.log("Calling input.id: ", input.id);
        const transcript = await getTranscriptById(
          userData?.firefliesApi,
          input.id,
        );
        if (transcript) {
          console.log("transcriptRouter: getById: Transcript fetched successfully");
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
        console.log("getAll Transcripts fetched successfully:");
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
        gptOutput: z.array(
          z.object({ phase_name: z.string(), description: z.string() }),
        ),
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
          chatgptOutput: input.gptOutput,
        },
      });
    }),

    // ChatGPT Procedure
  getCapabilityData: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        indicator: z.string().optional(),
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { type, indicator } = input;

      if (!input.id) return;
        const userData = await ctx.db.userRoles.findFirst({
          where: { clerkId: ctx?.user?.id },
        });
        if (!userData?.firefliesApi) return;
        const transcript = await getTranscriptById(
          userData?.firefliesApi,
          input.id,
        ); 
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      let prompt = "";
      if (type === "influenceIndicator") {
        prompt = IIprompt;
      } else if (type === "maturityMap") {
        prompt = MaMaprompt;
      }

      // get transcript sentences
      prompt += transcript?.sentences?.map((sentence) => sentence.text).join("\n");
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      });
      // success
      console.log(
        "Response from OpenAI:",
        response?.choices[0]?.message.content,
      );
      if (response?.choices[0]?.message.content) {
        console.log("Retrieved ChatGPT Response successfully");
        // success
        return response?.choices[0]?.message.content;
      } else {
        console.log("No ChatGPT Response");
      }
      return null;
    }),

  deleteOne: protectedProcedure
    .input(
      z.object({
        callTranscriptId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.user?.id) return;
      return ctx.db.callTranscriptData.delete({
        where: { callTranscriptId: input.callTranscriptId },
      });
    }),
});
