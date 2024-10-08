"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TGPTOutput } from "~/lib/types";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import Link from "next/link";
import DeleteCallTranscriptButton from "~/app/components/deleteCallTranscriptButton";

export default function MeetingPage() {
  const [capabilityData, setCapabilityData] = useState(true);
  // const [selectedToggle, setSelectedToggle] = useState<string>("");
  // const [meeting, setMeeting] = useState<TGetOneTranscript | undefined>(
  //   undefined,
  // );
  const router = useRouter();
  const { accountId, meetingId } = useParams();

  const {
    data: transcriptData,
    isLoading: transcriptLoading,
    error: transcriptError,
  } = react_api.transcriptRouter.getByMeetingId.useQuery(
    {
      meetingId: typeof meetingId === "string" ? meetingId : "",
    },
    {
      enabled: !!meetingId,
    },
  );

  const { data: account } = react_api.partnerAccountRouter.getOne.useQuery({
    partnerAccountId: Number(accountId),
  });

  // useEffect(() => {
  //   if (transcriptData) {
  //     setMeeting(transcriptData);
  //   }
  // }, [transcriptData]);

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

  const renderGPTOutput = () => {
    return transcriptData?.chatgptOutput?.map((item: TGPTOutput, index) => (
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
            No data available.
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
            Meeting: {transcriptData?.callTranscriptTitle}
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
                <TableRow
                  key={transcriptData?.id}
                  className="hover:bg-transparent"
                >
                  <TableCell>{account?.accountName}</TableCell>
                  <TableCell>{transcriptData?.callTranscriptTitle}</TableCell>
                  <TableCell>{transcriptData?.duration} mins</TableCell>
                </TableRow>
              </TableBody>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Time</TableHead>
                  <TableHead>Attendees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  key={transcriptData?.id}
                  className="hover:bg-transparent "
                >
                  <TableCell>
                    {transcriptData?.meetingDate
                      ? new Date(
                          transcriptData.meetingDate,
                        ).toLocaleDateString()
                      : "Date not available"}
                  </TableCell>
                  <TableCell>
                    {transcriptData?.meetingDate
                      ? new Date(
                          transcriptData.meetingDate,
                        ).toLocaleTimeString()
                      : "Date not available"}
                  </TableCell>
                  <TableCell>
                    {transcriptData?.speakers?.map((speaker, index) => (
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
                  <TableCell>{transcriptData?.summary?.overview}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="p-4"></div>
          <div className="mt-6 rounded-xl border shadow">
            {capabilityData ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Phase</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderGPTOutput()}</TableBody>
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
