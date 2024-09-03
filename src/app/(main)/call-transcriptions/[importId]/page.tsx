"use client";

import { react_api } from "~/trpc/react";

export default async function ImportedTranscriptPage({
  params,
}: {
  params: { meetingId: string };
}) {
  const { meetingId } = params;

  let accountName = null;
  let account = null;

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");

    if (accountName) {
      account = await react_api.partnerAccountRouter.getAccountByName.useQuery({
        partnerAccountName: String(accountName),
      });
    }
  }

  return (
    <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
      Meeting: {meetingId}
      Account: {accountName}
    </div>
  );
}
