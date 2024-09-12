"use client";

import * as React from "react";
import { Button } from "~/app/components/ui/button";
import CallTranscriptsTable from "../../components/CallTranscriptTable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { allTranscripts } from "~/lib/types";

type PartnerAccount = {
  accountName: string;
};

export default function TranscriptsPage() {
  // TODO: remove hardcoded transcripts limit
  const [transcripts, setTranscripts] = useState<allTranscripts[]>([]);
  const [partnerAccounts, setPartnerAccounts] = useState<PartnerAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchTranscripts = async () => {
    setLoading(true);
    setError("");

    try {
      // Fetch transcripts from the API endpoint
      const transcriptsResponse = await fetch("api/fireflies");
      console.log("transcriptsResponse:", transcriptsResponse);
      if (!transcriptsResponse.ok) {
        if (transcriptsResponse.status === 429) {
          setError("Too many requests, please try again later.");
        } else {
          throw new Error("Failed to fetch transcripts");
        }
        return;
      }
      const transcriptsData: allTranscripts[] =
        await transcriptsResponse.json();

      // Fetch list of partner accounts from the API endpoint
      const accountsResponse = await fetch("/api/partner-accounts");
      if (!accountsResponse.ok)
        throw new Error("Failed to fetch partner accounts");

      const accounts: PartnerAccount[] = await accountsResponse.json();

      const partnerAccounts = accounts.map((account) => ({
        accountName: account.accountName,
      }));

      setTranscripts(transcriptsData);
      setPartnerAccounts(partnerAccounts);
    } catch (error: any) {
      setError("Failed to fetch data:");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Call Transcripts
        </div>
        <div className="mb-6 flex justify-center rounded-xl border bg-slate-50 p-4">
          <Button
            onClick={fetchTranscripts}
            disabled={loading}
            variant="pswellPrimary"
          >
            {loading ? "Loading..." : "Get Transcripts"}
          </Button>
        </div>
        {error && <div className="text-red-500">{error}</div>}

        <div className="rounded-xl border shadow">
          <CallTranscriptsTable
            transcripts={transcripts}
            partnerAccounts={partnerAccounts}
          />
        </div>
      </div>
    </div>
  );
}
