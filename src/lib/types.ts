// types to be sorted out late

export type TPartnerAccount = {
  partnerAccountId: number;
  accountName: string;
  contactName: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  transcripts?: getOneTranscript[];
};

export type getOneTranscript = {
  id: string;
  duration: number;
  dateString: string;
  title: string;
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

export type CallTranscriptHeader = {
  callTranscriptId: number;
  callTranscriptTitle: string;
  callDuration: string;
  callAttendees: {
    speakers: string;
  }[];
  dateString: string;
  createdBy: string;
  updatedAt: string;
  callSummary: string;
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

export type allTranscriptData = {
  transcripts: allTranscripts[];
};
