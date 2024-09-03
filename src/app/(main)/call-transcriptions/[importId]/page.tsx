"use client";

// import { AccountTable } from "~/app/components/AccountTable";
// import { MeetingTable } from "~/app/components/MeetingTable";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import MeetingHeaderTable from "~/app/components/MeetingHeaderTable";

export default function ImportedTranscriptPage() {
  const { importId } = useParams();
  console.log("Getting data for AccountId:", importId);

  let accountName = null;
  // let accountData = null;

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");
    console.log("Account name:", accountName);
  }
  const { data: account } =
    react_api.partnerAccountRouter.getAccountByName.useQuery({
      partnerAccountName: String(accountName),
    });

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

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account?.accountName}
        Meeting: {importId}
      </div>
      <MeetingHeaderTable
        accountId={account.accountName}
        meetingId={String(importId)}
      />
      <div className="py-4"></div>
      <div className="mt-6 flex justify-between pt-12">
        <Link href="/partner-accounts">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
