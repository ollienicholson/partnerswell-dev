"use client";

import { useState } from "react";
import { react_api } from "~/trpc/react";

export function CallTranscriptForm({
  partnerAccountId,
  duration,
  meetingDate,
  speakers,
  summary,
}: {
  partnerAccountId: number;
  duration: number;
  meetingDate: string;
  speakers: { name: string }[]; // accepts array of objects with name field
  summary: { overview: string };
}) {
  // hooks for form fields
  const [callTranscriptId, setCallTranscriptId] = useState("");
  const [callTranscriptTitle, setCallTranscriptTitle] = useState("");

  // mutation hook for creating call transcript
  const createCallTranscript = react_api.transcriptRouter.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // call the mutation to save data
      await createCallTranscript.mutateAsync({
        partnerAccountId: partnerAccountId,
        callTranscriptId: callTranscriptId,
        callTranscriptTitle: callTranscriptTitle,
        duration: duration,
        meetingDate: meetingDate,
        speakers: speakers,
        summary: summary,
      });
      // Log frontend type and content of the speakers input
      // console.log("Frontend: Speakers type:", typeof speakers);
      // console.log("Frontend: Is speakers an array:", Array.isArray(speakers));
      // console.log("Frontend: Speakers content:", speakers);

      alert("Call transcript created successfully!");
      // reset form fields
      setCallTranscriptId("");
      setCallTranscriptTitle("");
    } catch (error) {
      console.error("Error creating call transcript:", error);
      alert("Failed to save transcript.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-2">
      <div className="border p-2">
        <label htmlFor="callTranscriptId">Call Transcript ID:</label>
        <input
          type="text"
          id="callTranscriptId"
          value={callTranscriptId}
          onChange={(e) => setCallTranscriptId(e.target.value)}
        />
      </div>
      <div className="border p-2">
        <label htmlFor="callTranscriptTitle">Call Transcript Title:</label>
        <input
          type="text"
          id="callTranscriptTitle"
          value={callTranscriptTitle}
          onChange={(e) => setCallTranscriptTitle(e.target.value)}
        />
        <button type="submit">Save Call Transcript</button>
      </div>
    </form>
  );
}
