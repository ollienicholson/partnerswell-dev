// types to be sorted out late

export type TPartnerAccount = {
  partnerAccountId: number;
  accountName: string;
  contactName: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  transcripts?: TGetOneTranscript[];
};

export type allTranscriptData = {
  transcripts: allTranscripts[];
};

export type allTranscripts = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
  }[];
};

export type TGetTranscriptsByAccountId = {
  id: number;
  callTranscriptId: string;
  callTranscriptTitle: string;
  createdAt: Date;
  duration: number;
  meetingDate: string;
  speakers: {
    name: string;
  }[];
  summary: {
    overview: string;
  };
  sentences: {
    speaker_name: string;
    text: string;
  };
};

export type TGetOneTranscript = {
  id: string;
  title: string;
  dateString: string;
  duration: number;
  speakers: {
    name: string;
  }[];
  summary: {
    overview: string;
  };
  sentences: {
    speaker_name: string;
    text: string;
  }[];
  gptOutput: {
    phase_name: string;
    description: string;
  }[];
};

export type TGraphQLTranscript = {
  id: string;
  title: string;
  dateString: string;
  duration: number;
  speakers: {
    name: string;
  }[];
  summary: {
    overview: string;
  };
  sentences: {
    speaker_name: string;
    text: string;
  }[];
};

export type TGPTOutput = {
  phase_name: string;
  description: string;
};
