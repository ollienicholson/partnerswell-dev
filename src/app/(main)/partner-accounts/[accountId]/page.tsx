"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/app/components/ui/pagination";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useMemo, useState } from "react";
import { callTranscriptHeader } from "~/lib/call-transcript-header";
import { useParams, useRouter } from "next/navigation";
import { EditAccountButton } from "~/app/components/EditAccountButton";

// TODO: handle error UI for incorrect acccount id

export default function AccountPage() {
  // pagination for call transcripts
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  //get account id
  const { accountId } = useParams();
  console.log("Getting data for AccountId:", accountId);

  //get account details
  const { data: account, isLoading } = api.partnerAccountRouter.getOne.useQuery(
    {
      partnerAccountId: Number(accountId),
    },
  );

  const pagintedTranscripts = useMemo(() => {
    return callTranscriptHeader.slice(startIndex, endIndex);
  }, [callTranscriptHeader, startIndex, endIndex]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="loader-container">
        <div className=" flex flex-col items-center justify-center gap-6">
          <div>Account not found</div>
          <Link href="/partner-accounts">
            <Button>Back to Partner Accounts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const router = useRouter();
  const handleRowClick = (meetingId: number) => {
    router.push(`/partner-accounts/${accountId}/${meetingId}`);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account.accountName}
      </div>
      <div className="rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Account</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={account.partnerAccountId} className="hover:bg-white">
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.contactName}</TableCell>
            </TableRow>
          </TableBody>
          <div className="p-2" />
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead>Created At</TableHead>
              <TableHead>Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={account.partnerAccountId} className="hover:bg-white">
              <TableCell>{account.createdAt.toLocaleString("en-AU")}</TableCell>
              <TableCell>{account.createdBy}</TableCell>
            </TableRow>
          </TableBody>
          <div className="justify-right flex p-4">
            <EditAccountButton
              accountName={account.accountName}
              accountContact={account.contactName}
            />
          </div>
        </Table>
      </div>
      <div className="py-4"></div>
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        {account.accountName} Meetings
      </div>
      <div className="rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Title</TableHead>
              <TableHead>Meeting Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Attendees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagintedTranscripts.map((call) => (
              <>
                <TableRow
                  key={call.callTranscriptId}
                  onClick={() => handleRowClick(call.callTranscriptId)}
                  className="border-0"
                >
                  <TableCell>{call.callTranscriptTitle}</TableCell>
                  <TableCell>
                    {new Date(call.dateString).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{call.callDuration} mins</TableCell>
                  <TableCell className="">
                    {call.callAttendees.map((attendee, index) => (
                      <li key={index}>{attendee.speakers}</li>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow className="text-gray-300 hover:bg-transparent">
                  <TableCell colSpan={4} align="left">
                    {call.callSummary.length > 190
                      ? `${call.callSummary.substring(0, 190)}...`
                      : call.callSummary}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : "no-select"
                }
                onClick={() => {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  endIndex === callTranscriptHeader?.length
                    ? "pointer-events-none opacity-50"
                    : "no-select"
                }
                onClick={() => {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="mt-6 pt-12">
        <div className="flex justify-between">
          <Link href="/partner-accounts">
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
