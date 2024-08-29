import * as React from "react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { getTranscripts } from "~/server/api/queries/getTranscripts";
import { partnerAccounts } from "~/lib/partner-accounts";
import ClientTranscripts from "./clientTranscripts";

export default async function TranscriptsPage() {
  // TODO: remove hardcoded limit

  // get list of transcripts
  const transcripts = await getTranscripts();

  return (
    <div>
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Call Transcripts
        </div>
        <div className="border-1 w-full rounded-xl shadow-md">
          <ClientTranscripts
            transcripts={transcripts}
            partnerAccounts={partnerAccounts}
          />
        </div>
        <div className="pt-12">
          <div className="flex justify-between">
            <Link href="/">
              <Button>Back</Button>
            </Link>
            {/* <Button>Import Transcripts</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
