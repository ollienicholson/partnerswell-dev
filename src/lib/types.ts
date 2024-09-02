// types to be sorted out late

export type PartnerAccount = {
  partnerAccountId: number;
  accountName: string;
  contactName: string;
  createdBy: string | null;
  createdAt: Date;
};

export type CallTranscript = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
  }[];
};
