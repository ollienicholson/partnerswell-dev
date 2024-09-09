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

// Static data array
export const callTranscriptHeader: CallTranscriptHeader[] = [
  {
    callTranscriptId: 1,
    callTranscriptTitle: "Maturity Map Introduction",
    callDuration: "45",
    callAttendees: [{ speakers: "John Doe" }, { speakers: "Jane Smith" }],
    dateString: "2024-08-01T10:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-02T09:00:00Z",
    callSummary:
      "Cam Tickell introduced the concept of maturity maps to the co-selling team, explaining how they can be used to gauge partnership progress and identify areas for growth. The team discussed initial strategies for incorporating influence indicators into the partnership assessment.",
  },
];
