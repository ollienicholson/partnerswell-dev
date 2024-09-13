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
// const GET_TRANSCRIPTS = `
//   query Transcripts($limit: Int) {
//     transcripts(limit: $limit){
//       id
//       title
//       duration
//       dateString
//       speakers {
//         name
//       }
//     }
//   }
// `;

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
  id: string,
): Promise<TGetOneTranscript | null> => {
  console.log("Fetching transcript with ID:", id);

  try {
    // pass transcript id as variable to graphql query
    const data = await graphqlClient.request<{
      transcript: TGetOneTranscript;
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

export const getTranscripts = async () // limit: number = 4,
: Promise<allTranscripts[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    // return transcriptsCache.slice(0, limit);
    return transcriptsCache;
  }
  console.log("Fetching fresh transcripts...");

  try {
    const data: allTranscriptData = await graphqlClient.request<{
      transcripts: allTranscripts[];
      // }>(GET_TRANSCRIPTS, { limit });
    }>(GET_TRANSCRIPTS);
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
