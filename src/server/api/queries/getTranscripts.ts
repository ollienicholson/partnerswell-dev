import { graphqlClient } from "~/lib/graphqlClient";

import {
  getOneTranscriptType,
  allTranscripts,
  allTranscriptData,
} from "~/lib/types";

const GET_TRANSCRIPTS = `
  query Transcripts($limit: Int) {
    transcripts(limit: $limit){
      id
      title
      duration
      dateString
      speakers {
        name
      }
    }
  }
`;

const GET_ONE_TRANSCRIPT = `
query Transcript {
  transcript(id: "Lb0X1ywN0nOTTAs1") {
      id
      duration
      dateString
      title
      speakers {
          name
      }
      sentences {
          speaker_name
          text
      }
      summary {
          overview
      }
  }
}`;

// TODO: improve caching
// TODO: create refresh function for frontend user
export const getOneTranscript = async (): Promise<
  getOneTranscriptType | []
> => {
  console.log("Fetching one transcript...");

  try {
    const data = await graphqlClient.request<{
      transcript: getOneTranscriptType;
    }>(GET_ONE_TRANSCRIPT);

    //return single transcript
    return data.transcript;
  } catch (error: any) {
    console.error(
      "Error fetching transcripts:",
      error.response?.errors || error.message,
    );

    // robust error handling
    if (error.response) {
      if (error.response.status === 500) {
        console.error("Server error, please try again later.");
      } else if (error.response.status === 429) {
        console.error("Too many requests, please try again later.");
      }
    } else if (error.message.includes("Network Error")) {
      console.error("Network error, please try again later.");
    }
    // fallback: return an empty array
    return [];
  }
};

let transcriptsCache: allTranscripts[] | null = null;

export const getTranscripts = async (
  limit: number = 4,
): Promise<allTranscripts[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    return transcriptsCache.slice(0, limit);
  }
  console.log("Fetching fresh transcripts...");

  try {
    const data: allTranscriptData = await graphqlClient.request<{
      transcripts: allTranscripts[];
    }>(GET_TRANSCRIPTS, { limit });
    transcriptsCache = data.transcripts;

    return data.transcripts;
  } catch (error: any) {
    console.error(
      "Error fetching transcripts:",
      error.response?.errors || error.message,
    );

    // robust error handling
    if (error.response) {
      if (error.response.status === 500) {
        console.error("Server error, please try again later.");
      } else if (error.response.status === 429) {
        console.error("Too many requests, please try again later.");
      }
    } else if (error.message.includes("Network Error")) {
      console.error("Network error, please try again later.");
    }
    // fallback: return an empty array
    return [];
  }
};
