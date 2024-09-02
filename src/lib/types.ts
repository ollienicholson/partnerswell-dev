// types to be sorted out late

export type PartnerAccount = {
  partnerAccountId: number;
  accountName: string;
  contactName: string;
  createdBy: string | null;
  createdAt: Date;
};

// correct graphQL API structute???
export type CallTranscript = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
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
