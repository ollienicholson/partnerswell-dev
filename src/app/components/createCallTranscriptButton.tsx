"use client";

import { useAddCallTranscript } from "~/app/hooks/useAddCallTranscript";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";

type TranscriptData = {
  id: string;
  title: string;
  duration: number;
  dateString: string;
  speakers: { name: string }[];
  summary: { overview: string };
  sentences: { speaker_name: string; text: string }[];
};

type Props = {
  accountId: number;
  transcriptData?: TranscriptData;
  gptOutput: { phase_name: string; description: string }[];
};

export default function CreateCallTranscriptButton({
  accountId,
  transcriptData,
  gptOutput,
}: Props) {
  const { addCallTranscript, isLoading, error } = useAddCallTranscript();
  // testing
  // console.log("src/app/components/createCallTranscriptButton.tsx callTranscriptId -->", transcriptData?.id);

  // console.log("\ngptOutput passed to CreateCallTranscriptButton:", gptOutput);

  const router = useRouter();

  if (isLoading) return <div>Saving data...</div>;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-red-500">
          Error Code {error.data?.code} Error: {error?.message}
        </div>
        <Button onClick={() => router.push("/call-transcriptions")}>
          Back to Call Transcriptions
        </Button>
      </div>
    );
  }

  const handleClick = async () => {
    try {
      // add call transcript to the db
      await addCallTranscript({
        partnerAccountId: accountId,
        callTranscriptId: transcriptData?.id ?? "",
        callTranscriptTitle: transcriptData?.title ?? "",
        duration: transcriptData?.duration ?? 0,
        meetingDate: transcriptData?.dateString ?? "",
        speakers: transcriptData?.speakers ?? [],
        summary: transcriptData?.summary ?? { overview: "" },
        sentences: transcriptData?.sentences ?? [],
        gptOutput: gptOutput,
      });

      // push user to the partner account page on success
      router.push(`/partner-accounts/${accountId}`);
    } catch (error) {
      console.error("Failed to add transcript:", error);
    }
  };

  return (
    <Button variant="pswellPrimary" onClick={handleClick} disabled={isLoading}>
      Save Data to Partner Account
    </Button>
  );
}
