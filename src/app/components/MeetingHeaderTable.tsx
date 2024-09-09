"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { getOneTranscript } from "~/lib/types";

type MeetingHeaderTableProps = {
  accountName: string | undefined;
  transcript: getOneTranscript;
};

export default function MeetingHeaderTable({
  accountName,
  transcript,
}: MeetingHeaderTableProps) {
  // get data based on accountId and meetingId

  const formattedDate = new Date(transcript.dateString).toLocaleDateString(
    "en-US",
    {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    },
  );

  const formattedTime = new Date(transcript.dateString).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

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
          <TableRow key={transcript.id} className="hover:bg-transparent">
            <TableCell>{accountName}</TableCell>
            <TableCell>{transcript.title}</TableCell>
            <TableCell>{transcript.duration} mins</TableCell>
          </TableRow>
        </TableBody>
        {/* <div className="p-2" /> */}
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Meeting Date</TableHead>
            <TableHead>Meeting Time</TableHead>
            <TableHead>Attendees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={transcript.id} className="hover:bg-transparent">
            <TableCell>{formattedDate || "Date not available"}</TableCell>
            <TableCell>{formattedTime || "Time not available"}</TableCell>
            <TableCell>
              {transcript.speakers.map((speaker, index) => (
                <li key={index}>{speaker.name}</li>
              ))}
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
            <TableCell>
              {transcript.summary.overview || "Summary not available"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
