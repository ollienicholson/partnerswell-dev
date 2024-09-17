"use client";

import * as React from "react";
import { Button } from "~/app/components/ui/button";
import CallTranscriptsTable from "../../components/CallTranscriptTable";
import { useState } from "react";
import { react_api } from "~/trpc/react";
import { TableRow, TableCell } from "~/app/components/ui/table";

export default function TranscriptsPage() {
  const { data: transcripts, refetch } =
    react_api.transcriptRouter.getAll.useQuery(undefined, { enabled: false });
  react_api;

  const { data: partnerAccounts, refetch: refetchAccounts } =
    react_api.partnerAccountRouter.getAll.useQuery(undefined, {
      enabled: false,
    });
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const renderEmptyTranscripts = () => (
    <TableRow className="flex hover:bg-transparent items-center justify-center">
      <TableCell colSpan={5} className="text-center">
        No transcripts found
      </TableCell>
    </TableRow>
  );

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
          {transcripts && partnerAccounts ? (
            <CallTranscriptsTable
              transcripts={transcripts}
              partnerAccounts={partnerAccounts}
            />
          ): renderEmptyTranscripts()}
        </div>
      </div>
    </div>
  );
}
