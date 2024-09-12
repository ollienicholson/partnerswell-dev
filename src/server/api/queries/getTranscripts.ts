import { graphqlClient } from "~/lib/graphqlClient";

import {
  getOneTranscript,
  allTranscripts,
  allTranscriptData,
} from "~/lib/types";

// get all call transcripts
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

// get call transcript by id
const GET_ONE_TRANSCRIPT = `
query Transcript($id: String!) {
  transcript(id: $id) {
      id
      duration
      dateString
      title
      speakers {
          name
      }
      summary {
          overview
      }
      sentences {
          speaker_name
          text
      }
  }
}`;

// TODO: improve caching
// TODO: create refresh function for frontend user
export const getTranscriptById = async (
  firefliesApiKey: string,
  id: string,
): Promise<getOneTranscript | null> => {
  console.log("Fetching transcript with ID:", id);

  try {
    // pass transcript id as variable to graphql query
    const client = graphqlClient(firefliesApiKey);
    const data = await client.request<{
      transcript: getOneTranscript;
    }>(GET_ONE_TRANSCRIPT, { id });

    return data.transcript;
  } catch (error: any) {
    console.error(
      "Error fetching transcripts:",
      error.response?.errors || error.message,
    );

    // error handling
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
    return null;
  }
};

let transcriptsCache: allTranscripts[] | null = null;

export const getTranscripts = async (
  firefliesApiKey: string,
  limit: number = 1,
): Promise<allTranscripts[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    return transcriptsCache.slice(0, limit);
  }
  console.log("Fetching fresh transcripts...");

  try {
    const client = graphqlClient(firefliesApiKey);
    const data: allTranscriptData = await client.request<{
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
