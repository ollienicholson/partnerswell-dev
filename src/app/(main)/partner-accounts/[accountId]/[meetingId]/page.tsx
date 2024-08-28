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
  callTranscriptHeader,
  CallTranscriptHeader,
} from "~/lib/call-transcript-header";
import { Button } from "~/app/components/ui/button";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { flat_gpt_output, GptOutput } from "~/lib/flattened_gpt_output";

export default function MeetingPage() {
  const [meetingId, setMeetingId] = useState<number | null>(null);
  const [meeting, setMeeting] = useState<CallTranscriptHeader | null>(null);

  const router = useRouter();

  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); // Grab the last segment of the path
    if (id && !isNaN(Number(id))) {
      setMeetingId(Number(id));
    }
  }, []);

  useEffect(() => {
    if (meetingId !== null) {
      const foundMeeting = callTranscriptHeader.find(
        (call) => call.callTranscriptId === meetingId,
      );
      setMeeting(foundMeeting || null);
    }
  }, [meetingId]);

  const renderGptOutput = () => {
    return flat_gpt_output.map((item: GptOutput, index: number) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.title}</TableCell>
        <TableCell>
          {item.details.map((detail, subIndex) => (
            <div key={subIndex} className="mb-2 flex flex-col gap-2">
              <strong>{detail.subTitle}:</strong>
              <ul>
                {detail.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="relative min-h-screen p-6">
      {meetingId ? (
        <>
          <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
            Meeting: {meeting?.callTranscriptTitle}
          </div>
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
                  key={meeting?.callTranscriptId}
                  className="hover:bg-transparent"
                >
                  <TableCell>render account name</TableCell>
                  <TableCell>{meeting?.callTranscriptTitle}</TableCell>
                  <TableCell>{meeting?.callDuration} mins</TableCell>
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
                  key={meeting?.callTranscriptId}
                  className="hover:bg-transparent"
                >
                  <TableCell>
                    {meeting?.dateString
                      ? new Date(meeting.dateString).toLocaleDateString()
                      : "Date not available"}
                  </TableCell>
                  <TableCell>
                    {meeting?.dateString
                      ? new Date(meeting.dateString).toLocaleTimeString()
                      : "Date not available"}
                  </TableCell>
                  <TableCell>
                    {meeting?.callAttendees.map((attendee, index) => (
                      <li key={index}>{attendee.speakers}</li>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="p-2"></div>
          <div className="rounded-xl border shadow">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Call Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell>{meeting?.callSummary}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="p-2"></div>
          <div className="rounded-xl border shadow">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Select MM or II before continuing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="flex justify-start gap-4 p-2 py-4 hover:bg-transparent">
                  <Button>Maturity Map toggle</Button>
                  <Button>Influence Indicator dropdown</Button>
                </TableRow>
              </TableBody>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Get capability data using MM or II</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="flex justify-start gap-4 p-2 py-4 hover:bg-transparent">
                  <Button>Get capability data</Button>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 rounded-xl border shadow">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Capability</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderGptOutput()}
                <TableRow className="hover:bg-transparent"></TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="py-4"></div>
          <div className="flex py-6">
            <Button onClick={() => router.back()} className="">
              Back
            </Button>
          </div>
        </>
      ) : (
        <div className="text-lg font-semibold ">
          {meetingId === null ? "Loading..." : "Meeting not found"}
        </div>
      )}
    </div>
  );
}
