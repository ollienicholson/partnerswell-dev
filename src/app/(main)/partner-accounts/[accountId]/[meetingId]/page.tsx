"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { TGetOneTranscript } from "~/lib/types";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { maMaOutput, TMaMaOutput } from "~/lib/maturity-map-output";
import { inInOutput, TInInOutput } from "~/lib/influence-indicator-output";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import Link from "next/link";
import DeleteCallTranscriptButton from "~/app/components/deleteCallTranscriptButton";

export default function MeetingPage() {
  const [capabilityData, setCapabilityData] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState<string>("");
  const [meeting, setMeeting] = useState<TGetOneTranscript | undefined>(
    undefined,
  );
  const router = useRouter();
  const { meetingId } = useParams();

  const {
    data: transcriptData,
    isLoading: transcriptLoading,
    error: transcriptError,
  } = react_api.transcriptRouter.getById.useQuery(
    {
      id: typeof meetingId === "string" ? meetingId : "",
    },
    {
      enabled: !!meetingId,
    },
  );

  useEffect(() => {
    if (transcriptData) {
      setMeeting(transcriptData);
    }
  }, [transcriptData]);

  console.log("useState -> MeetingId", meetingId);

  const handleAfterDelete = () => {
    console.log("handleAfterDelete: Transcript deleted");
    router.push("/partner-accounts");
  };

  if (transcriptLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (transcriptError) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-red-500">{transcriptError?.message}</div>
        <Link href="/partner-accounts">
          <Button>Back</Button>
        </Link>
      </div>
    );
  }

  const renderMaMaOutput = () => {
    return maMaOutput.map((item: TMaMaOutput, index) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.phase_name}</TableCell>
        <TableCell className="mb-2 flex flex-col gap-2">
          {item.description}
        </TableCell>
      </TableRow>
    ));
  };

  const renderInInOutput = () => {
    return inInOutput.map((item: TInInOutput, index) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.phase_name}</TableCell>
        <TableCell className="mb-2 flex flex-col gap-2">
          {item.description}
        </TableCell>
      </TableRow>
    ));
  };

  const renderEmptyOutputTable = () => (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          <TableHead>Phase</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="text-center">
            Display final output here
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <div className="relative min-h-screen p-6">
      {meetingId ? (
        <>
          <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
            Meeting: {meeting?.title}
          </div>
          <div className="rounded-xl border shadow">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Account Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={meeting?.id} className="hover:bg-transparent">
                  {/* TODO: render account name based on id*/}
                  <TableCell>render account name</TableCell>
                  <TableCell>{meeting?.title}</TableCell>
                  <TableCell>{meeting?.duration} mins</TableCell>
                </TableRow>
              </TableBody>
              <div className="p-2" />
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Time</TableHead>
                  <TableHead>Attendees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={meeting?.id} className="hover:bg-transparent ">
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
                    {meeting?.speakers.map((speaker, index) => (
                      <li key={index}>{speaker.name}</li>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableHeader>
                <TableRow className=" bg-slate-50">
                  <TableHead>Call Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell>{meeting?.summary.overview}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="p-4"></div>
          {/* this will form the final output table */}
          {/* the empty table headings are correct for final output table */}
          {/* [] Capability: Influence Indicator or MM - this should live in the header table */}
          {/* [] Required Table headings
                [] phase
                [] description */}
          <div className="mt-6 rounded-xl border shadow">
            {capabilityData ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Phase</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedToggle === "maturityMap"
                    ? renderMaMaOutput()
                    : renderInInOutput()}
                </TableBody>
              </Table>
            ) : (
              renderEmptyOutputTable()
            )}
          </div>
          <div className="py-4"></div>
          <div className="flex justify-between py-6">
            <Button onClick={() => router.back()} className="">
              Back
            </Button>
            {/* TODO: add backend delete meeting functionality */}
            <DeleteCallTranscriptButton
              id={String(meetingId)}
              onDelete={handleAfterDelete}
            />
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
