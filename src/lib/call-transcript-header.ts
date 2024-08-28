type CallTranscriptHeader = {
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
// need to add call summary
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
  {
    callTranscriptId: 2,
    callTranscriptTitle: "Identifying Key Influence Indicators",
    callDuration: "30",
    callAttendees: [{ speakers: "Alice Johnson" }, { speakers: "Bob Brown" }],
    dateString: "2024-08-03T11:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-04T08:30:00Z",
    callSummary:
      "The team collaborated on identifying key influence indicators relevant to their B2B co-selling efforts. Alice Johnson emphasized the importance of tracking partner engagement metrics, while Bob Brown suggested including market penetration data.",
  },
  {
    callTranscriptId: 3,
    callTranscriptTitle: "Co-Selling Strategy Alignment",
    callDuration: "60",
    callAttendees: [{ speakers: "Charlie White" }, { speakers: "Dana Green" }],
    dateString: "2024-08-05T14:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-06T13:00:00Z",
    callSummary:
      "The discussion centered around aligning the co-selling strategy with the maturity map framework. Charlie White highlighted the need for clear roles and responsibilities, while Dana Green proposed a phased approach to increase influence across joint campaigns.",
  },
  {
    callTranscriptId: 4,
    callTranscriptTitle: "Partnership Maturity Assessment",
    callDuration: "90",
    callAttendees: [{ speakers: "Eve Black" }, { speakers: "Frank Blue" }],
    dateString: "2024-08-07T15:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-08T12:00:00Z",
    callSummary:
      "During the maturity assessment session, the team evaluated the current state of key partnerships. Eve Black provided insights on partner feedback, while Frank Blue suggested additional influence indicators to better measure partnership effectiveness.",
  },
  {
    callTranscriptId: 5,
    callTranscriptTitle: "Mid-Quarter Influence Review",
    callDuration: "25",
    callAttendees: [{ speakers: "Grace Gray" }, { speakers: "Henry Silver" }],
    dateString: "2024-08-09T09:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-10T10:00:00Z",
    callSummary:
      "In the mid-quarter review, the team analyzed the effectiveness of their influence strategies. Grace Gray reported positive trends in partner-driven deals, while Henry Silver recommended adjustments to the current influence scoring model.",
  },
  {
    callTranscriptId: 6,
    callTranscriptTitle: "Client Partnership Feedback",
    callDuration: "50",
    callAttendees: [{ speakers: "Ivy Gold" }, { speakers: "Jack Purple" }],
    dateString: "2024-08-11T16:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-12T14:30:00Z",
    callSummary:
      "This session focused on gathering feedback from key clients regarding their experiences with co-selling partnerships. Ivy Gold highlighted areas where partner influence was particularly strong, while Jack Purple discussed potential improvements for future collaborations.",
  },
  {
    callTranscriptId: 7,
    callTranscriptTitle: "Influence Strategy Retrospective",
    callDuration: "35",
    callAttendees: [{ speakers: "Kim Red" }, { speakers: "Leo Green" }],
    dateString: "2024-08-13T13:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-14T11:00:00Z",
    callSummary:
      "In the retrospective, the team reflected on the successes and challenges of their influence strategies over the past quarter. Kim Red shared lessons learned from recent campaigns, while Leo Green suggested new tactics to enhance partner influence moving forward.",
  },
  {
    callTranscriptId: 8,
    callTranscriptTitle: "Maturity Map Adjustment Session",
    callDuration: "70",
    callAttendees: [{ speakers: "Mia Brown" }, { speakers: "Nate Silver" }],
    dateString: "2024-08-15T12:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-16T09:00:00Z",
    callSummary:
      "The team convened to adjust the maturity map based on recent developments in the partnership. Mia Brown advocated for a more dynamic approach to maturity mapping, while Nate Silver proposed integrating real-time influence data into the map.",
  },
  {
    callTranscriptId: 9,
    callTranscriptTitle: "Partnership Issue Triage",
    callDuration: "40",
    callAttendees: [{ speakers: "Olivia Pink" }, { speakers: "Paul Gold" }],
    dateString: "2024-08-17T10:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-18T08:00:00Z",
    callSummary:
      "In this meeting, the team addressed several issues impacting partnership success. Olivia Pink provided a breakdown of the key challenges, while Paul Gold suggested specific actions to mitigate risks and enhance influence.",
  },
  {
    callTranscriptId: 10,
    callTranscriptTitle: "Final Influence Strategy Review",
    callDuration: "80",
    callAttendees: [{ speakers: "Quinn White" }, { speakers: "Ryan Black" }],
    dateString: "2024-08-19T15:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-20T12:30:00Z",
    callSummary:
      "The team conducted a final review of their influence strategies for the quarter. Quinn White presented the results of recent co-selling efforts, while Ryan Black discussed the impact of the strategies on overall partnership maturity.",
  },
];
