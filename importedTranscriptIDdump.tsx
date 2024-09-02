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
// import { ToggleGroup, ToggleGroupItem } from "~/app/components/ui/toggle-group";
import { Button } from "~/app/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import {
//   maturityMapOutput,
//   MaturityMapOutput,
// } from "~/lib/maturity-map-output";
// import {
//   influenceIndicatorOutput,
//   InfluenceIndicatorOutput,
// } from "~/lib/influence-indicator-output";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/app/components/ui/select";
// import { influenceIndicators, InfluenceIndicator } from "~/lib/in-in-list";

export default function ImportedTranscriptPage() {
  // const [capabilityData, setCapabilityData] = useState(false);
  // const [selectedToggle, setSelectedToggle] = useState<string>("");
  const [meetingId, setMeetingId] = useState<number | null>(null);
  const [meeting, setMeeting] = useState<CallTranscriptHeader | null>(null);
  // const [capabilityButtonClicked, setCapabilityButtonClicked] = useState(false);
  // const [resetButton, setResetButton] = useState(false);

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

  // const renderMaturityMapOutput = () => {
  //   return maturityMapOutput.map((item: MaturityMapOutput, index: number) => (
  //     <TableRow key={index} className="hover:bg-transparent">
  //       <TableCell className="font-semibold">{item.title}</TableCell>
  //       <TableCell>
  //         {item.details.map((detail, subIndex) => (
  //           <div key={subIndex} className="mb-2 flex flex-col gap-2">
  //             <strong>{detail.subTitle}:</strong>
  //             <ul>
  //               {detail.description.map((desc, descIndex) => (
  //                 <li key={descIndex}>{desc}</li>
  //               ))}
  //             </ul>
  //           </div>
  //         ))}
  //       </TableCell>
  //     </TableRow>
  //   ));
  // };
  // const renderInfluenceIndicatorOutput = () => {
  //   return influenceIndicatorOutput.map(
  //     (item: InfluenceIndicatorOutput, index: number) => (
  //       <TableRow key={index} className="hover:bg-transparent">
  //         <TableCell className="font-semibold">{item.title}</TableCell>
  //         <TableCell>
  //           {item.details.map((detail, subIndex) => (
  //             <div key={subIndex} className="mb-2 flex flex-col gap-2">
  //               <strong>{detail.subTitle}:</strong>
  //               <ul>
  //                 {detail.description.map((desc, descIndex) => (
  //                   <li key={descIndex}>{desc}</li>
  //                 ))}
  //               </ul>
  //             </div>
  //           ))}
  //         </TableCell>
  //       </TableRow>
  //     ),
  //   );
  // };

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
                  {/* TODO: render account name based on id*/}
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
          <div className="p-4"></div>
          {/* <div className="rounded-xl border shadow">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    Select Maturtiy Map or Influence Indicator
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="flex justify-start p-2 py-4 hover:bg-transparent">
                  <ToggleGroup
                    className="gap-2 p-4"
                    type="single"
                    value={selectedToggle}
                    onValueChange={(value) => setSelectedToggle(value)}
                  >
                    <ToggleGroupItem
                      variant="outline"
                      value="maturityMap"
                      disabled={capabilityButtonClicked}
                      className={`rounded px-4 py-2 ${
                        selectedToggle === "maturityMap"
                          ? "border-2 border-green-300"
                          : null
                      }`}
                    >
                      Maturity Map
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      variant="outline"
                      value="influenceIndicator"
                      disabled={capabilityButtonClicked}
                      className={`rounded px-4 py-2 ${
                        selectedToggle === "influenceIndicator"
                          ? "border-2 border-green-300"
                          : null
                      }`}
                    >
                      Influence Indicator
                    </ToggleGroupItem>
                    {selectedToggle === "influenceIndicator" ? (
                      <Select disabled={capabilityButtonClicked}>
                        <SelectTrigger className="w-[260px]">
                          <SelectValue placeholder="Select an indicator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {influenceIndicators.map((indicator) => (
                              <SelectItem
                                key={indicator.id}
                                value={indicator.name}
                              >
                                {indicator.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select disabled>
                        <SelectTrigger className="w-[260px]">
                          <SelectValue placeholder="Select an indicator" />
                        </SelectTrigger>
                      </Select>
                    )}
                  </ToggleGroup>
                </TableRow>
              </TableBody>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    Get capability data based on your selection
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="flex justify-between gap-2 p-6 hover:bg-transparent">
                  <Button
                    disabled={
                      capabilityButtonClicked ||
                      resetButton ||
                      (selectedToggle !== "maturityMap" &&
                        selectedToggle !== "influenceIndicator")
                    }
                    onClick={() => {
                      setCapabilityData(true);
                      setCapabilityButtonClicked(true);
                      setResetButton(true);
                    }}
                    className={`${
                      selectedToggle === "maturityMap" ||
                      selectedToggle === "influenceIndicator"
                        ? "bg-green-300 text-white"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    Get capability data
                  </Button>
                  <Button
                    variant="outline"
                    disabled={
                      selectedToggle !== "maturityMap" &&
                      selectedToggle !== "influenceIndicator"
                    }
                    onClick={() => {
                      setCapabilityData(false);
                      setCapabilityButtonClicked(false);
                      setResetButton(false);
                    }}
                  >
                    Reset Data
                  </Button>
                  <Button variant="outline">Save Data to Account</Button>
                </TableRow>
              </TableBody>
            </Table> */}
          {/* </div> */}
          {/* <div className="mt-6 rounded-xl border shadow">
            {capabilityData ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Capability</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedToggle === "maturityMap"
                    ? renderMaturityMapOutput()
                    : renderInfluenceIndicatorOutput()}
                </TableBody>
              </Table>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center p-6 text-center text-xl text-gray-300">
                Select your preference for Maturity Map or Influence Indicator
              </div>
            )}
          </div> */}
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
