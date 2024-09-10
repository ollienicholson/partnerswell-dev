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

import { callTranscriptHeader } from "~/lib/call-transcript-header";
import { useRouter } from "next/navigation";

// TODO: handle error UI for incorrect acccount id
export function MeetingTable({ accountId }: { accountId: number }) {
  // pagination
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const router = useRouter();

  const pagintedTranscripts = useMemo(() => {
    return callTranscriptHeader.slice(startIndex, endIndex);
  }, [callTranscriptHeader, startIndex, endIndex]);

  const handleRowClick = (meetingId: number) => {
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
                <React.Fragment key={call.callTranscriptId}>
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
                      {call.callAttendees.map((attendee) => (
                        <li key={attendee.speakers}>{attendee.speakers}</li>
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
                startIndex === 0
                  ? "pointer-events-none opacity-50"
                  : //     : "no-select"
                    ""
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
                  : //     : "no-select"
                    ""
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
  );
}
