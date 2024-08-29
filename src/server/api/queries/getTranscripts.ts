import { graphqlClient } from "~/lib/graphqlClient";

type Transcript = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
  }[];
};

type transcriptData = {
  transcripts: Transcript[];
};

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

let transcriptsCache: Transcript[] | null = null;

export const getTranscripts = async (
  limit: number = 5,
): Promise<Transcript[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    return transcriptsCache.slice(0, limit);
  }
  console.log("Fetching fresh transcripts...");

  try {
    const data: transcriptData = await graphqlClient.request<{
      transcripts: Transcript[];
    }>(GET_TRANSCRIPTS, { limit });
    transcriptsCache = data.transcripts;
    return data.transcripts;
  } catch (error: any) {
    console.log(
      "Error fetching transcripts:",
      error.response?.errors || error.message,
    );
    return [];
  }
};
