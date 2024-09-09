"use client";

import { useState } from "react";
import { react_api } from "~/trpc/react";

export function CallTranscriptForm({
  partnerAccountId,
}: {
  partnerAccountId: number;
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
        callTranscriptId: callTranscriptId,
        callTranscriptTitle: callTranscriptTitle,
        partnerAccountId: partnerAccountId,
      });
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="callTranscriptId">Call Transcript ID:</label>
        <input
          type="text"
          id="callTranscriptId"
          value={callTranscriptId}
          onChange={(e) => setCallTranscriptId(e.target.value)}
        />
      </div>
      <div>
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
