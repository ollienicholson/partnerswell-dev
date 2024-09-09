"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import MeetingHeaderTable from "~/app/components/MeetingHeaderTable";
import { getTranscriptById } from "~/server/api/queries/getTranscripts";
import { getOneTranscript } from "~/lib/types";

export default function ImportedTranscriptPage() {
  const { importId: importTranscriptId } = useParams();
  console.log("Getting data for AccountId:", importTranscriptId);

  const { data: transcriptData } = react_api.transcriptRouter.getById.useQuery({
    id: typeof importTranscriptId === "string" ? importTranscriptId : "",
  });
  console.log("router call matches params Id?", transcriptData?.id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let accountName: string | null = "";

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");
    console.log("Account name:", accountName);
  }
  const { data: account } =
    react_api.partnerAccountRouter.getAccountByName.useQuery({
      partnerAccountName: accountName || "No account name",
    });

  // if ((accountName = "No account name")) {
  //   return (
  //     <div className=" flex flex-col items-center justify-center gap-6">
  //       <div>Account loading...</div>
  //       <Link href="/call-transcriptions">
  //         <Button>Back to Partner Accounts</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="loader-container">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-6">
  //       <div className="text-red-500">{error}</div>
  //       <Link href="/call-transcriptions">
  //         <Button>Back</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account?.accountName}. {""}
        Call title: {transcriptData?.title}.
      </div>
      {transcriptData && (
        <MeetingHeaderTable
          accountName={account?.accountName}
          transcript={transcriptData}
        />
      )}
      <div className="py-4"></div>
      <div className="mt-6 flex justify-between pt-12">
        <Link href="/call-transcriptions">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
