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
};

// Static data array
export const callTranscriptHeader: CallTranscriptHeader[] = [
  {
    callTranscriptId: 1,
    callTranscriptTitle: "Project Kickoff Meeting",
    callDuration: "45",
    callAttendees: [{ speakers: "John Doe" }, { speakers: "Jane Smith" }],
    dateString: "2024-08-01T10:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-02T09:00:00Z",
  },
  {
    callTranscriptId: 2,
    callTranscriptTitle: "Client Requirements Gathering",
    callDuration: "30",
    callAttendees: [{ speakers: "Alice Johnson" }, { speakers: "Bob Brown" }],
    dateString: "2024-08-03T11:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-04T08:30:00Z",
  },
  {
    callTranscriptId: 3,
    callTranscriptTitle: "Design Review Meeting",
    callDuration: "60",
    callAttendees: [{ speakers: "Charlie White" }, { speakers: "Dana Green" }],
    dateString: "2024-08-05T14:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-06T13:00:00Z",
  },
  {
    callTranscriptId: 4,
    callTranscriptTitle: "Sprint Planning Session",
    callDuration: "90",
    callAttendees: [{ speakers: "Eve Black" }, { speakers: "Frank Blue" }],
    dateString: "2024-08-07T15:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-08T12:00:00Z",
  },
  {
    callTranscriptId: 5,
    callTranscriptTitle: "Mid-Sprint Check-In",
    callDuration: "25",
    callAttendees: [{ speakers: "Grace Gray" }, { speakers: "Henry Silver" }],
    dateString: "2024-08-09T09:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-10T10:00:00Z",
  },
  {
    callTranscriptId: 6,
    callTranscriptTitle: "Client Feedback Session",
    callDuration: "50",
    callAttendees: [{ speakers: "Ivy Gold" }, { speakers: "Jack Purple" }],
    dateString: "2024-08-11T16:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-12T14:30:00Z",
  },
  {
    callTranscriptId: 7,
    callTranscriptTitle: "Team Retrospective",
    callDuration: "35",
    callAttendees: [{ speakers: "Kim Red" }, { speakers: "Leo Green" }],
    dateString: "2024-08-13T13:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-14T11:00:00Z",
  },
  {
    callTranscriptId: 8,
    callTranscriptTitle: "Project Handover",
    callDuration: "70",
    callAttendees: [{ speakers: "Mia Brown" }, { speakers: "Nate Silver" }],
    dateString: "2024-08-15T12:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-16T09:00:00Z",
  },
  {
    callTranscriptId: 9,
    callTranscriptTitle: "Bug Triage Meeting",
    callDuration: "40",
    callAttendees: [{ speakers: "Olivia Pink" }, { speakers: "Paul Gold" }],
    dateString: "2024-08-17T10:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-18T08:00:00Z",
  },
  {
    callTranscriptId: 10,
    callTranscriptTitle: "Final Project Review",
    callDuration: "80",
    callAttendees: [{ speakers: "Quinn White" }, { speakers: "Ryan Black" }],
    dateString: "2024-08-19T15:00:00Z",
    createdBy: "Cam Tickell",
    updatedAt: "2024-08-20T12:30:00Z",
  },
];
