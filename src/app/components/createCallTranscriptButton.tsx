import { useAddCallTranscript } from "~/app/hooks/useAddCallTranscript";

import { Button } from "~/app/components/ui/button";

// import types and pass as props

export default function CallTranscriptButton({
  accountId,
  transriptData,
}: {
  accountId: number;
  transriptData?: {
    id: string;
    title: string;
    duration: number;
    dateString: string;
    speakers: { name: string }[]; // accepts array of objects with name field
    summary: { overview: string };
    sentences: { speaker_name: string; text: string }[];
  };
}) {
  const { addCallTranscript, isLoading, error } = useAddCallTranscript();

  // Handle loading and error states
  if (isLoading) return <p>Loading account data...</p>;

  return (
    <Button
      variant="outline"
      onClick={() => {
        addCallTranscript({
          partnerAccountId: accountId,
          callTranscriptId: transriptData?.id ?? "",
          callTranscriptTitle: transriptData?.title ?? "",
          duration: transriptData?.duration ?? 0,
          meetingDate: transriptData?.dateString ?? "",
          speakers: transriptData?.speakers ?? [],
          summary: transriptData?.summary ?? { overview: "" },
          sentences: transriptData?.sentences ?? [],
        });
      }}
      disabled={isLoading}
    >
      {/* TODO: Hide this button until capability data has been rendered */}
      Save Data to Partner Account
    </Button>
  );
}
