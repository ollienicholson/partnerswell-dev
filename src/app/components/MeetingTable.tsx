"use client";

import React, { useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";
import { TGetTranscriptsByAccountId } from "~/lib/types";

// TODO: handle error UI for incorrect acccount id
export function MeetingTable({
  accountId,
  transcripts,
}: {
  accountId: number;
  transcripts: TGetTranscriptsByAccountId[];
}) {
  // pagination
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  // const [endIndex, setEndIndex] = useState(rowsPerPage);
  const router = useRouter();

  const pagintedTranscripts = useMemo(() => {
    return transcripts.slice(startIndex, startIndex + rowsPerPage);
  }, [transcripts, startIndex, rowsPerPage]);

  const firstPage = startIndex === 0;
  const lastPage = startIndex + rowsPerPage >= transcripts.length;

  const handleRowClick = (meetingId: string) => {
    router.push(`/partner-accounts/${accountId}/${meetingId}`);
  };

  const renderEmptyMeetingsTable = () => (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        No meetings found. Please import meetings to display data.
      </TableCell>
    </TableRow>
  );

  return (
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
          {pagintedTranscripts.length > 0
            ? pagintedTranscripts.map((call) => (
                <React.Fragment key={call.id}>
                  <TableRow
                    key={call.id}
                    onClick={() => handleRowClick(call.callTranscriptId)}
                    className="border-0"
                  >
                    <TableCell>{call.callTranscriptTitle}</TableCell>
                    <TableCell>
                      {new Date(call.meetingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{call.duration} mins</TableCell>
                    <TableCell className="">
                      {call.speakers.map((speaker) => (
                        <li key={speaker.name}>{speaker.name}</li>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-gray-300 hover:bg-transparent">
                    <TableCell colSpan={4} align="left">
                      {call.summary.overview.length > 340
                        ? `${call.summary.overview.substring(0, 340)}...`
                        : call.summary.overview}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            : renderEmptyMeetingsTable()}
        </TableBody>
      </Table>
      <Pagination className="my-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                firstPage ? "pointer-events-none opacity-50" : "no-select"
              }
              onClick={() => {
                if (!firstPage) {
                  setStartIndex(startIndex - rowsPerPage);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                lastPage ? "pointer-events-none opacity-50" : "no-select"
              }
              onClick={() => {
                if (!lastPage) {
                  setStartIndex(startIndex + rowsPerPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
