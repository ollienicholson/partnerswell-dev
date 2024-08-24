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

let transcriptsCache: Transcript[] | null = null;

export const getTranscripts = async (): Promise<Transcript[]> => {
  if (transcriptsCache) {
    console.log("Returning cached transcripts...");
    return transcriptsCache;
  }
  console.log("Fetching transcripts...");
  const data: transcriptData = await graphqlClient.request<{
    transcripts: Transcript[];
  }>(GET_TRANSCRIPTS);
  transcriptsCache = data.transcripts;
  return data.transcripts;
};
