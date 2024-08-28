"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";

import { callTranscriptHeader } from "~/lib/call-transcript-header";

export default function MeetingPage() {
  const [meetingId, setMeetingId] = useState<number | null>(null);
  const [meetingTitle, setMeetingTitle] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); // Grab the last segment of the path
    if (id && !isNaN(Number(id))) {
      setMeetingId(Number(id));
    }
  }, []);

  useEffect(() => {
    if (meetingId !== null) {
      const meeting = callTranscriptHeader.find(
        (call) => call.callTranscriptId === meetingId,
      );
      if (meeting) {
        setMeetingTitle(meeting.callTranscriptTitle);
      } else {
        setMeetingTitle("Meeting not found");
      }
    }
  }, [meetingId]);

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Meeting: {meetingTitle || "Loading..."}
      </div>
    </div>
  );
}
