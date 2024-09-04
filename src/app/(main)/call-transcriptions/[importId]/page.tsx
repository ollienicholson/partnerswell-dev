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

  const [transcriptData, setTranscriptData] = useState<getOneTranscript | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let accountName: string | null = null;

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");
    console.log("Account name:", accountName);
  }
  const { data: account } =
    react_api.partnerAccountRouter.getAccountByName.useQuery({
      partnerAccountName: accountName || "",
    });

  useEffect(() => {
    const fetchTranscript = async (transcriptId: string) => {
      try {
        const transcript = await getTranscriptById(transcriptId);
        console.log("Fetched Transcript Data:", transcript); // Debug log
        if (transcript) {
          console.log("Transcript fetched successfully:");
          setTranscriptData(transcript);
        } else {
          setError("Transcript not found.");
        }
      } catch (error) {
        console.error("Error fetching transcript:", error);
        setError("Failed to load transcript data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // call the fetch function with the importId from URL params
    if (typeof importTranscriptId === "string") {
      fetchTranscript(importTranscriptId);
    } else {
      console.error("Invalid import ID", importTranscriptId);
    }
  }, [importTranscriptId]);

  if (!account) {
    return (
      <div className=" flex flex-col items-center justify-center gap-6">
        <div>Account loading...</div>
        <Link href="/call-transcriptions">
          <Button>Back to Partner Accounts</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-red-500">{error}</div>
        <Link href="/call-transcriptions">
          <Button>Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account?.accountName}. {""}
        Call title: {transcriptData?.title}.
      </div>
      {transcriptData && (
        <MeetingHeaderTable
          accountName={account.accountName}
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
