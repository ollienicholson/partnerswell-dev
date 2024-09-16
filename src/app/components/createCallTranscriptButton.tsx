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
  // TODO: add gpt output
  gptOutput: { phase_name: string; description: string }[];
};

type Props = {
  accountId: number;
  transcriptData?: TranscriptData;
};

export default function CreateCallTranscriptButton({
  accountId,
  transcriptData,
}: Props) {
  const { addCallTranscript, isLoading, error } = useAddCallTranscript();
  const router = useRouter();

  if (isLoading) return <p>Saving data...</p>;

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
        // TODO: add gpt output to addCallTranscript
        gptOutput: transcriptData?.gptOutput ?? [],
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
