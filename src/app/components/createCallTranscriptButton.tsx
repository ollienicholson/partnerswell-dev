"use client"; // Ensure this component is a client-side component

import { useAddCallTranscript } from "~/app/hooks/useAddCallTranscript";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";

type TranscriptData = {
  id: string;
  title: string;
  duration: number;
  dateString: string;
  speakers: { name: string }[]; // accepts array of objects with name field
  summary: { overview: string };
  sentences: { speaker_name: string; text: string }[];
};

type Props = {
  accountId: number;
  transriptData?: TranscriptData;
};

export default function CreateCallTranscriptButton({
  accountId,
  transriptData,
}: Props) {
  const { addCallTranscript, isLoading, error } = useAddCallTranscript();
  const router = useRouter();

  // Handle loading state
  if (isLoading) return <p>Saving data...</p>;

  const handleClick = async () => {
    try {
      // add call transcript to the db
      await addCallTranscript({
        partnerAccountId: accountId,
        callTranscriptId: transriptData?.id ?? "",
        callTranscriptTitle: transriptData?.title ?? "",
        duration: transriptData?.duration ?? 0,
        meetingDate: transriptData?.dateString ?? "",
        speakers: transriptData?.speakers ?? [],
        summary: transriptData?.summary ?? { overview: "" },
        sentences: transriptData?.sentences ?? [],
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
