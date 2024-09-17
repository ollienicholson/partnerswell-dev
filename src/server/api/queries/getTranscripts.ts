import { graphqlClient } from "~/lib/graphqlClient";
import {
  TGetOneTranscript,
  allTranscripts,
  allTranscriptData,
} from "~/lib/types";

// get all call transcripts
const GET_TRANSCRIPTS = `
  query Transcripts {
    transcripts {
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

export const getTranscriptById = async (
  firefliesApiKey: string,
  id: string,
): Promise<TGetOneTranscript | null> => {
  // id is correct
  // console.log("Fetching transcript with ID:", id);
  try {
    // pass transcript id as variable to graphql query
    const client = graphqlClient(firefliesApiKey);
    const data = await client.request<{
      transcript: TGetOneTranscript;
    }>(GET_ONE_TRANSCRIPT, { id });
    // data.transcript is correct
    // success getting sentences
    // console.log("src/server/api/queries/getTranscripts.ts >>> Transcript Data:", data.transcript);
    return data.transcript;
  } catch (error: any) {
    console.error(
      "Error fetching one transcript:",
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
    // fallback: return null
    return null;
  }
};

let transcriptsCache: allTranscripts[] | null = null;

export const getTranscripts = async (
  firefliesApiKey: string,
): Promise<allTranscripts[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    return transcriptsCache;
  }
  console.log("\nFetching fresh transcripts...");

  try {
    const client = graphqlClient(firefliesApiKey);
    console.log("Fetching transcripts with API key:", firefliesApiKey);
    const data: allTranscriptData = await client.request<{
      transcripts: allTranscripts[];
    }>(GET_TRANSCRIPTS);
    transcriptsCache = data.transcripts;

    return data.transcripts;
  } catch (error: any) {
    console.error(
      "src/server/api/queries/getTranscripts.ts:\nError fetching all transcripts:",
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
    // fallback: return empty array
    return [];
  }
};
