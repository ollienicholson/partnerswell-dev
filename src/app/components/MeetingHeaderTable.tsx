"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";

export default function MeetingHeaderTable({
  accountId,
  meetingId,
}: {
  accountId: string | null;
  meetingId: string | null;
}) {
  // get data based on accountId and meetingId
  return (
    <div className="rounded-xl border shadow">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Account Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            // key={meeting?.callTranscriptId}
            className="hover:bg-transparent"
          >
            {/* TODO: render account name based on id*/}
            <TableCell>render account name</TableCell>
            <TableCell>meeting?.callTranscriptTitle</TableCell>
            <TableCell>meeting?.callDuration mins</TableCell>
          </TableRow>
        </TableBody>
        <div className="p-2" />
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Meeting Date</TableHead>
            <TableHead>Meeting Time</TableHead>
            <TableHead>Attendees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            // key={meeting?.callTranscriptId}
            className="hover:bg-transparent"
          >
            <TableCell>
              meeting date
              {/* {meeting?.dateString
                ? new Date(meeting.dateString).toLocaleDateString()
                : "Date not available"} */}
            </TableCell>
            <TableCell>
              meeting time
              {/* {meeting?.dateString
                ? new Date(meeting.dateString).toLocaleTimeString()
                : "Date not available"} */}
            </TableCell>
            <TableCell>
              meeting speakers
              {/* {meeting?.callAttendees.map((attendee, index) => (
                <li key={index}>{attendee.speakers}</li>
              ))} */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Call Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell>meeting?.callSummary</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
