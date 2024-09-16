"use client";

import * as React from "react";
import { Button } from "~/app/components/ui/button";
import CallTranscriptsTable from "../../components/CallTranscriptTable";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { allTranscripts } from "~/lib/types";
import { server_api } from "~/trpc/server";
import { react_api } from "~/trpc/react";

type PartnerAccount = {
  accountName: string;
};

export default function TranscriptsPage() {
  // TODO: remove hardcoded transcripts limit
  const { data: transcripts, refetch } =
    react_api.transcriptRouter.getAll.useQuery(undefined, { enabled: false });
  react_api;

  const { data: partnerAccounts, refetch: refetchAccounts } =
    react_api.partnerAccountRouter.getAll.useQuery(undefined, {
      enabled: false,
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div>
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Call Transcripts
        </div>
        <div className="mb-6 flex justify-center rounded-xl bg-slate-50 p-4">
          <Button
            onClick={() => {
              refetch();
              refetchAccounts();
            }}
            disabled={loading}
            variant="pswellPrimary"
          >
            {loading ? "Loading..." : "Get Transcripts"}
          </Button>
        </div>
        {error && <div className="text-red-500">{error}</div>}

        <div className="rounded-xl border shadow">
          {transcripts && partnerAccounts && (
            <CallTranscriptsTable
              transcripts={transcripts}
              partnerAccounts={partnerAccounts}
            />
          )}
        </div>
      </div>
    </div>
  );
}
