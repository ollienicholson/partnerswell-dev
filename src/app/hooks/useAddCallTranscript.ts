import { react_api } from "~/trpc/react";

// import types and pass as props

export function useAddCallTranscript() {
  // mutation hook for creating call transcript in db
  const mutateCallTranscript = react_api.transcriptRouter.create.useMutation();
  // testing
  // console.log("src/app/hooks/useAddCallTranscript.ts callTranscriptId -->", mutateCallTranscript.data?.callTranscriptId);

  const addCallTranscript = async ({
    partnerAccountId,
    callTranscriptId,
    callTranscriptTitle,
    duration,
    meetingDate,
    speakers,
    summary,
    sentences,
    // TODO: add gpt output
    gptOutput,
  }: {
    partnerAccountId: number;
    callTranscriptId: string;
    callTranscriptTitle: string;
    duration: number;
    meetingDate: string;
    speakers: { name: string }[]; // accepts array of objects with name field
    summary: { overview: string };
    sentences: { speaker_name: string; text: string }[];
    gptOutput: { phase_name: string; description: string }[];
    // TODO: add gpt output as optional
  }) => {
    console.log("Running mutateCallTranscript");
    try {
      // call the mutation to save data
      await mutateCallTranscript.mutateAsync({
        partnerAccountId: partnerAccountId,
        callTranscriptId: callTranscriptId,
        callTranscriptTitle: callTranscriptTitle,
        duration: duration,
        meetingDate: meetingDate,
        speakers: speakers,
        summary: summary,
        sentences: sentences,
        // TODO: add gpt output to addCallTranscript
        gptOutput: gptOutput,
      });
      console.log("useAddCallTranscript --> callTranscriptId: ", callTranscriptId)
      alert("Call transcript created successfully!");
    } catch (error) {
      console.error("Error creating call transcript:", error);
      alert("Failed to save transcript.");
    }
  };
  return {
    addCallTranscript,
    isLoading: mutateCallTranscript.isPending,
    error: mutateCallTranscript.error,
  };
}
