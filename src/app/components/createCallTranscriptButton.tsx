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
  };
}) {
  const { addCallTranscript, isLoading, error } = useAddCallTranscript();

  console.log("accountId", accountId);
  console.log("Clicking CallTranscriptButton");

  // Handle loading and error states
  if (isLoading) return <p>Loading account data...</p>;
  if (error) return <p>Error loading account data: {error.message}</p>;

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
        });
      }}
      disabled={isLoading}
    >
      Save Data to Partner Account
    </Button>
  );
}
