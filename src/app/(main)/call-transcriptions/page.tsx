import * as React from "react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { server_api } from "src/trpc/server";
import { getTranscripts } from "~/server/api/queries/getTranscripts";
import CallTranscriptsTable from "../../components/CallTranscriptTable";

export default async function TranscriptsPage() {
  // TODO: remove hardcoded transcripts limit

  // fetch all transcripts
  const transcripts = await getTranscripts();

  // fetch all partner accounts
  const accounts = await server_api.partnerAccountRouter.getAll();

  const partnerAccounts = accounts.map((account) => ({
    accountName: account.accountName,
    contactName: account.contactName,
  }));

  return (
    <div>
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Select a transcript to import
        </div>
        <div className="border-1 w-full rounded-xl shadow-md">
          <CallTranscriptsTable
            transcripts={transcripts}
            partnerAccounts={partnerAccounts}
          />
        </div>
        <div className="pt-12">
          <div className="flex justify-between">
            <Link href="/">
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
