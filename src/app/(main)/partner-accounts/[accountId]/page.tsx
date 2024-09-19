"use client";

import { AccountTable } from "~/app/components/AccountTable";
import { MeetingTable } from "~/app/components/MeetingTable";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";

export default function AccountPage() {
  //get account id
  const { accountId } = useParams<{ accountId: string }>();
  console.log("Getting data for AccountId:", accountId);

  //get account details
  const { data: account, isLoading: accountLoading } =
    react_api.partnerAccountRouter.getOne.useQuery({
      partnerAccountId: Number(accountId),
    });

  // get transcript based on accountId
  const { data: transcripts, isLoading: transcriptsLoading } =
    react_api.transcriptRouter.getByAccountId.useQuery({
      accountId: Number(accountId),
    });

  if (transcriptsLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (accountLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className=" flex flex-col items-center justify-center gap-6">
        <div>Account not found</div>
        <Link href="/partner-accounts">
          <Button>Back to Partner Accounts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account.accountName}
      </div>
      <AccountTable account={account} />
      <div className="py-4"></div>
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Call Transcripts
      </div>
      <MeetingTable
        accountId={Number(accountId)}
        transcripts={transcripts ?? []}
      />
      <div className="mt-6 flex justify-between pt-12">
        <Link href="/partner-accounts">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
